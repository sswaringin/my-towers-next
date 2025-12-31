import rateLimitByKey from "@/lib/rateLimitByKey";
import supabase from "@/lib/client";
import { mediator, Middleware } from "@/lib/mediator";

interface GameContext {
  userId?: string;
  gameStart?: string;
  gameId?: string;
  response?: { error?: string };
  status?: number;
}

const checkParams: Middleware<GameContext> = async (ctx, next) => {
  const { userId, gameStart, gameId } = ctx;

  if (!userId || !gameStart || !gameId) {
    ctx.response = { error: "missing required params" };
    ctx.status = 400;
    return;
  }

  // if no issues, go to the next middleware
  await next();
};

const checkRateLimit: Middleware<GameContext> = async (ctx, next) => {
  const { userId } = ctx;

  if (!userId) return;
  const rateLimitExceeded = rateLimitByKey(userId);

  if (rateLimitExceeded) {
    ctx.response = { error: "rate limit exceeded" };
    ctx.status = 400;
    return;
  }

  // if no issues, go to the next middleware
  await next();
};

const makeDbCall: Middleware<GameContext> = async (ctx) => {
  const { userId, gameStart, gameId } = ctx;

  const { error, ...rest } = await supabase
    .from("games")
    .insert({ id: gameId, userId, gameStart })
    .select();

  if (error) {
    ctx.response = { error: "error from supabase" };
    ctx.status = 400;
    return;
  }

  ctx.response = { ...rest, error: undefined };
};

export async function POST(request: Request) {
  const body = await request.json();
  const context = {
    ...body,
    response: null,
    status: null,
  };
  try {
    const pipeline = mediator(checkParams, checkRateLimit, makeDbCall);
    await pipeline(context);
    return Response.json(context.response, { status: context.status || 200 });
  } catch (error) {
    console.error("Pipeline error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const runtime = "edge";
