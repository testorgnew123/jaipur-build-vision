import { createFileRoute, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { getStoredAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/admin/login") return;
    const auth = getStoredAuth();
    if (!auth) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { pathname } = useLocation();

  if (pathname === "/admin/login") {
    return <Outlet />;
  }

  return (
    <AuthProvider>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
