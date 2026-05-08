import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const createSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["admin", "super_admin"]),
  password: z.string().min(8, "Min 8 characters"),
});

const editSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["admin", "super_admin"]),
  password: z.string().min(8).optional().or(z.literal("")),
});

export type UserFormData = z.infer<typeof createSchema>;
export type UserEditFormData = z.infer<typeof editSchema>;

interface Props {
  defaultValues?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => Promise<void>;
  submitLabel?: string;
  isEdit?: boolean;
}

export function UserForm({ defaultValues, onSubmit, submitLabel = "Save", isEdit }: Props) {
  const schema = isEdit ? editSchema : createSchema;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(schema as typeof createSchema),
    defaultValues: { role: "admin", ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Name</Label>
        <Input placeholder="Jane Smith" {...register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label>Email</Label>
        <Input type="email" placeholder="jane@singlestop.co.in" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label>Role</Label>
        <Select value={watch("role")} onValueChange={(v) => setValue("role", v as UserFormData["role"])}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="super_admin">Super Admin</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label>{isEdit ? "New Password (leave blank to keep)" : "Password"}</Label>
        <Input type="password" placeholder="••••••••" {...register("password")} />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="bg-gold text-gold-foreground hover:bg-gold/90">
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        {submitLabel}
      </Button>
    </form>
  );
}
