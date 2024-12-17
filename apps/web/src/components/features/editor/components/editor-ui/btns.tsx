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
  editorElementsAtom,
  openComponentSidebarAtom,
  postAtom,
  toggleComponentSidebarAtom,
  toggleSettingsSidebarAtom,
} from "../../libs/store";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import savePostAfterEdit from "@/lib/actions/save-post-after-edit";
import { toast } from "sonner";
import icon from "@/lib/icons";

export function SaveButton() {
  const [post] = useAtom(postAtom);
  const [element] = useAtom(editorElementsAtom);

  const { executeAsync, isExecuting } = useAction(savePostAfterEdit, {
    onSuccess: () => {
      toast.success("Post saved.");
    },
    onError: () => {
      toast.error("Failed to save post.");
    },
  });

  function handleClick() {
    console.log(!post || element.length === 0);

    if (!post || element.length === 0) {
      return;
    }

    executeAsync({
      postId: post.id,
      content: JSON.stringify(element),
    });
  }

  return (
    <Button onClick={() => handleClick()} disabled={isExecuting}>
      Save
    </Button>
  );
}

export function ToggleComponentsSidebar() {
  const [open] = useAtom(openComponentSidebarAtom);
  const [, toggleSidebar] = useAtom(toggleComponentSidebarAtom);

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
  const [, toggleSidebar] = useAtom(toggleSettingsSidebarAtom);

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
  const [, toggleSidebar] = useAtom(toggleComponentSidebarAtom);

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
  const [, toggleSidebar] = useAtom(toggleSettingsSidebarAtom);

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
