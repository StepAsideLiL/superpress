"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ButtonLink from "@/components/sp-ui/ButtonLink";
import { deteteUsers } from "@/lib/actions/delete-users";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserDataTableRowType } from "@/lib/types";

export function DeleteButton({ user }: { user: UserDataTableRowType }) {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(deteteUsers, {
    onSuccess: () => {
      setOpenDialog(false);
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to delete user.");
    },
  });

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>

          <div>
            <div className="rounded border p-3 text-sm">
              <span>
                {user.username} {`(${user.role})`}
              </span>
              {/* <span className="text-muted-foreground">
                {" "}
                - You (account will not be deleted)
              </span> */}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant={"destructive"}
              onClick={() => executeAsync([user.id])}
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ButtonLink
        className="text-red-600"
        disabled={isExecuting}
        onClick={() => setOpenDialog(true)}
      >
        Detele
      </ButtonLink>
    </>
  );
}

export function SendPasswordPasswordButton() {
  return <ButtonLink>Send Password Reset</ButtonLink>;
}
