"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function BulkAction() {
  const [bulkAction, setBulkAction] = useState("no-action");

  function applyBulkAction() {
    if (bulkAction === "no-action") {
      return;
    }

    if (bulkAction === "Delete") {
      // TODO: Delete
    }

    if (bulkAction === "send-password-reset") {
      // TODO: Send password reset
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
          <SelectItem value="Delete">Delete</SelectItem>
          <SelectItem value="send-password-reset">
            Send Password Reset
          </SelectItem>
        </SelectContent>
      </Select>

      <Button variant={"outline"} onClick={() => applyBulkAction()}>
        Apply
      </Button>
    </div>
  );
}
