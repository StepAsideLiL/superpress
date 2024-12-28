"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAtom } from "jotai";
import editorStore from "../../libs/store";
import { cn } from "@/lib/utils";
import icon from "@/lib/icons";

export function ToggleComponentsSidebar() {
  const [open] = useAtom(editorStore.openComponentSidebarAtom);
  const [, toggleSidebar] = useAtom(editorStore.toggleComponentSidebarAtom);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={"icon"} onClick={() => toggleSidebar()}>
            <icon.Plus
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
  const [, toggleSidebar] = useAtom(editorStore.toggleSettingsSidebarAtom);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={"icon"} onClick={() => toggleSidebar()}>
            <icon.SidebarRight />
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

export function CloseComponentsSidebar() {
  const [, toggleSidebar] = useAtom(editorStore.toggleComponentSidebarAtom);

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="mr-2 size-6"
      onClick={() => toggleSidebar()}
    >
      <icon.X />
    </Button>
  );
}

export function CloseSettingsSidebar() {
  const [, toggleSidebar] = useAtom(editorStore.toggleSettingsSidebarAtom);

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="mr-2 size-6"
      onClick={() => toggleSidebar()}
    >
      <icon.X />
    </Button>
  );
}
