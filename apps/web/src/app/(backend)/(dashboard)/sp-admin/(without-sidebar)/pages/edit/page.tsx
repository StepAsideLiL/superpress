export default async function Page(
  props: {
    searchParams: Promise<{ page: string }>;
  }
) {
  const searchParams = await props.searchParams;
  return <div>Edit Page {searchParams.page}</div>;
}
