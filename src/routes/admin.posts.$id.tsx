import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostForm, type PostFormData } from "@/components/admin/PostForm";
import { useAdminFetch } from "@/hooks/useAdminFetch";
import { getStoredAuth, isSuperAdmin } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  published_at: string;
  reading_time: string;
  tags: string[];
  content: string;
}

export const Route = createFileRoute("/admin/posts/$id")({
  beforeLoad: () => {
    const auth = getStoredAuth();
    if (!auth) throw redirect({ to: "/admin/login" });
    if (!isSuperAdmin(auth.user)) throw redirect({ to: "/admin/dashboard" });
  },
  component: EditPostPage,
});

function EditPostPage() {
  const { id: slug } = Route.useParams();
  const adminFetch = useAdminFetch();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((r) => r.json())
      .then((data: Post) => setPost(data))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (data: PostFormData) => {
    const payload = {
      ...data,
      tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const res = await adminFetch(`/api/posts/${slug}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update post");
    toast.success("Post updated");
    navigate({ to: "/admin/posts" });
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!post) return <p className="text-sm text-destructive">Post not found.</p>;

  const defaultValues: PostFormData = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    cover: post.cover,
    author: post.author,
    published_at: post.published_at.split("T")[0],
    reading_time: post.reading_time,
    tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    content: post.content,
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/admin/posts" })}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="font-display text-2xl font-bold">Edit Post</h1>
          <p className="text-muted-foreground text-sm font-mono">{post.slug}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
            isEdit
          />
        </CardContent>
      </Card>
    </div>
  );
}
