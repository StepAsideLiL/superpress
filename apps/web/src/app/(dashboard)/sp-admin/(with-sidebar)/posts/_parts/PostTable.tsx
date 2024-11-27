"use client";

import "./styles.css";
import * as React from "react";
// import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
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
import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSetAtom, useAtomValue } from "jotai";
import QuickEditForm from "./QuickEditForm";
import { useSearchParams } from "next/navigation";
import { PostCountByStatus, PostType } from "@/lib/types";
import BulkEditForm from "./BulkEditForm";
import { columns } from "./table-column";
import PostTabs from "./PostTabs";
import PostSearchBar from "./PostSearchBar";
import BulkAction from "./BulkAction";
import { isBulkEditTableRowOpenAtom, quickEditRowIdAtom } from "@/lib/store";
import TrashBulkAction from "./TrashBulkAction";

export default function PostTable({
  data,
  postType,
  postCountByStatus,
}: {
  data: PostType[];
  postType: string;
  postCountByStatus: PostCountByStatus;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: columns,
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
        pageSize: 20,
      },
    },
  });

  const quickEditRowId = useAtomValue(quickEditRowIdAtom);
  const setQuickEditRowId = useSetAtom(quickEditRowIdAtom);
  const isBulkEditTableRowOpen = useAtomValue(isBulkEditTableRowOpenAtom);
  const setIsBulkEditTableRowOpen = useSetAtom(isBulkEditTableRowOpenAtom);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const selectedRows = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original.id);

  return (
    <div className="w-full space-y-6">
      <section className="flex w-full items-center justify-between">
        <PostTabs postCountByStatus={postCountByStatus} />

        <PostSearchBar table={table} postType={postType} />
      </section>

      <div className="space-y-2">
        <div className="flex justify-between">
          {data.length !== 0 && (
            <div className="flex items-center gap-5">
              {params.get("post_status") !== "trash" ? (
                <BulkAction table={table} setRowSelection={setRowSelection} />
              ) : (
                <TrashBulkAction
                  table={table}
                  setRowSelection={setRowSelection}
                />
              )}
            </div>
          )}
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
              {isBulkEditTableRowOpen && (
                <TableRow className="hover:bg-background">
                  <TableCell colSpan={100} className="p-4">
                    <div className="h-96 space-y-2">
                      <h1 className="text-xl font-semibold text-foreground/80">
                        Quick Edit
                      </h1>

                      <div className="flex w-full">
                        <div className="w-3/4">
                          <BulkEditForm
                            setIsBulkEditTableRowOpen={
                              setIsBulkEditTableRowOpen
                            }
                            setRowSelection={setRowSelection}
                            selectedPostIds={selectedRows}
                            setQuickEditRowId={setQuickEditRowId}
                          />
                        </div>

                        <div className="h-80 w-1/4 border border-muted p-1">
                          <ul className="list-inside list-disc space-y-2">
                            {table.getSelectedRowModel().flatRows.map((row) => {
                              return (
                                <li key={row.original.id}>
                                  {row.original.title}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  if (row.id === quickEditRowId) {
                    return (
                      <TableRow key={row.id} className="hover:bg-background">
                        <TableCell colSpan={100} className="p-4">
                          <div className="space-y-2">
                            <h1 className="text-xl font-semibold text-foreground/80">
                              Quick Edit
                            </h1>

                            <QuickEditForm
                              pageData={row.original}
                              setQuickEditRowId={setQuickEditRowId}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }

                  return (
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
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
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
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
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
      </div>
    </div>
  );
}
