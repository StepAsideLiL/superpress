"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import icon from "@/lib/icons";
import { editorStore } from "../../libs/store";

export function ToggleComponentsSidebar() {
  const open = editorStore.componentSidebar.useIsOpen();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"icon"}
            onClick={() => editorStore.componentSidebar.toggle()}
          >
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
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"icon"}
            onClick={() => editorStore.settingSidebar.toggle()}
          >
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
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="mr-2 size-6"
      onClick={() => editorStore.componentSidebar.toggle()}
    >
      <icon.X />
    </Button>
  );
}

export function CloseSettingsSidebar() {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="mr-2 size-6"
      onClick={() => editorStore.settingSidebar.toggle()}
    >
      <icon.X />
    </Button>
  );
}
