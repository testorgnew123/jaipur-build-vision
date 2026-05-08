import type { Handler } from "@netlify/functions";
import bcrypt from "bcryptjs";
import { sql } from "./_lib/db";
import { cors, errorResponse, optionsResponse, requireSuperAdmin } from "./_lib/auth";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return optionsResponse("GET, POST");

  try {
    requireSuperAdmin(event.headers as Record<string, string | undefined>);

    if (event.httpMethod === "GET") {
      const rows =
        await sql`SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC`;
      return cors(rows);
    }

    if (event.httpMethod === "POST") {
      const { email, name, role, password } = JSON.parse(event.body || "{}");
      if (!email || !name || !role || !password) return cors({ error: "All fields required" }, 400);
      const hash = await bcrypt.hash(password, 10);
      const rows = await sql`
        INSERT INTO users (email, name, role, password)
        VALUES (${email}, ${name}, ${role}, ${hash})
        RETURNING id, email, name, role, created_at
      `;
      return cors(rows[0], 201);
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return errorResponse(err);
  }
};
