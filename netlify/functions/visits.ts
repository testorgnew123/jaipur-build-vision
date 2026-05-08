import type { Handler } from "@netlify/functions";
import { sql } from "./_lib/db";
import { cors, errorResponse, optionsResponse, requireAuth } from "./_lib/auth";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return optionsResponse("GET, POST");

  try {
    if (event.httpMethod === "GET") {
      requireAuth(event.headers as Record<string, string | undefined>);
      const { status } = event.queryStringParameters || {};
      const rows = status
        ? await sql`SELECT * FROM scheduled_visits WHERE status=${status} ORDER BY created_at DESC`
        : await sql`SELECT * FROM scheduled_visits ORDER BY created_at DESC`;
      return cors(rows);
    }

    if (event.httpMethod === "POST") {
      const { client_name, client_phone, notes } = JSON.parse(event.body || "{}");
      if (!client_name || !client_phone) return cors({ error: "Name and phone required" }, 400);
      const rows = await sql`
        INSERT INTO scheduled_visits (client_name, client_phone, notes)
        VALUES (${client_name}, ${client_phone}, ${notes ?? null})
        RETURNING *
      `;
      return cors(rows[0], 201);
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return errorResponse(err);
  }
};
