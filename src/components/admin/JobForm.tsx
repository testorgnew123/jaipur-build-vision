import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const schema = z.object({
  title: z.string().min(2, "Title is required").max(120),
  type: z.string().min(1, "Type is required"),
  experience: z.string().min(1, "Experience is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description is too short"),
  skills: z.string(),
  is_active: z.boolean(),
});

export type JobFormData = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<JobFormData>;
  onSubmit: (data: JobFormData) => Promise<void>;
  submitLabel?: string;
}

const DEFAULTS: JobFormData = {
  title: "",
  type: "Full-time",
  experience: "",
  location: "Jaipur, Rajasthan",
  description: "",
  skills: "",
  is_active: true,
};

export function JobForm({ defaultValues, onSubmit, submitLabel = "Save Job" }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(schema),
    defaultValues: { ...DEFAULTS, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <Label>Title</Label>
        <Input placeholder="Site Engineer" {...register("title")} />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Employment Type</Label>
          <Input placeholder="Full-time / Part-time / Contract" {...register("type")} />
          {errors.type && <p className="text-xs text-destructive">{errors.type.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Experience</Label>
          <Input placeholder="2–5 years" {...register("experience")} />
          {errors.experience && <p className="text-xs text-destructive">{errors.experience.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Location</Label>
        <Input placeholder="Jaipur, Rajasthan" {...register("location")} />
        {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Description</Label>
        <Textarea
          rows={5}
          placeholder="What this person will do, day-to-day…"
          {...register("description")}
        />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Skills <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
        <Input placeholder="AutoCAD, Site Supervision, MS Project" {...register("skills")} />
        {errors.skills && <p className="text-xs text-destructive">{errors.skills.message}</p>}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="h-4 w-4" {...register("is_active")} />
        <span>Visible on the careers page</span>
      </label>

      <Button type="submit" disabled={isSubmitting} className="bg-gold text-gold-foreground hover:bg-gold/90">
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        {submitLabel}
      </Button>
    </form>
  );
}
