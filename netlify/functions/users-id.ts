import type { Handler } from "@netlify/functions";
import bcrypt from "bcryptjs";
import { sql } from "./_lib/db";
import { cors, errorResponse, optionsResponse, requireSuperAdmin } from "./_lib/auth";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return optionsResponse("PATCH, DELETE");

  const id = event.path.split("/").pop();
  if (!id || !/^\d+$/.test(id)) return cors({ error: "Valid numeric ID required" }, 400);

  try {
    const caller = requireSuperAdmin(event.headers as Record<string, string | undefined>);

    if (event.httpMethod === "PATCH") {
      const { name, email, role, password } = JSON.parse(event.body || "{}");
      const hash = password ? await bcrypt.hash(password, 10) : null;
      const rows = await sql`
        UPDATE users
        SET name  = COALESCE(${name ?? null}, name),
            email = COALESCE(${email ?? null}, email),
            role  = COALESCE(${role ?? null}, role),
            password = COALESCE(${hash}, password)
        WHERE id = ${id}
        RETURNING id, email, name, role, created_at
      `;
      if (!rows[0]) return cors({ error: "User not found" }, 404);
      return cors(rows[0]);
    }

    if (event.httpMethod === "DELETE") {
      if (String(caller.sub) === id) return cors({ error: "Cannot delete yourself" }, 400);
      await sql`DELETE FROM users WHERE id=${id}`;
      return cors({ success: true });
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return errorResponse(err);
  }
};
