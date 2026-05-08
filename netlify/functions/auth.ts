import type { Handler } from "@netlify/functions";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "./_lib/db";
import { cors, errorResponse, optionsResponse } from "./_lib/auth";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return optionsResponse("POST");
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const { email, password } = JSON.parse(event.body || "{}");
    if (!email || !password) return cors({ error: "Email and password required" }, 400);

    const rows = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
    const user = rows[0] as
      | { id: number; email: string; password: string; name: string; role: string }
      | undefined;

    if (!user) return cors({ error: "Invalid credentials" }, 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return cors({ error: "Invalid credentials" }, 401);

    const token = jwt.sign(
      { sub: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    return cors({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    return errorResponse(err);
  }
};
