import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import movePostsToTrash from "@/lib/actions/move-posts-to-trash";
import { isBulkEditTableRowOpenAtom } from "@/lib/store";
import { PostType } from "@/lib/types";
import { Table } from "@tanstack/react-table";
import { useSetAtom } from "jotai";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function BulkAction({
  table,
  setRowSelection,
}: {
  table: Table<PostType>;
  setRowSelection: (v: object) => void;
}) {
  const [bulkAction, setBulkAction] = React.useState("no-action");
  const router = useRouter();
  const setIsBulkEditTableRowOpen = useSetAtom(isBulkEditTableRowOpenAtom);

  const { executeAsync, isExecuting } = useAction(movePostsToTrash, {
    onSuccess: () => {
      setRowSelection({});
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to move to trash.");
    },
  });

  function applyBulkAction() {
    if (bulkAction === "no-action") {
      return;
    }

    if (bulkAction === "move-to-trash") {
      const postsToTrash = table.getSelectedRowModel().flatRows.map((row) => {
        return {
          postId: row.original.id,
          status: row.original.post_status,
        };
      });

      executeAsync(postsToTrash);
    }

    if (bulkAction === "edit") {
      setIsBulkEditTableRowOpen(true);
    }
  }

  return (
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
          <SelectItem value="edit">Edit</SelectItem>
          <SelectItem value="move-to-trash">Move to Trash</SelectItem>
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
