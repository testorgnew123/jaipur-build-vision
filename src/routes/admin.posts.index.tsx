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

interface Post {
  id: number;
  slug: string;
  title: string;
  author: string;
  published_at: string;
  tags: string[];
  created_at: string;
}

export const Route = createFileRoute("/admin/posts/")({
  component: PostsPage,
});

function PostsPage() {
  const adminFetch = useAdminFetch();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts");
      setPosts(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (slug: string, title: string) => {
    const res = await adminFetch(`/api/posts/${slug}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Failed to delete"); return; }
    toast.success(`"${title}" deleted`);
    setPosts((p) => p.filter((x) => x.slug !== slug));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground text-sm mt-1">{posts.length} posts</p>
        </div>
        <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
          <Link to="/admin/posts/new">
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <p className="text-sm text-muted-foreground p-6">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-muted-foreground p-6">No posts yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Title</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Author</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Tags</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p.slug} className="border-b last:border-0 hover:bg-muted/40">
                      <td className="px-6 py-3 font-medium max-w-xs">
                        <p className="truncate">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.slug}</p>
                      </td>
                      <td className="px-6 py-3 text-muted-foreground">{p.author}</td>
                      <td className="px-6 py-3 text-muted-foreground whitespace-nowrap">
                        {new Date(p.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(p.tags) ? p.tags : []).slice(0, 2).map((t) => (
                            <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                            <Link to="/admin/posts/$id" params={{ id: p.slug }}>
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
                                <AlertDialogTitle>Delete post?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete "{p.title}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground"
                                  onClick={() => handleDelete(p.slug, p.title)}
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
