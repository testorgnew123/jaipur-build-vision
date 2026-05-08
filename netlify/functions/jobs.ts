import type { Handler } from "@netlify/functions";
import { sql } from "./_lib/db";
import { cors, errorResponse, optionsResponse, requireAuth } from "./_lib/auth";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return optionsResponse("GET, POST");

  try {
    if (event.httpMethod === "GET") {
      const { all } = event.queryStringParameters || {};
      const rows =
        all === "1"
          ? await sql`SELECT * FROM jobs ORDER BY created_at DESC`
          : await sql`SELECT * FROM jobs WHERE is_active = TRUE ORDER BY created_at DESC`;
      return cors(rows);
    }

    if (event.httpMethod === "POST") {
      requireAuth(event.headers as Record<string, string | undefined>);
      const body = JSON.parse(event.body || "{}");

      const title = typeof body.title === "string" ? body.title.trim() : "";
      const description = typeof body.description === "string" ? body.description.trim() : "";
      const experience = typeof body.experience === "string" ? body.experience.trim() : "";
      if (title.length < 2 || title.length > 120) return cors({ error: "Title must be 2–120 characters" }, 400);
      if (description.length < 10) return cors({ error: "Description is too short" }, 400);
      if (!experience) return cors({ error: "Experience is required" }, 400);

      const type = typeof body.type === "string" && body.type.trim() ? body.type.trim() : "Full-time";
      const location = typeof body.location === "string" && body.location.trim() ? body.location.trim() : "Jaipur, Rajasthan";
      const skills = Array.isArray(body.skills)
        ? body.skills.map((s: unknown) => String(s).trim()).filter(Boolean)
        : [];
      const isActive = typeof body.is_active === "boolean" ? body.is_active : true;

      const rows = await sql`
        INSERT INTO jobs (title, type, experience, location, description, skills, is_active)
        VALUES (${title}, ${type}, ${experience}, ${location}, ${description}, ${skills}, ${isActive})
        RETURNING *
      `;
      return cors(rows[0], 201);
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return errorResponse(err);
  }
};
