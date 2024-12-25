"use client";

import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import icon from "@/lib/icons";
import store from "@/lib/store";
import { useAtom } from "jotai";

export default function ToggleSidebarMenuButton() {
  const { toggleSidebar } = useSidebar();
  const [open, setOpen] = useAtom(store.isDashboardSidebarOpen);

  return (
    <SidebarMenuButton
      onClick={() => {
        toggleSidebar();
        setOpen(!open);
      }}
    >
      <icon.SidebarLeft />
      <span>Collapse</span>
    </SidebarMenuButton>
  );
}
