import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { UserForm, type UserFormData } from "@/components/admin/UserForm";
import { useAdminFetch } from "@/hooks/useAdminFetch";
import { getStoredAuth, isSuperAdmin } from "@/lib/auth";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export const Route = createFileRoute("/admin/users")({
  beforeLoad: () => {
    const auth = getStoredAuth();
    if (!auth) throw redirect({ to: "/admin/login" });
    if (!isSuperAdmin(auth.user)) throw redirect({ to: "/admin/dashboard" });
  },
  component: UsersPage,
});

function UsersPage() {
  const adminFetch = useAdminFetch();
  const auth = getStoredAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/users");
      setUsers(await res.json());
    } finally {
      setLoading(false);
    }
  }, [adminFetch]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (data: UserFormData) => {
    const res = await adminFetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? "Failed to create user");
    }
    toast.success("User created");
    setAddOpen(false);
    load();
  };

  const handleEdit = async (data: UserFormData) => {
    if (!editUser) return;
    const payload: Partial<UserFormData> = { ...data };
    if (!payload.password) delete payload.password;
    const res = await adminFetch(`/api/users/${editUser.id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update user");
    toast.success("User updated");
    setEditUser(null);
    load();
  };

  const handleDelete = async (id: number, name: string) => {
    const res = await adminFetch(`/api/users/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      toast.error((err as { error?: string }).error ?? "Failed to delete");
      return;
    }
    toast.success(`${name} removed`);
    setUsers((u) => u.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground text-sm mt-1">{users.length} team members</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Plus className="w-4 h-4 mr-2" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <UserForm onSubmit={handleCreate} submitLabel="Create User" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit dialog */}
      <Dialog open={!!editUser} onOpenChange={(o) => !o && setEditUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editUser && (
            <UserForm
              defaultValues={{ name: editUser.name, email: editUser.email, role: editUser.role as UserFormData["role"] }}
              onSubmit={handleEdit}
              submitLabel="Save Changes"
              isEdit
            />
          )}
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team Members</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <p className="text-sm text-muted-foreground p-6">Loading…</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Email</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Role</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Joined</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b last:border-0 hover:bg-muted/40">
                      <td className="px-6 py-3 font-medium">{u.name}</td>
                      <td className="px-6 py-3 text-muted-foreground">{u.email}</td>
                      <td className="px-6 py-3">
                        <Badge variant={u.role === "super_admin" ? "default" : "secondary"} className="text-xs">
                          {u.role.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="px-6 py-3 text-muted-foreground">
                        {new Date(u.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditUser(u)}>
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          {u.id !== auth?.user.id && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove user?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently remove {u.name} from the admin panel.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground"
                                    onClick={() => handleDelete(u.id, u.name)}
                                  >
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
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
