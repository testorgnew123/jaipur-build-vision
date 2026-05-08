import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const schema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Lowercase, numbers and hyphens only"),
  title: z.string().min(3).max(200),
  excerpt: z.string().min(10).max(500),
  cover: z.string().url("Must be a valid URL"),
  author: z.string().min(2),
  published_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD"),
  reading_time: z.string().min(1),
  tags: z.string(),
  content: z.string().min(20),
});

export type PostFormData = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => Promise<void>;
  submitLabel?: string;
  isEdit?: boolean;
}

export function PostForm({ defaultValues, onSubmit, submitLabel = "Save Post", isEdit }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const title = watch("title");
  useEffect(() => {
    if (isEdit) return;
    const slug = title
      ?.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim() ?? "";
    setValue("slug", slug);
  }, [title, isEdit, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <Label>Title</Label>
        <Input placeholder="How to build a house in Jaipur" {...register("title")} />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Slug</Label>
        <Input placeholder="how-to-build-a-house" {...register("slug")} />
        {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Excerpt</Label>
        <Textarea placeholder="Short summary shown in listings…" rows={2} {...register("excerpt")} />
        {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Cover Image URL</Label>
          <Input placeholder="https://images.unsplash.com/…" {...register("cover")} />
          {errors.cover && <p className="text-xs text-destructive">{errors.cover.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Author</Label>
          <Input placeholder="SingleStop Team" {...register("author")} />
          {errors.author && <p className="text-xs text-destructive">{errors.author.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Publish Date</Label>
          <Input type="date" {...register("published_at")} />
          {errors.published_at && <p className="text-xs text-destructive">{errors.published_at.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Reading Time</Label>
          <Input placeholder="5 min read" {...register("reading_time")} />
          {errors.reading_time && <p className="text-xs text-destructive">{errors.reading_time.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Tags <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
        <Input placeholder="construction, jaipur, tips" {...register("tags")} />
        {errors.tags && <p className="text-xs text-destructive">{errors.tags.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Content <span className="text-muted-foreground text-xs">(HTML)</span></Label>
        <Textarea
          {...register("content")}
          rows={20}
          className="font-mono text-sm"
          placeholder="<p>Write your post HTML here…</p>"
        />
        {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="bg-gold text-gold-foreground hover:bg-gold/90">
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        {submitLabel}
      </Button>
    </form>
  );
}
