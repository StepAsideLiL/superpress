"use client";

import ButtonLink from "@/components/sp-ui/ButtonLink";
import { deteteUsers } from "@/lib/actions/delete-users";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteButton({ userId }: { userId: string }) {
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(deteteUsers, {
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to delete user.");
    },
  });

  return (
    <ButtonLink
      className="text-red-600"
      disabled={isExecuting}
      onClick={() => executeAsync([userId])}
    >
      Detele
    </ButtonLink>
  );
}

export function SendPasswordPasswordButton() {
  return <ButtonLink>Send Password Reset</ButtonLink>;
}
