import Editor from "@/components/features/editor/Editor";

export default function Page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  return (
    <>
      <Editor postId={searchParams.id} />
    </>
  );
}
