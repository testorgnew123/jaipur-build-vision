import jwt from "jsonwebtoken";

export interface JWTPayload {
  sub: number;
  email: string;
  name: string;
  role: "admin" | "super_admin";
}

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

export function verifyToken(authHeader: string | undefined): JWTPayload | null {
  if (!authHeader?.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(authHeader.slice(7), process.env.JWT_SECRET!) as JWTPayload;
  } catch {
    return null;
  }
}

export function requireAuth(headers: Record<string, string | undefined>): JWTPayload {
  const payload = verifyToken(headers["authorization"]);
  if (!payload) throw { statusCode: 401, headers: CORS_HEADERS, body: JSON.stringify({ error: "Unauthorized" }) };
  return payload;
}

export function requireSuperAdmin(headers: Record<string, string | undefined>): JWTPayload {
  const payload = requireAuth(headers);
  if (payload.role !== "super_admin")
    throw { statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({ error: "Forbidden" }) };
  return payload;
}

export function cors(body: unknown, statusCode = 200) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) };
}

export function errorResponse(err: unknown) {
  if (typeof err === "object" && err !== null && "statusCode" in err) {
    return err as { statusCode: number; body: string };
  }
  console.error(err);
  return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: "Internal server error" }) };
}

export function optionsResponse(methods: string) {
  return {
    statusCode: 200,
    headers: { ...CORS_HEADERS, "Access-Control-Allow-Methods": methods },
    body: "",
  };
}
