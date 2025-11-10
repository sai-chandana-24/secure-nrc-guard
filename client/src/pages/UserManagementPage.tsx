import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

type AppRole = "admin" | "district" | "block" | "supervisor" | "teacher" | "nrc" | "public";

type AppUser = {
  _id: string;
  id?: string;
  email: string;
  role: AppRole;
};

const ROLES: AppRole[] = [
  "admin",
  "district",
  "block",
  "supervisor",
  "teacher",
  "nrc",
  "public",
];

export default function UserManagementPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    id: string;
    email: string;
    fromRole: AppRole;
    toRole: AppRole;
  } | null>(null);

  // Gate: only admins may view
  if (!user) return null;
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data.users as AppUser[];
    },
  });

  const updateRole = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: AppRole }) => {
      await axiosInstance.patch(`/users/${id}/role`, { role });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "Role updated", description: "The user's role has been changed." });
    },
    onError: (err: any) => {
      const status = err?.response?.status;
      toast({ title: "Failed to update role", description: status ? `HTTP ${status}` : "Please try again.", variant: "destructive" });
    },
  });

  const users = useMemo(() => data ?? [], [data]);

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (safePage - 1) * pageSize;
  const pagedUsers = users.slice(start, start + pageSize);

  const onSelectRole = (u: AppUser, newRole: AppRole) => {
    const id = (u as any)._id || u.id || "";
    setPendingChange({ id, email: u.email, fromRole: u.role, toRole: newRole });
    setConfirmOpen(true);
  };

  const confirmChange = () => {
    if (!pendingChange) return;
    updateRole.mutate({ id: pendingChange.id, role: pendingChange.toRole });
    setConfirmOpen(false);
    setPendingChange(null);
  };

  const cancelChange = () => {
    setConfirmOpen(false);
    setPendingChange(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">User Management</h1>

        {isLoading && (
          <div className="text-muted-foreground">Loading users…</div>
        )}
        {isError && (
          <div className="flex items-center justify-between p-3 rounded border border-red-200 bg-red-50 text-red-700">
            <div>
              Failed to load users{(error as any)?.response?.status ? ` (HTTP ${(error as any).response.status})` : ""}.
            </div>
            <button className="border rounded px-3 py-1 bg-white" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedUsers.map((u) => {
                    const id = (u as any)._id || u.id;
                    return (
                      <TableRow key={id}>
                        <TableCell>{u.email}</TableCell>
                        <TableCell className="capitalize">{u.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select
                              value={u.role}
                              onValueChange={(val) => onSelectRole(u, val as AppRole)}
                              disabled={updateRole.isPending}
                            >
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                {ROLES.map((r) => (
                                  <SelectItem key={r} value={r}>
                                    {r}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {pagedUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {safePage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled={safePage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
                  Previous
                </Button>
                <Button variant="outline" disabled={safePage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={(o) => (o ? setConfirmOpen(true) : cancelChange())}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm role change</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingChange
                ? `Change ${pendingChange.email}'s role from ${pendingChange.fromRole} to ${pendingChange.toRole}?`
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmChange} disabled={updateRole.isPending}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}


