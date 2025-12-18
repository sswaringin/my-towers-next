import supabase from "@/lib/client";
import rateLimitByKey from "@/lib/rateLimitByKey";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { userId } = await request.json();
  const { gameId } = await params;

  if (!userId || !gameId) {
    throw new Error("missing required param");
  }

  const rateLimitExceeded = rateLimitByKey(userId);
  if (rateLimitExceeded) {
    throw new Error("rate limit exceeded");
  }

  const { data, error, ...rest } = await supabase
    .from("games")
    .select()
    .eq("id", gameId);

  return Response.json({ data, error, ...rest });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const { userId, gameStop, won, moves } = await request.json();
    const { gameId } = await params;

    if (!userId || !gameId) {
      throw new Error("missing required param");
    }

    const rateLimitExceeded = rateLimitByKey(userId);
    if (rateLimitExceeded) {
      throw new Error("rate limit exceeded");
    }

    const { error, ...rest } = await supabase
      .from("games")
      .update({ gameStop, won, moves })
      .eq("id", gameId)
      .select();

    if (error) {
      console.error(error);
      throw new Error("error from supabase");
    }
    return Response.json({ error, ...rest });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "something went wrong" }, { status: 400 });
  }
}

export const runtime = "edge";
