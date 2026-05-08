import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitStatusBadge } from "@/components/admin/VisitStatusBadge";
import { useAdminFetch } from "@/hooks/useAdminFetch";
import { getStoredAuth, isSuperAdmin } from "@/lib/auth";
import { CalendarCheck, Clock, CheckCircle2, XCircle, FileText } from "lucide-react";

interface Visit {
  id: number;
  client_name: string;
  client_phone: string;
  status: string;
  created_at: string;
}

interface Stats {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  posts?: number;
}

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: () => {
    if (!getStoredAuth()) throw redirect({ to: "/admin/login" });
  },
  component: DashboardPage,
});

function DashboardPage() {
  const adminFetch = useAdminFetch();
  const auth = getStoredAuth();
  const isSA = auth ? isSuperAdmin(auth.user) : false;

  const [visits, setVisits] = useState<Visit[]>([]);
  const [stats, setStats] = useState<Stats>({ pending: 0, confirmed: 0, completed: 0, cancelled: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await adminFetch("/api/visits");
        const data: Visit[] = await res.json();
        setVisits(data);
        setStats({
          pending: data.filter((v) => v.status === "pending").length,
          confirmed: data.filter((v) => v.status === "confirmed").length,
          completed: data.filter((v) => v.status === "completed").length,
          cancelled: data.filter((v) => v.status === "cancelled").length,
        });

        if (isSA) {
          const postsRes = await fetch("/api/posts");
          const posts = await postsRes.json();
          setStats((s) => ({ ...s, posts: Array.isArray(posts) ? posts.length : 0 }));
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [adminFetch, isSA]);

  const statCards = [
    { label: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-600" },
    { label: "Confirmed", value: stats.confirmed, icon: CalendarCheck, color: "text-blue-600" },
    { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-green-600" },
    { label: "Cancelled", value: stats.cancelled, icon: XCircle, color: "text-red-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of site visits and content</p>
      </div>

      <div className={`grid gap-4 ${isSA ? "sm:grid-cols-2 lg:grid-cols-5" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className={`w-4 h-4 ${color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold font-display">
                {loading ? "—" : value}
              </p>
            </CardContent>
          </Card>
        ))}
        {isSA && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Blog Posts</CardTitle>
              <FileText className="w-4 h-4 text-gold" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold font-display">
                {loading ? "—" : stats.posts ?? 0}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Visits</CardTitle>
          <Link to="/admin/visits" className="text-sm text-gold hover:underline">
            View all
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <p className="text-sm text-muted-foreground p-6">Loading…</p>
          ) : visits.length === 0 ? (
            <p className="text-sm text-muted-foreground p-6">No visits yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Client</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Phone</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.slice(0, 5).map((v) => (
                    <tr key={v.id} className="border-b last:border-0 hover:bg-muted/40">
                      <td className="px-6 py-3 font-medium">{v.client_name}</td>
                      <td className="px-6 py-3 text-muted-foreground">{v.client_phone}</td>
                      <td className="px-6 py-3"><VisitStatusBadge status={v.status} /></td>
                      <td className="px-6 py-3 text-muted-foreground">
                        {new Date(v.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
