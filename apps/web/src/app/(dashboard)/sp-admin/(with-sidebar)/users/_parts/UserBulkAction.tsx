"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deteteUsers } from "@/lib/actions/delete-users";
import { CurrentUserType, UserDataTableRowType } from "@/lib/types";
import { Table } from "@tanstack/react-table";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UserBulkAction({
  user,
  table,
  setRowSelection,
}: {
  user: CurrentUserType;
  table: Table<UserDataTableRowType>;
  setRowSelection: (v: object) => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [bulkAction, setBulkAction] = useState("no-action");
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(deteteUsers, {
    onSuccess: () => {
      router.refresh();
      setRowSelection({});
    },
  });

  function applyBulkAction() {
    if (bulkAction === "no-action") {
      return;
    }

    if (bulkAction === "delete") {
      if (table.getSelectedRowModel().flatRows.length !== 0) {
        setOpenDialog(true);
      } else {
        toast.warning("Select users to delete.");
      }
    }

    if (bulkAction === "send-password-reset") {
      // TODO: Send password reset
    }
  }

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Seleted User IDs</DialogTitle>
          </DialogHeader>

          <div>
            <ScrollArea className="h-96 rounded border p-1">
              {table.getSelectedRowModel().flatRows.map((row) => {
                return (
                  <div key={row.original.id} className="text-sm">
                    <span>
                      {row.original.username} {`(${row.original.role})`}
                    </span>
                    {row.original.id === user.id && (
                      <span className="text-muted-foreground">
                        {" "}
                        - You (account will not be deleted)
                      </span>
                    )}
                  </div>
                );
              })}
            </ScrollArea>
          </div>

          <DialogFooter>
            <Button
              onClick={() =>
                executeAsync(
                  table
                    .getSelectedRowModel()
                    .flatRows.map((row) => row.original.id)
                )
              }
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-2">
        <Select
          defaultValue={bulkAction}
          onValueChange={(value) => setBulkAction(value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Bulk Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-action">Bulk Actions</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="send-password-reset">
              Send Password Reset
            </SelectItem>
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
    </div>
  );
}
