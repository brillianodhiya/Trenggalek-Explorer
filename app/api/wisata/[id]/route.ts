import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb, wisataTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const idNum = parseInt(params.id);

  try {
    const results = await db.select().from(wisataTable).where(eq(wisataTable.id, idNum)).limit(1);
    
    if (results.length === 0) {
      return Response.json({ error: "Wisata not found" }, { status: 404 });
    }

    return Response.json(results[0]);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
