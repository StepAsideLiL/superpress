"use client";

import { PostForEditType } from "@/lib/types";
import { useEffect } from "react";
import editorStore from "../libs/store";
import { useAtom } from "jotai";

export default function SetDataInJotai({ post }: { post: PostForEditType }) {
  const [, setPost] = useAtom(editorStore.postAtom);
  const [, setContent] = useAtom(editorStore.editorElementsAtom);

  useEffect(() => {
    setPost(post);

    setContent(JSON.parse(post.content));
  }, [post, setContent, setPost]);

  return null;
}
