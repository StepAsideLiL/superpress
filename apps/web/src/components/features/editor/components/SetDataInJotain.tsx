"use client";

import { PostForEditType } from "@/lib/types";
import { useEffect } from "react";
import { postAtom } from "../libs/store";
import { useAtom } from "jotai";

export default function SetDataInJotain({ post }: { post: PostForEditType }) {
  const [, setPost] = useAtom(postAtom);

  useEffect(() => {
    setPost(post);
  }, [post, setPost]);

  return null;
}
