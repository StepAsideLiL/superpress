import { Input } from "@/components/ui/input";

export default function UserSearchBar() {
  return (
    <Input
      placeholder={`Search for user by username`}
      // value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
      // onChange={(event) => {
      //   table.getColumn("title")?.setFilterValue(event.target.value);
      //   router.push(
      //     pathname + "?" + createSearchQueryString("search", event.target.value)
      //   );
      // }}
      className="max-w-sm"
    />
  );
}
