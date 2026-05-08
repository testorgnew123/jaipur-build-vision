import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useAdminFetch } from "@/hooks/useAdminFetch";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Job {
  id: number;
  title: string;
  type: string;
  experience: string;
  location: string;
  skills: string[];
  is_active: boolean;
  created_at: string;
}

export const Route = createFileRoute("/admin/jobs/")({
  component: JobsPage,
});

function JobsPage() {
  const adminFetch = useAdminFetch();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/jobs?all=1");
      setJobs(await res.json());
    } finally {
      setLoading(false);
    }
  }, [adminFetch]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: number, title: string) => {
    const res = await adminFetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Failed to delete"); return; }
    toast.success(`"${title}" deleted`);
    setJobs((j) => j.filter((x) => x.id !== id));
  };

  const handleToggle = async (job: Job) => {
    const res = await adminFetch(`/api/jobs/${job.id}`, {
      method: "PATCH",
      body: JSON.stringify({ is_active: !job.is_active }),
    });
    if (!res.ok) { toast.error("Failed to update"); return; }
    const updated = (await res.json()) as Job;
    setJobs((list) => list.map((x) => (x.id === job.id ? updated : x)));
    toast.success(updated.is_active ? "Job is now visible" : "Job hidden");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Jobs</h1>
          <p className="text-muted-foreground text-sm mt-1">{jobs.length} roles</p>
        </div>
        <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
          <Link to="/admin/jobs/new">
            <Plus className="w-4 h-4 mr-2" /> New Job
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Roles</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <p className="text-sm text-muted-foreground p-6">Loading…</p>
          ) : jobs.length === 0 ? (
            <p className="text-sm text-muted-foreground p-6">No jobs yet. Create your first role.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Title</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Type</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Experience</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Skills</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((j) => (
                    <tr key={j.id} className="border-b last:border-0 hover:bg-muted/40">
                      <td className="px-6 py-3 font-medium max-w-xs">
                        <p className="truncate">{j.title}</p>
                        <p className="text-xs text-muted-foreground">{j.location}</p>
                      </td>
                      <td className="px-6 py-3 text-muted-foreground whitespace-nowrap">{j.type}</td>
                      <td className="px-6 py-3 text-muted-foreground whitespace-nowrap">{j.experience}</td>
                      <td className="px-6 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(j.skills) ? j.skills : []).slice(0, 3).map((s) => (
                            <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleToggle(j)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            j.is_active ? "bg-gold-soft text-gold" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {j.is_active ? "Active" : "Hidden"}
                        </button>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                            <Link to="/admin/jobs/$id" params={{ id: String(j.id) }}>
                              <Pencil className="w-3.5 h-3.5" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete job?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete "{j.title}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground"
                                  onClick={() => handleDelete(j.id, j.title)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
