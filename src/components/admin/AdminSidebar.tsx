import { Link, useLocation } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Building2, LayoutDashboard, CalendarCheck, FileText, Users, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { isSuperAdmin } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const mainNav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/visits", label: "Visits", icon: CalendarCheck },
];

const superAdminNav = [
  { to: "/admin/posts", label: "Blog Posts", icon: FileText },
  { to: "/admin/users", label: "Users", icon: Users },
];

export function AdminSidebar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-gold p-1.5">
            <Building2 className="w-4 h-4 text-gold-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold font-display leading-none">SingleStop</p>
            <p className="text-xs text-muted-foreground mt-0.5">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            {mainNav.map(({ to, label, icon: Icon }) => (
              <SidebarMenuItem key={to}>
                <SidebarMenuButton asChild isActive={pathname.startsWith(to)}>
                  <Link to={to}>
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {user && isSuperAdmin(user) && (
          <SidebarGroup>
            <SidebarGroupLabel>Content</SidebarGroupLabel>
            <SidebarMenu>
              {superAdminNav.map(({ to, label, icon: Icon }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton asChild isActive={pathname.startsWith(to)}>
                    <Link to={to}>
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 px-1">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            <span className="inline-block mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
              {user?.role?.replace("_", " ")}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} title="Sign out">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
