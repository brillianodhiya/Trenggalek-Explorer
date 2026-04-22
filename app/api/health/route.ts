import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET() {
  let db_connected = false;
  let error = null;
  let env_keys = [];

  try {
    const context = getRequestContext();
    if (context && context.env) {
      env_keys = Object.keys(context.env);
      db_connected = !!context.env.DB;
    }
  } catch (e: any) {
    error = e.message;
  }

  return Response.json({ 
    status: "ok", 
    db_connected,
    available_env: env_keys,
    error 
  });
}
