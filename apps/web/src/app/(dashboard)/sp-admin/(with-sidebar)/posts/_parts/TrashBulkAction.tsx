import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import deletePosts from "@/lib/actions/delete-posts";
import restorePosts from "@/lib/actions/restore-posts";
import { PostType } from "@/lib/types";
import { Table } from "@tanstack/react-table";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function TrashBulkAction({
  table,
  setRowSelection,
}: {
  table: Table<PostType>;
  setRowSelection: (v: object) => void;
}) {
  const [bulkActionOnTrashTab, setBulkActionOnTrashTab] =
    React.useState("no-action");
  const router = useRouter();

  const {
    executeAsync: executeRestorePostsAsync,
    isExecuting: isRestorePostsExecuting,
  } = useAction(restorePosts, {
    onSuccess: () => {
      setRowSelection({});
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to restore posts.");
    },
  });

  const {
    executeAsync: executeDeletePostsAsync,
    isExecuting: isDeletePostsExecuting,
  } = useAction(deletePosts, {
    onSuccess: () => {
      toast.success("Deleted permanently.");
      setRowSelection({});
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete!");
    },
  });

  function applyBulkActionOnTrashTab() {
    if (bulkActionOnTrashTab === "no-action") {
      return;
    }

    if (bulkActionOnTrashTab === "restore") {
      const selectedRows = table.getSelectedRowModel().flatRows.map((row) => {
        return {
          postId: row.original.id,
          statusBeforeTrashing: row.original.postmeta
            ? row.original.postmeta[0].value
            : "draft",
        };
      });

      executeRestorePostsAsync(selectedRows);
    }

    if (bulkActionOnTrashTab === "delete-parmanently") {
      const selectedRows = table
        .getSelectedRowModel()
        .flatRows.map((row) => row.original.id);

      executeDeletePostsAsync(selectedRows);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        defaultValue={bulkActionOnTrashTab}
        onValueChange={(value) => setBulkActionOnTrashTab(value)}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Bulk Actions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="no-action">Bulk Actions</SelectItem>
          <SelectItem value="restore">Restore</SelectItem>
          <SelectItem value="delete-parmanently">Delete Permanently</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant={"outline"}
        disabled={isRestorePostsExecuting || isDeletePostsExecuting}
        onClick={() => applyBulkActionOnTrashTab()}
      >
        Apply
      </Button>
    </div>
  );
}
