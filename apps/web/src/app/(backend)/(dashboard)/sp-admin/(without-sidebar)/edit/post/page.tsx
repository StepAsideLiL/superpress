import Editor from "@/components/features/editor/Editor";

export default async function Page(
  props: {
    searchParams: Promise<{ id: string }>;
  }
) {
  const searchParams = await props.searchParams;
  return (
    <>
      <Editor postId={searchParams.id} />
    </>
  );
}
