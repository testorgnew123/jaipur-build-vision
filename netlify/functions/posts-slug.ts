import type { Handler } from "@netlify/functions";
import { sql } from "./_lib/db";
import { cors, errorResponse, optionsResponse, requireSuperAdmin } from "./_lib/auth";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return optionsResponse("GET, PUT, DELETE");

  const slug = event.path.split("/").pop();
  if (!slug) return cors({ error: "Slug required" }, 400);

  try {
    if (event.httpMethod === "GET") {
      const rows = await sql`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`;
      if (!rows[0]) return cors({ error: "Post not found" }, 404);
      return cors(rows[0]);
    }

    if (event.httpMethod === "PUT") {
      requireSuperAdmin(event.headers as Record<string, string | undefined>);
      const { title, excerpt, cover, author, published_at, reading_time, tags, content } =
        JSON.parse(event.body || "{}");
      const rows = await sql`
        UPDATE posts
        SET title=${title}, excerpt=${excerpt}, cover=${cover}, author=${author},
            published_at=${published_at}, reading_time=${reading_time}, tags=${tags},
            content=${content}, updated_at=NOW()
        WHERE slug=${slug}
        RETURNING *
      `;
      if (!rows[0]) return cors({ error: "Post not found" }, 404);
      return cors(rows[0]);
    }

    if (event.httpMethod === "DELETE") {
      requireSuperAdmin(event.headers as Record<string, string | undefined>);
      await sql`DELETE FROM posts WHERE slug=${slug}`;
      return cors({ success: true });
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return errorResponse(err);
  }
};
