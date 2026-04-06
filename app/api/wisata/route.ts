import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb, wisataTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function GET(request: Request) {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  
  const url = new URL(request.url);
  const featured = url.searchParams.get("featured");

  try {
    if (featured === "true") {
      // Menggunakan kolom 'highlight' sesuai skema SQLite
      const results = await db.select().from(wisataTable).where(eq(wisataTable.highlight, true));
      return Response.json(results);
    }

    const results = await db.select().from(wisataTable);
    return Response.json(results);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
