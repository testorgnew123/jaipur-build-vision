import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobForm, type JobFormData } from "@/components/admin/JobForm";
import { useAdminFetch } from "@/hooks/useAdminFetch";
import { getStoredAuth } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/jobs/new")({
  beforeLoad: () => {
    const auth = getStoredAuth();
    if (!auth) throw redirect({ to: "/admin/login" });
  },
  component: NewJobPage,
});

function NewJobPage() {
  const adminFetch = useAdminFetch();
  const navigate = useNavigate();

  const handleSubmit = async (data: JobFormData) => {
    const payload = {
      ...data,
      skills: data.skills.split(",").map((s) => s.trim()).filter(Boolean),
    };
    const res = await adminFetch("/api/jobs", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? "Failed to create job");
    }
    toast.success("Job created");
    navigate({ to: "/admin/jobs" });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/admin/jobs" })}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="font-display text-2xl font-bold">New Job</h1>
          <p className="text-muted-foreground text-sm">Add a role to the careers page</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Role Details</CardTitle>
        </CardHeader>
        <CardContent>
          <JobForm onSubmit={handleSubmit} submitLabel="Create Job" />
        </CardContent>
      </Card>
    </div>
  );
}
