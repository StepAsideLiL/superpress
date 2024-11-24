import { Button } from "@/components/ui/button";
import PostTable from "./_parts/PostTable";
import { redirect } from "next/navigation";
import fetch from "@/lib/fetchers";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    post_type: string;
    post_status?: string;
    author?: string;
    search?: string;
  };
}) {
  if (!searchParams.post_type) {
    redirect("/sp-admin/posts?post_type=post");
  }

  const posts = await fetch.post.getPosts(
    searchParams.post_type,
    searchParams.post_status,
    searchParams.author,
    searchParams.search
  );
  const postCountByStatus = await fetch.post.getPostsCountByStatus(
    searchParams.post_type
  );

  if (
    !(searchParams.post_type === "page" || searchParams.post_type === "post")
  ) {
    return (
      <div>
        <h1 className="text-center">Invalid post type</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="flex items-center gap-2">
        <h1 className="text-2xl">
          {searchParams.post_type === "page" ? "Pages" : "Posts"}
        </h1>
        <Button variant={"outline"}>
          Add New {searchParams.post_type === "page" ? "Page" : "Post"}
        </Button>
      </section>

      <PostTable
        data={posts}
        postType={searchParams.post_type}
        postCountByStatus={postCountByStatus}
      />
    </div>
  );
}
