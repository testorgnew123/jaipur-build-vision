import type { Handler } from "@netlify/functions";
import { sql } from "./_lib/db";
import { cors, errorResponse, optionsResponse, requireSuperAdmin } from "./_lib/auth";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return optionsResponse("GET, POST");

  try {
    if (event.httpMethod === "GET") {
      const rows = await sql`SELECT * FROM posts ORDER BY published_at DESC`;
      return cors(rows);
    }

    if (event.httpMethod === "POST") {
      requireSuperAdmin(event.headers as Record<string, string | undefined>);
      const { slug, title, excerpt, cover, author, published_at, reading_time, tags, content } =
        JSON.parse(event.body || "{}");
      const rows = await sql`
        INSERT INTO posts (slug, title, excerpt, cover, author, published_at, reading_time, tags, content)
        VALUES (${slug}, ${title}, ${excerpt}, ${cover}, ${author}, ${published_at}, ${reading_time}, ${tags}, ${content})
        RETURNING *
      `;
      return cors(rows[0], 201);
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return errorResponse(err);
  }
};
