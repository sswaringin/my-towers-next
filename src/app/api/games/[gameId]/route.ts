import supabase from "@/lib/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await params;

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
