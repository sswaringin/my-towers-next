import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function GET(request: Request) {
  const { data, error, ...rest } = await supabase.from("games").select();

  return Response.json({ data, error, ...rest });
}
export async function POST(request: Request) {
  const { error, ...rest } = await supabase
    .from("games")
    .insert({ moves: 32, won: true });

  return Response.json({ request, error, ...rest });
}

// export async function HEAD(request: Request) {}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
// export async function OPTIONS(request: Request) {}
