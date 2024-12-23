"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { editorElementsAtom, postAtom } from "../libs/store";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import addNewPost from "@/lib/actions/add-new-post";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import savePostAfterEdit from "@/lib/actions/save-post-after-edit";

export default function SavePublishBtn() {
  const [post] = useAtom(postAtom);
  const pathname = usePathname();

  if (!post) return null;

  if (pathname.includes("add-post")) {
    return <PublishSheet />;
  }

  return <SavePostBtn />;
}

function PublishSheet() {
  const [post] = useAtom(postAtom);
  const [element] = useAtom(editorElementsAtom);

  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(addNewPost, {
    onSuccess: (res) => {
      router.push(`/sp-admin/edit-post?id=${res.data?.id}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to add new post.");
    },
  });

  if (!post) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button disabled={post.title === ""}>Publish</Button>
      </SheetTrigger>

      <SheetContent side={"right"} className="space-y-4">
        <SheetHeader>
          <SheetTitle>Publish Post</SheetTitle>
        </SheetHeader>

        <div className="flex w-full items-center gap-2">
          <Button
            onClick={() =>
              executeAsync({
                title: post.title,
                slug: post.slug,
                postType: post.postType,
                postStatus: "publish",
                content: JSON.stringify(element),
              })
            }
            disabled={isExecuting}
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

function SavePostBtn() {
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

  if (!post) return null;

  return (
    <Button
      onClick={() =>
        executeAsync({
          post: {
            title: post.title,
            slug: post.slug,
            postStatus: post.postStatus,
          },
          postId: post.id,
          content: JSON.stringify(element),
        })
      }
      disabled={isExecuting || post.title === ""}
    >
      Save
    </Button>
  );
}
