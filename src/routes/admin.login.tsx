import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { getStoredAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password required"),
});

type FormData = z.infer<typeof schema>;

export const Route = createFileRoute("/admin/login")({
  beforeLoad: () => {
    const auth = getStoredAuth();
    if (auth) throw redirect({ to: "/admin/dashboard" });
  },
  component: LoginPageWrapper,
});

function LoginPageWrapper() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      await login(data.email, data.password);
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-sm shadow-elegant">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="rounded-xl bg-gold p-2.5">
              <Building2 className="w-6 h-6 text-gold-foreground" />
            </div>
          </div>
          <CardTitle className="font-display text-2xl">Single Stop Admin</CardTitle>
          <CardDescription>Sign in to manage your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@singlestop.co.in" {...register("email")} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>
            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>
            )}
            <Button type="submit" className="w-full bg-gold text-gold-foreground hover:bg-gold/90" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
