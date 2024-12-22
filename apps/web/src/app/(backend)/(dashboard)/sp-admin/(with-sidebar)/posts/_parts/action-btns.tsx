"use client";

import "./styles.css";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import movePostsToTrash from "@/lib/actions/move-posts-to-trash";
import restorePosts from "@/lib/actions/restore-posts";
import deletePosts from "@/lib/actions/delete-posts";
import { useSetAtom } from "jotai";
import ButtonLink from "@/components/sp-ui/ButtonLink";
import { quickEditRowIdAtom } from "@/lib/store";
import Link from "next/link";

export function AddNewPostButton({ postType }: { postType: string }) {
  return (
    <Button variant={"outline"} className="gap-1" asChild>
      <Link href={`/sp-admin/add-post?post_type=${postType}`}>
        Add New <span className="capitalize">{postType}</span>
      </Link>
    </Button>
  );
}

export function QuickEditButton({ rowId }: { rowId: string }) {
  const setQuickEditRowId = useSetAtom(quickEditRowIdAtom);

  return (
    <Button
      variant={"link"}
      className="p-0 text-xs"
      onClick={() => setQuickEditRowId(rowId)}
    >
      Quick Edit
    </Button>
  );
}

export function MoveToTrashButton({
  postId,
  postStatus,
}: {
  postId: string;
  postStatus: string;
}) {
  const router = useRouter();
  const { executeAsync, isExecuting } = useAction(movePostsToTrash, {
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to move to trash.");
    },
  });

  return (
    <ButtonLink
      className="text-red-600"
      disabled={isExecuting}
      onClick={() => {
        executeAsync([{ postId: postId, status: postStatus }]);
      }}
    >
      Trash
    </ButtonLink>
  );
}

export function RestoreButton({
  postId,
  statusBeforeTrashing,
}: {
  postId: string;
  statusBeforeTrashing: string;
}) {
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(restorePosts, {
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to restore posts.");
    },
  });

  return (
    <ButtonLink
      disabled={isExecuting}
      onClick={() => {
        executeAsync([
          { postId: postId, statusBeforeTrashing: statusBeforeTrashing },
        ]);
      }}
    >
      Restore
    </ButtonLink>
  );
}

export function DeleteParmanentlyButton({ postId }: { postId: string }) {
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(deletePosts, {
    onSuccess: () => {
      toast.success("Deleted permanently.");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete!");
    },
  });

  return (
    <ButtonLink
      disabled={isExecuting}
      className="text-red-600"
      onClick={() => {
        executeAsync([postId]);
      }}
    >
      Delete Permanently
    </ButtonLink>
  );
}
