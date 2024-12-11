"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAtom } from "jotai";
import {
  openComponentSidebarAtom,
  toggleComponentSidebarAtom,
  toggleSettingsSidebarAtom,
} from "../libs/store";
import { PanelRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function SaveButton() {
  return <Button>Save</Button>;
}

export function ToggleComponentsSidebar() {
  const [open] = useAtom(openComponentSidebarAtom);
  const [, toggleSidebar] = useAtom(toggleComponentSidebarAtom);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={"icon"} onClick={() => toggleSidebar()}>
            <Plus
              className={cn("rotate-0 transition-all", open && "rotate-45")}
            />
            <span className="sr-only">
              {!open ? "Open components sidebar" : "Close components sidebar"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent align="start">
          <p>Components</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ToggleSettingsSidebar() {
  const [, toggleSidebar] = useAtom(toggleSettingsSidebarAtom);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={"icon"} onClick={() => toggleSidebar()}>
            <PanelRight />
            <span className="sr-only">Settings sidebar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent align="end">
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
