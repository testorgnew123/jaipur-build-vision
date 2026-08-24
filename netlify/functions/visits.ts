import type { Handler } from "@netlify/functions";
import { sql } from "./_lib/db";
import { cors, errorResponse, optionsResponse, requireAuth } from "./_lib/auth";
import { sendLeadNotification, type LeadRow } from "./_lib/mail";

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

      const name = typeof client_name === "string" ? client_name.trim() : "";
      if (name.length < 2 || name.length > 80) {
        return cors({ error: "Name must be 2–80 characters" }, 400);
      }
      if (!/^\p{L}[\p{L}\s.'’-]*$/u.test(name)) {
        return cors({ error: "Name contains invalid characters" }, 400);
      }

      const rawPhone = typeof client_phone === "string" ? client_phone : "";
      let digits = rawPhone.replace(/\D/g, "");
      if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
      else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
      if (digits.length !== 10 || !/^[6-9]/.test(digits)) {
        return cors({ error: "Enter a valid 10-digit Indian mobile number" }, 400);
      }
      const phone = `+91${digits}`;

      const rows = await sql`
        INSERT INTO scheduled_visits (client_name, client_phone, notes)
        VALUES (${name}, ${phone}, ${notes ?? null})
        RETURNING *
      `;
      await sendLeadNotification(rows[0] as LeadRow);
      return cors(rows[0], 201);
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return errorResponse(err);
  }
};
