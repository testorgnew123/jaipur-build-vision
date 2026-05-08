import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisitStatusBadge } from "@/components/admin/VisitStatusBadge";
import { VisitForm, type VisitFormData } from "@/components/admin/VisitForm";
import { useAdminFetch } from "@/hooks/useAdminFetch";
import { getStoredAuth, isSuperAdmin } from "@/lib/auth";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Visit {
  id: number;
  client_name: string;
  client_phone: string;
  notes: string | null;
  status: string;
  created_at: string;
}

export const Route = createFileRoute("/admin/visits")({
  beforeLoad: () => {
    if (!getStoredAuth()) throw redirect({ to: "/admin/login" });
  },
  component: VisitsPage,
});

function VisitsPage() {
  const adminFetch = useAdminFetch();
  const auth = getStoredAuth();
  const isSA = auth ? isSuperAdmin(auth.user) : false;

  const [visits, setVisits] = useState<Visit[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url = filter !== "all" ? `/api/visits?status=${filter}` : "/api/visits";
      const res = await adminFetch(url);
      setVisits(await res.json());
    } finally {
      setLoading(false);
    }
  }, [adminFetch, filter]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (data: VisitFormData) => {
    const res = await adminFetch("/api/visits", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create visit");
    toast.success("Visit added");
    setAddOpen(false);
    load();
  };

  const handleStatusChange = async (id: number, status: string) => {
    await adminFetch(`/api/visits/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    setVisits((v) => v.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success("Status updated");
  };

  const handleDelete = async (id: number) => {
    await adminFetch(`/api/visits/${id}`, { method: "DELETE" });
    setVisits((v) => v.filter((x) => x.id !== id));
    toast.success("Visit deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Scheduled Visits</h1>
          <p className="text-muted-foreground text-sm mt-1">{visits.length} total</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Plus className="w-4 h-4 mr-2" /> Add Visit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Visit</DialogTitle>
            </DialogHeader>
            <VisitForm onSubmit={handleCreate} submitLabel="Add Visit" />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-3">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Visits</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <p className="text-sm text-muted-foreground p-6">Loading…</p>
          ) : visits.length === 0 ? (
            <p className="text-sm text-muted-foreground p-6">No visits found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Client</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Phone</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((v) => (
                    <tr key={v.id} className="border-b last:border-0 hover:bg-muted/40">
                      <td className="px-6 py-3 font-medium">{v.client_name}</td>
                      <td className="px-6 py-3 text-muted-foreground">{v.client_phone}</td>
                      <td className="px-6 py-3">
                        <Select value={v.status} onValueChange={(s) => handleStatusChange(v.id, s)}>
                          <SelectTrigger className="h-7 w-32 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-3 text-muted-foreground">
                        {new Date(v.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                            <Link to="/admin/visits/$id" params={{ id: String(v.id) }}>
                              <Pencil className="w-3.5 h-3.5" />
                            </Link>
                          </Button>
                          {isSA && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete visit?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete {v.client_name}'s visit record.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground"
                                    onClick={() => handleDelete(v.id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
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
