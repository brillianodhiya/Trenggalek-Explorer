import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb, galeriTable } from "@workspace/db";

export const runtime = "edge";

export async function GET() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);

  try {
    const results = await db.select().from(galeriTable);
    return Response.json(results);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
