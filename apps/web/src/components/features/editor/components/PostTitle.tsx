"use client";

import { useAtom } from "jotai";
import { postAtom } from "../libs/store";

export default function PostTitle() {
  const [post] = useAtom(postAtom);

  if (!post) return null;

  if (post.title === "") {
    return (
      <h2 className="text-center text-muted-foreground">
        No Title &bull; <span className="capitalize">{post.postType}</span>
      </h2>
    );
  }

  return (
    <h2 className="text-center">
      {post.title.length < 30 ? post.title : `${post.title.slice(0, 30)}...`}{" "}
      &bull; <span className="capitalize">{post.postType}</span>
    </h2>
  );
}
