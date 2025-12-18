import { type NextRequest } from "next/server";
import rateLimitByKey from "@/lib/rateLimitByKey";
import supabase from "@/lib/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    if (!userId) {
      throw new Error("missing required param");
    }

    const rateLimitExceeded = rateLimitByKey(userId);
    if (rateLimitExceeded) {
      throw new Error("rate limit exceeded");
    }

    const { data, error, ...rest } = await supabase.from("games").select();
    return Response.json({ data, error, ...rest });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "something went wrong" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, gameStart, gameId } = await request.json();
    if (!userId) {
      throw new Error("missing required param");
    }

    const rateLimitExceeded = rateLimitByKey(userId);
    if (rateLimitExceeded) {
      throw new Error("rate limit exceeded");
    }

    const { error, ...rest } = await supabase
      .from("games")
      .insert({ id: gameId, userId, gameStart })
      .select();

    if (error) {
      console.error(error);
      throw new Error("error from supabase");
    }

    return Response.json({ ...rest });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "something went wrong" }, { status: 400 });
  }
}

// export async function HEAD(request: Request) {}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
// export async function OPTIONS(request: Request) {}

export const runtime = "edge";
