import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { VisitForm, type VisitFormData } from "@/components/admin/VisitForm";
import { useAdminFetch } from "@/hooks/useAdminFetch";
import { getStoredAuth, isSuperAdmin } from "@/lib/auth";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Visit {
  id: number;
  client_name: string;
  client_phone: string;
  notes: string | null;
  status: string;
  created_at: string;
}

export const Route = createFileRoute("/admin/visits/$id")({
  beforeLoad: () => {
    if (!getStoredAuth()) throw redirect({ to: "/admin/login" });
  },
  component: VisitDetailPage,
});

function VisitDetailPage() {
  const { id } = Route.useParams();
  const adminFetch = useAdminFetch();
  const navigate = useNavigate();
  const auth = getStoredAuth();
  const isSA = auth ? isSuperAdmin(auth.user) : false;

  const [visit, setVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch(`/api/visits/${id}`)
      .then((r) => r.json())
      .then((data: Visit) => setVisit(data))
      .finally(() => setLoading(false));
  }, [id, adminFetch]);

  const handleUpdate = async (data: VisitFormData) => {
    const res = await adminFetch(`/api/visits/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update");
    toast.success("Visit updated");
    navigate({ to: "/admin/visits" });
  };

  const handleDelete = async () => {
    await adminFetch(`/api/visits/${id}`, { method: "DELETE" });
    toast.success("Visit deleted");
    navigate({ to: "/admin/visits" });
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!visit) return <p className="text-sm text-destructive">Visit not found.</p>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/admin/visits" })}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-display text-2xl font-bold">Edit Visit</h1>
            <p className="text-muted-foreground text-sm">#{visit.id}</p>
          </div>
        </div>
        {isSA && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete visit?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete {visit.client_name}'s visit record.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground" onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Visit Details</CardTitle>
        </CardHeader>
        <CardContent>
          <VisitForm
            defaultValues={{
              client_name: visit.client_name,
              client_phone: visit.client_phone,
              notes: visit.notes ?? "",
              status: visit.status as VisitFormData["status"],
            }}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        </CardContent>
      </Card>
    </div>
  );
}
