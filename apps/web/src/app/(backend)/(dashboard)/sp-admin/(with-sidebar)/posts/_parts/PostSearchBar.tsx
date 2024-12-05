import { Input } from "@/components/ui/input";
import { PostType } from "@/lib/types";
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function PostSearchBar({
  table,
  postType,
}: {
  table: Table<PostType>;
  postType: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createSearchQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Input
      placeholder={`Search for ${postType}s by title`}
      value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
      onChange={(event) => {
        table.getColumn("title")?.setFilterValue(event.target.value);
        router.push(
          pathname + "?" + createSearchQueryString("search", event.target.value)
        );
      }}
      className="max-w-sm"
    />
  );
}
