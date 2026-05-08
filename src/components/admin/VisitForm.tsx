import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const schema = z.object({
  client_name: z.string().min(2, "Name required"),
  client_phone: z.string().min(7, "Phone required"),
  notes: z.string().optional(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});

export type VisitFormData = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<VisitFormData>;
  onSubmit: (data: VisitFormData) => Promise<void>;
  submitLabel?: string;
}

export function VisitForm({ defaultValues, onSubmit, submitLabel = "Save" }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VisitFormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: "pending", ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Client Name</Label>
          <Input placeholder="John Doe" {...register("client_name")} />
          {errors.client_name && <p className="text-xs text-destructive">{errors.client_name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Phone</Label>
          <Input type="tel" placeholder="+91 98765 43210" {...register("client_phone")} />
          {errors.client_phone && <p className="text-xs text-destructive">{errors.client_phone.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Status</Label>
        <Select value={watch("status")} onValueChange={(v) => setValue("status", v as VisitFormData["status"])}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Notes</Label>
        <Textarea placeholder="Optional internal notes…" rows={3} {...register("notes")} />
      </div>

      <Button type="submit" disabled={isSubmitting} className="bg-gold text-gold-foreground hover:bg-gold/90">
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        {submitLabel}
      </Button>
    </form>
  );
}
