"use client";

import { useAtom } from "jotai";
import editorStore from "../libs/store";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdatePostTitle from "./UpdatePostTitle";

export default function PostTitle() {
  const [post] = useAtom(editorStore.postAtom);

  if (!post) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mx-auto w-96 rounded bg-muted px-2 py-1 text-sm text-muted-foreground hover:cursor-pointer">
          <h2 className="text-center">
            {post.title !== "" ? (
              post.title.length < 30 ? (
                post.title
              ) : (
                `${post.title.slice(0, 30)}...`
              )
            ) : (
              <span className="text-muted-foreground/80">No Title</span>
            )}{" "}
            &bull; <span className="capitalize">{post.postType}</span>
          </h2>
        </div>
      </DialogTrigger>

      <UpdatePostTitle />
    </Dialog>
  );
}
