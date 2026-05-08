import type { Handler } from "@netlify/functions";
import { sql } from "./_lib/db";
import { cors, errorResponse, optionsResponse, requireAuth, requireSuperAdmin } from "./_lib/auth";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return optionsResponse("GET, PATCH, DELETE");

  const id = event.path.split("/").pop();
  if (!id || !/^\d+$/.test(id)) return cors({ error: "Valid numeric ID required" }, 400);

  try {
    if (event.httpMethod === "GET") {
      requireAuth(event.headers as Record<string, string | undefined>);
      const rows = await sql`SELECT * FROM scheduled_visits WHERE id=${id} LIMIT 1`;
      if (!rows[0]) return cors({ error: "Visit not found" }, 404);
      return cors(rows[0]);
    }

    if (event.httpMethod === "PATCH") {
      requireAuth(event.headers as Record<string, string | undefined>);
      const { client_name, client_phone, notes, status } = JSON.parse(event.body || "{}");
      const rows = await sql`
        UPDATE scheduled_visits
        SET client_name = COALESCE(${client_name ?? null}, client_name),
            client_phone = COALESCE(${client_phone ?? null}, client_phone),
            notes = COALESCE(${notes ?? null}, notes),
            status = COALESCE(${status ?? null}, status)
        WHERE id = ${id}
        RETURNING *
      `;
      if (!rows[0]) return cors({ error: "Visit not found" }, 404);
      return cors(rows[0]);
    }

    if (event.httpMethod === "DELETE") {
      requireSuperAdmin(event.headers as Record<string, string | undefined>);
      await sql`DELETE FROM scheduled_visits WHERE id=${id}`;
      return cors({ success: true });
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return errorResponse(err);
  }
};
