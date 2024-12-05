"use client";

import { CurrentUserType, UserDataTableRowType } from "@/lib/types";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import updateUserRoleByBulk from "@/lib/actions/update-user-role-by-bulk";

export default function UserRoleBulkAction({
  user,
  table,
}: {
  user: CurrentUserType;
  table: Table<UserDataTableRowType>;
}) {
  const [bulkAction, setBulkAction] = useState("no-action");
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(updateUserRoleByBulk, {
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to update user role.");
    },
  });

  function applyBulkAction() {
    if (bulkAction === "no-action") {
      return;
    }

    const userRole = table
      .getSelectedRowModel()
      .flatRows.filter((row) => row.original.id !== user.id)
      .map((row) => {
        return {
          userId: user.id,
          roleId: row.original.roleId,
          role: bulkAction,
        };
      });

    executeAsync(userRole);
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        defaultValue={bulkAction}
        onValueChange={(value) => setBulkAction(value)}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Change role to..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="no-action">Change role to...</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectItem value="author">Author</SelectItem>
          <SelectItem value="contributor">Contributor</SelectItem>
          <SelectItem value="subscriber">Subscribe</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant={"outline"}
        disabled={isExecuting}
        onClick={() => applyBulkAction()}
      >
        Apply
      </Button>
    </div>
  );
}
