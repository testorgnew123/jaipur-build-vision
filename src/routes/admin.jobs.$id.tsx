import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobForm, type JobFormData } from "@/components/admin/JobForm";
import { useAdminFetch } from "@/hooks/useAdminFetch";
import { getStoredAuth } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Job {
  id: number;
  title: string;
  type: string;
  experience: string;
  location: string;
  description: string;
  skills: string[];
  is_active: boolean;
}

export const Route = createFileRoute("/admin/jobs/$id")({
  beforeLoad: () => {
    const auth = getStoredAuth();
    if (!auth) throw redirect({ to: "/admin/login" });
  },
  component: EditJobPage,
});

function EditJobPage() {
  const { id } = Route.useParams();
  const adminFetch = useAdminFetch();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((r) => r.json())
      .then((data: Job) => setJob(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: JobFormData) => {
    const payload = {
      ...data,
      skills: data.skills.split(",").map((s) => s.trim()).filter(Boolean),
    };
    const res = await adminFetch(`/api/jobs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? "Failed to update job");
    }
    toast.success("Job updated");
    navigate({ to: "/admin/jobs" });
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!job) return <p className="text-sm text-destructive">Job not found.</p>;

  const defaultValues: JobFormData = {
    title: job.title,
    type: job.type,
    experience: job.experience,
    location: job.location,
    description: job.description,
    skills: Array.isArray(job.skills) ? job.skills.join(", ") : "",
    is_active: job.is_active,
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/admin/jobs" })}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="font-display text-2xl font-bold">Edit Job</h1>
          <p className="text-muted-foreground text-sm">{job.title}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Role Details</CardTitle>
        </CardHeader>
        <CardContent>
          <JobForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
          />
        </CardContent>
      </Card>
    </div>
  );
}
