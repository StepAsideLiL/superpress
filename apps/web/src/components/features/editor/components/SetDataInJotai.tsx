"use client";

import { PostForEditType } from "@/lib/types";
import { useEffect } from "react";
import { editorElementsAtom, postAtom } from "../libs/store";
import { useAtom } from "jotai";

export default function SetDataInJotai({ post }: { post: PostForEditType }) {
  const [, setPost] = useAtom(postAtom);
  const [, setContent] = useAtom(editorElementsAtom);

  useEffect(() => {
    setPost(post);

    setContent(JSON.parse(post.content));
  }, [post, setContent, setPost]);

  return null;
}
