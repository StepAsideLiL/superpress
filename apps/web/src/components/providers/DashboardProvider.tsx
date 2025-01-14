"use client";

import { Provider as JotaiProvider, useAtom } from "jotai";
import { SidebarProvider } from "@/components/ui/sidebar";
import store from "@/lib/store";
import { useEffect } from "react";

export default function DashboardProvider({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  const [, setUserId] = useAtom(store.userId);
  const [open, setOpen] = useAtom(store.isDashboardSidebarOpen);

  useEffect(() => {
    setUserId(userId);
  }, [setUserId, userId]);

  return (
    <JotaiProvider>
      <SidebarProvider open={open} onOpenChange={setOpen}>
        {children}
      </SidebarProvider>
    </JotaiProvider>
  );
}
