"use client";

import { PostForEditType } from "@/lib/types";
import { useEffect } from "react";
import { editorStore } from "../libs/store";

export default function SetDataInJotai({ post }: { post: PostForEditType }) {
  useEffect(() => {
    editorStore.post.setPost(post);

    editorStore.element.setElements(JSON.parse(post.content));
  }, [post]);

  return null;
}
