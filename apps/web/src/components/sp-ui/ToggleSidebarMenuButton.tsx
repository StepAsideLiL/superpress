"use client";

import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";

export default function ToggleSidebarMenuButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarMenuButton onClick={toggleSidebar}>
      <PanelLeft />
      <span>Collapse</span>
    </SidebarMenuButton>
  );
}
