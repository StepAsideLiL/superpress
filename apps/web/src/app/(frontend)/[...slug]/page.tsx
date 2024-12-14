import "../../../components/features/editor/style.css";
import { renderHtml } from "@/components/features/editor/libs/render";
import fetch from "@/lib/fetchers";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const post = await fetch.post.getPostForRender((await params).slug[0]);

  if (!post) {
    return (
      <main className="container mx-auto py-10">
        <h1 className="text-center text-xl text-muted-foreground">
          Post not found
        </h1>
      </main>
    );
  }

  return <main>{renderHtml(JSON.parse(post.content))}</main>;
}
