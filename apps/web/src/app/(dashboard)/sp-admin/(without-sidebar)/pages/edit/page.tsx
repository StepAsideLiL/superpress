export default function Page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return <div>Edit Page {searchParams.page}</div>;
}
