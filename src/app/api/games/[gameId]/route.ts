import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await params;

  const { error, ...rest } = await supabase
    .from("games")
    .update({ won: true, moves: 32 })
    .eq("id", gameId);

  return Response.json({ error, ...rest });
}
