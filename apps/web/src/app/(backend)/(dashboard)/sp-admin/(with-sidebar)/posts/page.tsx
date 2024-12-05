import { Button } from "@/components/ui/button";
import PostTable from "./_parts/PostTable";
import { redirect } from "next/navigation";
import fetch from "@/lib/fetchers";
import { getSettingByName } from "@/lib/utils";

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
  const userPostSettings = await fetch.user.getUserSettingsKVType(
    searchParams.post_type
  );

  const itemPerPageKV =
    getSettingByName(userPostSettings, "item_limit_per_page") ||
    (searchParams.post_type === "post"
      ? {
          id: "setting.post.item_limit_per_page",
          key: `setting.post.item_limit_per_page`,
          value: "20",
        }
      : {
          id: "setting.page.item_limit_per_page",
          key: `setting.page.item_limit_per_page`,
          value: "20",
        });

  const columnViewKV =
    getSettingByName(userPostSettings, "column_view") ||
    (searchParams.post_type === "post"
      ? {
          id: "setting.post.column_view",
          key: `setting.post.column_view`,
          value: JSON.stringify([
            {
              colId: "title",
              title: "Title",
              show: true,
            },
            {
              colId: "author_username",
              title: "Author",
              show: true,
            },
            {
              colId: "created",
              title: "Date",
              show: true,
            },
          ]),
        }
      : {
          id: "setting.page.column_view",
          key: `setting.page.column_view`,
          value: JSON.stringify([
            {
              colId: "title",
              title: "Title",
              show: true,
            },
            {
              colId: "author_username",
              title: "Author",
              show: true,
            },
            {
              colId: "created",
              title: "Date",
              show: true,
            },
          ]),
        });

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
        itemPerPageKV={itemPerPageKV}
        columnViewKV={columnViewKV}
      />
    </div>
  );
}
