import type { Handler } from "@netlify/functions";
import { sql } from "./_lib/db";
import { cors, errorResponse, optionsResponse, requireAuth } from "./_lib/auth";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return optionsResponse("GET, PATCH, DELETE");

  const id = event.path.split("/").pop();
  if (!id || !/^\d+$/.test(id)) return cors({ error: "Valid numeric ID required" }, 400);

  try {
    if (event.httpMethod === "GET") {
      const rows = await sql`SELECT * FROM jobs WHERE id = ${id} LIMIT 1`;
      if (!rows[0]) return cors({ error: "Job not found" }, 404);
      return cors(rows[0]);
    }

    if (event.httpMethod === "PATCH") {
      requireAuth(event.headers as Record<string, string | undefined>);
      const body = JSON.parse(event.body || "{}");

      const title = typeof body.title === "string" ? body.title.trim() : null;
      if (title !== null && (title.length < 2 || title.length > 120)) {
        return cors({ error: "Title must be 2–120 characters" }, 400);
      }
      const description = typeof body.description === "string" ? body.description.trim() : null;
      if (description !== null && description.length < 10) {
        return cors({ error: "Description is too short" }, 400);
      }
      const experience = typeof body.experience === "string" ? body.experience.trim() : null;
      const type = typeof body.type === "string" ? body.type.trim() : null;
      const location = typeof body.location === "string" ? body.location.trim() : null;
      const skills = Array.isArray(body.skills)
        ? body.skills.map((s: unknown) => String(s).trim()).filter(Boolean)
        : null;
      const isActive = typeof body.is_active === "boolean" ? body.is_active : null;

      const rows = await sql`
        UPDATE jobs
        SET title       = COALESCE(${title}, title),
            type        = COALESCE(${type}, type),
            experience  = COALESCE(${experience}, experience),
            location    = COALESCE(${location}, location),
            description = COALESCE(${description}, description),
            skills      = COALESCE(${skills}, skills),
            is_active   = COALESCE(${isActive}, is_active),
            updated_at  = NOW()
        WHERE id = ${id}
        RETURNING *
      `;
      if (!rows[0]) return cors({ error: "Job not found" }, 404);
      return cors(rows[0]);
    }

    if (event.httpMethod === "DELETE") {
      requireAuth(event.headers as Record<string, string | undefined>);
      await sql`DELETE FROM jobs WHERE id = ${id}`;
      return cors({ success: true });
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return errorResponse(err);
  }
};
