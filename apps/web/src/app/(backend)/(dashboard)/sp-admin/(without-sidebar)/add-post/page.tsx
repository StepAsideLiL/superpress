import Editor from "@/components/features/editor/Editor";
import { PostForEditType } from "@/lib/types";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ post_type: string }>;
}) {
  const postType = (await searchParams)?.post_type || "post";
  const post: PostForEditType = {
    id: "",
    title: "",
    content: "[]",
    postType: postType,
    slug: "",
    postStatus: "draft",
    created: new Date(),
  };

  return <Editor post={post} />;
}
