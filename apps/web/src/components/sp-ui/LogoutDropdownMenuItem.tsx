"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions/logout";
import { LogOut } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutDropdownMenuItem() {
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(logout, {
    onSuccess: () => {
      router.refresh();
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to logout.");
    },
  });

  return (
    <DropdownMenuItem
      className="cursor-pointer gap-2 p-2"
      disabled={isExecuting}
      onClick={() => executeAsync()}
    >
      <div className="flex size-6 items-center justify-center rounded-md border bg-background">
        <LogOut className="size-4" />
      </div>
      <div className="font-medium text-muted-foreground">Logout</div>
    </DropdownMenuItem>
  );
}
