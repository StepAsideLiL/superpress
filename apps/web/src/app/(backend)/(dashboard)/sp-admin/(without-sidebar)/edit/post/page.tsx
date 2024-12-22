import Editor from "@/components/features/editor/Editor";
import fetch from "@/lib/fetchers";

export default async function Page(props: {
  searchParams: Promise<{ id: string }>;
}) {
  const searchParams = await props.searchParams;

  if (!searchParams.id || searchParams.id === "") {
    return (
      <main>
        <div className="p-10">
          <h1 className="text-center text-xl text-muted-foreground">
            Post not found.
          </h1>
        </div>
      </main>
    );
  }

  const post = await fetch.post.getPostsForEdit(searchParams.id);

  if (!post) {
    return (
      <main>
        <div className="p-10">
          <h1 className="text-center text-xl text-muted-foreground">
            Post not found.
          </h1>
        </div>
      </main>
    );
  }

  return (
    <>
      <Editor post={post} />
    </>
  );
}
