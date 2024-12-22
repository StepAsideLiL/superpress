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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useRouter } from "next/navigation";
import addNewPost from "@/lib/actions/add-new-post";

export function SaveButton() {
  const [post] = useAtom(postAtom);
  const [element] = useAtom(editorElementsAtom);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();

  const { executeAsync: publishAction, isExecuting: isPublishActionExecuting } =
    useAction(addNewPost, {
      onSuccess: (res) => {
        router.push(`/sp-admin/edit-post?id=${res.data?.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Failed to add new post.");
      },
    });

  const { executeAsync: saveAction, isExecuting: isSaveActionExecuting } =
    useAction(savePostAfterEdit, {
      onSuccess: () => {
        toast.success("Post saved.");
      },
      onError: () => {
        toast.error("Failed to save post.");
      },
    });

  function handleSave() {
    if (!post || element.length === 0) {
      return;
    }

    saveAction({
      post: {
        title: post.title,
        slug: post.slug,
        postStatus: post.postStatus,
      },
      postId: post.id,
      content: JSON.stringify(element),
    });
  }

  function handlePublish() {
    if (!post || element.length === 0) {
      return;
    }

    publishAction({
      title: post.title,
      slug: post.slug,
      postType: post.postType,
      postStatus: "publish",
      content: JSON.stringify(element),
    });
  }

  if (post?.postStatus === "draft") {
    return (
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            onClick={() => setIsSheetOpen(true)}
            disabled={post.title === ""}
          >
            Publish
          </Button>
        </SheetTrigger>

        <SheetContent side={"right"} className="space-y-4">
          <SheetHeader>
            <SheetTitle>Publish Post</SheetTitle>
          </SheetHeader>

          <div className="flex w-full items-center gap-2">
            <Button
              onClick={() => handlePublish()}
              disabled={isPublishActionExecuting}
              className="w-full"
            >
              Publish
            </Button>
            <SheetClose asChild>
              <Button variant={"outline"} className="w-full">
                Cancel
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Button
      onClick={() => handleSave()}
      disabled={isSaveActionExecuting || post?.title === ""}
    >
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
