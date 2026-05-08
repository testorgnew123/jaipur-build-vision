import { useLocation } from "@tanstack/react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const BREADCRUMBS: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/visits": "Visits",
  "/admin/posts": "Blog Posts",
  "/admin/posts/new": "New Post",
  "/admin/users": "Users",
};

export function AdminHeader() {
  const { pathname } = useLocation();

  const label =
    BREADCRUMBS[pathname] ??
    (pathname.startsWith("/admin/visits/") ? "Visit Detail" : null) ??
    (pathname.startsWith("/admin/posts/") ? "Edit Post" : null) ??
    "Admin";

  return (
    <header className="flex h-14 items-center gap-3 border-b border-border px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-5" />
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </header>
  );
}
