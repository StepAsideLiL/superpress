"use client";

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
import { UserDataTableRowType } from "@/lib/types";
import BulkAction from "./BulkAction";
import ScreenOptions from "./ScreenOptions";
import UserSearchBar from "./UserSearchBar";
import UserTabs from "./UserTabs";
import { useState } from "react";
import { userTableColumns } from "./user-table-column";
import { Button } from "@/components/ui/button";

export default function UserTableSection({
  data,
}: {
  data: UserDataTableRowType[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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
        pageSize: 20,
      },
    },
  });

  return (
    <section className="w-full space-y-6">
      <section className="flex w-full items-center justify-between">
        <UserTabs />

        <UserSearchBar />
      </section>

      <section className="space-y-2">
        <div className="flex justify-between">
          {data.length !== 0 && <BulkAction />}

          <ScreenOptions />
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
              {/* {isBulkEditTableRowOpen && (
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
              )} */}

              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  // if (row.id === quickEditRowId) {
                  //   return (
                  //     <TableRow key={row.id} className="hover:bg-background">
                  //       <TableCell colSpan={100} className="p-4">
                  //         <div className="space-y-2">
                  //           <h1 className="text-xl font-semibold text-foreground/80">
                  //             Quick Edit
                  //           </h1>

                  //           <QuickEditForm
                  //             pageData={row.original}
                  //             setQuickEditRowId={setQuickEditRowId}
                  //           />
                  //         </div>
                  //       </TableCell>
                  //     </TableRow>
                  //   );
                  // }

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
