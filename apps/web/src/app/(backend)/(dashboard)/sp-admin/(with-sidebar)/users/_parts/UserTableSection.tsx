"use client";

import "./styles.css";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnViewType,
  CurrentUserType,
  UserDataTableRowType,
  UserSettingKVType,
  UserTableTabCountByRoleType,
} from "@/lib/types";
import UserBulkAction from "./UserBulkAction";
import UserSearchBar from "./UserSearchBar";
import UserTabs from "./UserTabs";
import { useState } from "react";
import { userTableColumns } from "./user-table-column";
import { Button } from "@/components/ui/button";
import ScreenOptions from "./ScreenOptions";
import UserRoleBulkAction from "./UserRoleBulkAction";

export default function UserTableSection({
  user,
  data,
  countUserByRole,
  itemPerPageKV,
  columnViewKV,
}: {
  user: CurrentUserType;
  data: UserDataTableRowType[];
  countUserByRole: UserTableTabCountByRoleType;
  itemPerPageKV: UserSettingKVType;
  columnViewKV: UserSettingKVType;
}) {
  const colViewJson = JSON.parse(columnViewKV.value) as ColumnViewType;

  const colView = colViewJson.reduce(
    (acc, curr) => {
      acc[curr.colId] = curr.show;
      return acc;
    },
    {} as { [key: string]: boolean }
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(colView);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: userTableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: Number(itemPerPageKV.value),
      },
    },
  });

  return (
    <section className="w-full space-y-6">
      <section className="flex w-full items-center justify-between">
        <UserTabs countUserByRole={countUserByRole} />

        <UserSearchBar table={table} />
      </section>

      <section className="space-y-2">
        <div className="flex justify-between">
          {data.length !== 0 && (
            <div className="flex items-center gap-4">
              <UserBulkAction
                user={user}
                table={table}
                setRowSelection={setRowSelection}
              />

              <UserRoleBulkAction user={user} table={table} />
            </div>
          )}

          <ScreenOptions
            table={table}
            itemPerPageKV={itemPerPageKV}
            columnViewKV={columnViewKV}
          />
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table className="overflow-hidden">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="table-row"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="align-top">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={userTableColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getSelectedRowModel().rows.length} of {data.length} row(s)
            selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
