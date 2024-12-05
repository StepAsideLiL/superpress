"use client";

import { Input } from "@/components/ui/input";
import { UserDataTableRowType } from "@/lib/types";
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function UserSearchBar({
  table,
}: {
  table: Table<UserDataTableRowType>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createSearchQueryString = useCallback(
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
      placeholder={`Search for user by username`}
      value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
      onChange={(event) => {
        table.getColumn("username")?.setFilterValue(event.target.value);
        router.push(
          pathname + "?" + createSearchQueryString("search", event.target.value)
        );
      }}
      className="max-w-sm"
    />
  );
}
