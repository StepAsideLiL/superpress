"use client";

import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import icon from "@/lib/icons";

export default function ToggleSidebarMenuButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarMenuButton onClick={toggleSidebar}>
      <icon.SidebarLeft />
      <span>Collapse</span>
    </SidebarMenuButton>
  );
}
