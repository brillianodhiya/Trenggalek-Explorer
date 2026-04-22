import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb, wisataTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function GET() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  
  try {
    // Mengambil wisata yang memiliki status highlight = true (featured)
    const results = await db
      .select()
      .from(wisataTable)
      .where(eq(wisataTable.highlight, true));
      
    return Response.json(results);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
