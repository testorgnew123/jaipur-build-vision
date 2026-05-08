import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getStoredAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/jobs")({
  beforeLoad: () => {
    const auth = getStoredAuth();
    if (!auth) throw redirect({ to: "/admin/login" });
  },
  component: () => <Outlet />,
});
