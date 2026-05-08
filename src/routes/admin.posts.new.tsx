import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostForm, type PostFormData } from "@/components/admin/PostForm";
import { useAdminFetch } from "@/hooks/useAdminFetch";
import { getStoredAuth, isSuperAdmin } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/posts/new")({
  beforeLoad: () => {
    const auth = getStoredAuth();
    if (!auth) throw redirect({ to: "/admin/login" });
    if (!isSuperAdmin(auth.user)) throw redirect({ to: "/admin/dashboard" });
  },
  component: NewPostPage,
});

function NewPostPage() {
  const adminFetch = useAdminFetch();
  const navigate = useNavigate();

  const handleSubmit = async (data: PostFormData) => {
    const payload = {
      ...data,
      tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const res = await adminFetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? "Failed to create post");
    }
    toast.success("Post created");
    navigate({ to: "/admin/posts" });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/admin/posts" })}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="font-display text-2xl font-bold">New Blog Post</h1>
          <p className="text-muted-foreground text-sm">Create and publish a new article</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm onSubmit={handleSubmit} submitLabel="Publish Post" />
        </CardContent>
      </Card>
    </div>
  );
}
