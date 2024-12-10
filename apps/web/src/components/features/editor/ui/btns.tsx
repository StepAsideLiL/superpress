"use client";

import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import {
  openComponentSidebarAtom,
  toggleComponentSidebarAtom,
  toggleSettingsSidebarAtom,
} from "../store";
import { PanelRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function SaveButton() {
  return <Button>Save</Button>;
}

export function ToggleComponentsSidebar() {
  const [open] = useAtom(openComponentSidebarAtom);
  const [, toggleSidebar] = useAtom(toggleComponentSidebarAtom);

  return (
    <Button size={"icon"} onClick={() => toggleSidebar()}>
      <Plus className={cn("rotate-0 transition-all", open && "rotate-45")} />
    </Button>
  );
}

export function ToggleSettingsSidebar() {
  const [, toggleSidebar] = useAtom(toggleSettingsSidebarAtom);

  return (
    <Button size={"icon"} onClick={() => toggleSidebar()}>
      <PanelRight />
    </Button>
  );
}
