"use client";

import "./styles.css";
import * as React from "react";
// import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
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
import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import ButtonLink from "@/components/sp-ui/ButtonLink";
import { useSetAtom, useAtomValue } from "jotai";
import { deletePosts, movePostToTrash, restorePosts } from "./actions";
import QuickEditForm from "./QuickEditForm";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as df from "date-fns";
import { PostCountByStatus, PostType } from "@/lib/types";
import PostSearchParamLink from "@/components/sp-ui/PostSearchParamLink";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { quickEditRowId } from "@/store/post-table";
import BulkEditForm from "./BulkEditForm";

const columns: ColumnDef<PostType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const post = row.original;

      return (
        <div className="space-y-2">
          <h1 className="font-semibold">{row.getValue("title")}</h1>
          {post.post_status === "trash" ? (
            <section className="action-btns flex h-3 items-center gap-2 text-xs">
              <RestoreButton
                postId={post.id}
                statusBeforeTrashing={
                  post.usermeta ? post.usermeta[0].value : "draft"
                }
              />
              <Separator
                orientation="vertical"
                className="bg-muted-foreground"
              />
              <DeleteParmanentlyButton postId={post.id} />
            </section>
          ) : (
            <section className="action-btns flex h-3 items-center gap-2 text-xs">
              <ButtonLink href={`/sp-admin/pages/edit?page=${post.id}`}>
                Edit
              </ButtonLink>
              <Separator
                orientation="vertical"
                className="bg-muted-foreground"
              />
              <QuickEditButton rowId={row.id} />
              <Separator
                orientation="vertical"
                className="bg-muted-foreground"
              />
              <MoveToTrashButton
                postId={post.id}
                postStatus={post.post_status}
              />
              <Separator
                orientation="vertical"
                className="bg-muted-foreground"
              />
              <ButtonLink href={`/data/${post.slug}`}>View</ButtonLink>
            </section>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "author.username",
    header: "Author",
    cell: ({ row }) => {
      return (
        <div>
          <PostSearchParamLink
            param="author"
            value={row.original.author.username}
            className="h-auto text-base"
          >
            {row.original.author.username}
          </PostSearchParamLink>
        </div>
      );
    },
  },
  {
    accessorKey: "created",
    header: "Date",
    cell: ({ row }) => {
      return (
        <>
          {df.format(new Date(row.getValue("created")), "d MMM, yyyy")} at{" "}
          {df.format(new Date(row.getValue("created")), "h:mm a")}
        </>
      );
    },
  },
];

function QuickEditButton({ rowId }: { rowId: string }) {
  const setQuickEditRowId = useSetAtom(quickEditRowId);

  return (
    <Button
      variant={"link"}
      className="p-0 text-xs"
      onClick={() => setQuickEditRowId(rowId)}
    >
      Quick Edit
    </Button>
  );
}

function MoveToTrashButton({
  postId,
  postStatus,
}: {
  postId: bigint;
  postStatus: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <ButtonLink
      className="text-red-600"
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await movePostToTrash([{ id: postId, status: postStatus }]).then(
          (res) => {
            if (res.success) {
              router.refresh();
              setIsLoading(false);
            } else {
              setIsLoading(false);
              toast.error(res.message);
            }
          }
        );
      }}
    >
      Trash
    </ButtonLink>
  );
}

function RestoreButton({
  postId,
  statusBeforeTrashing,
}: {
  postId: bigint;
  statusBeforeTrashing: string;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  return (
    <ButtonLink
      disabled={isLoading}
      onClick={async () => {
        await restorePosts([
          { id: postId, statusBeforeTrashing: statusBeforeTrashing },
        ])
          .then(async () => {
            toast.success("Restored successfully.");
            router.refresh();
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      }}
    >
      Restore
    </ButtonLink>
  );
}

function DeleteParmanentlyButton({ postId }: { postId: bigint }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  return (
    <ButtonLink
      disabled={isLoading}
      className="text-red-600"
      onClick={() => {
        deletePosts([postId])
          .then(async () => {
            toast.success("Deleted permanently.");
            router.refresh();
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      }}
    >
      Delete Permanently
    </ButtonLink>
  );
}

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
  const [bulkAction, setBulkAction] = React.useState("no-action");
  const [bulkActionOnTrashTab, setBulkActionOnTrashTab] =
    React.useState("no-action");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBulkEditTableRowOpen, setIsBulkEditTableRowOpen] =
    React.useState(false);

  const table = useReactTable({
    data,
    columns,
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

  const quickEditRowIdValue = useAtomValue(quickEditRowId);
  const setQuickEditRowId = useSetAtom(quickEditRowId);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

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

  const selectedRows = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original.id);

  async function applyBulkAction() {
    if (bulkAction === "no-action") {
      return;
    }

    setIsLoading(true);

    if (bulkAction === "move-to-trash") {
      const selectedRows = table.getSelectedRowModel().flatRows.map((row) => {
        return {
          id: row.original.id,
          status: row.original.post_status,
        };
      });

      await movePostToTrash(selectedRows)
        .then((res) => {
          if (res.success) {
            toast.success(res.message);
            setIsLoading(false);
            setRowSelection({});
            router.refresh();
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    }

    if (bulkAction === "edit") {
      setIsBulkEditTableRowOpen(true);
    }
  }

  const somethinkElse = table.getSelectedRowModel().flatRows.map((row) => {
    return {
      id: row.original.id,
      statusBeforeTrash: row.original.usermeta
        ? row.original.usermeta[0].value
        : "draft",
    };
  });
  console.log(somethinkElse);

  async function applyBulkActionOnTrashTab() {
    if (bulkActionOnTrashTab === "no-action") {
      return;
    }

    setIsLoading(true);

    if (bulkActionOnTrashTab === "restore") {
      const selectedRows = table.getSelectedRowModel().flatRows.map((row) => {
        return {
          id: row.original.id,
          statusBeforeTrashing: row.original.usermeta
            ? row.original.usermeta[0].value
            : "draft",
        };
      });

      await restorePosts(selectedRows)
        .then((res) => {
          toast.success(res.message);
          setIsLoading(false);
          setRowSelection({});
          router.refresh();
        })
        .catch(() => {
          setIsLoading(false);
        });
    }

    if (bulkActionOnTrashTab === "delete-parmanently") {
      await deletePosts(selectedRows)
        .then((res) => {
          if (res.success) {
            setRowSelection({});
            router.refresh();
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }

  return (
    <div className="w-full space-y-6">
      <section className="flex w-full items-center justify-between">
        <div className="flex h-4 items-center gap-2">
          <PostSearchParamLink
            reset={true}
            className={cn(
              "text-sm",
              params.has("post_status") || "font-semibold"
            )}
          >
            All ({postCountByStatus.all})
          </PostSearchParamLink>
          {postCountByStatus.published !== 0 && (
            <>
              <Separator
                orientation="vertical"
                className="bg-muted-foreground"
              />
              <PostSearchParamLink
                param="post_status"
                value="published"
                className={cn(
                  "text-sm",
                  params.get("post_status") === "published" && "font-semibold"
                )}
              >
                Published ({postCountByStatus.published})
              </PostSearchParamLink>
            </>
          )}
          {postCountByStatus.pending !== 0 && (
            <>
              <Separator
                orientation="vertical"
                className="bg-muted-foreground"
              />
              <PostSearchParamLink
                param="post_status"
                value="pending"
                className={cn(
                  "text-sm",
                  params.get("post_status") === "pending" && "font-semibold"
                )}
              >
                Pending ({postCountByStatus.pending})
              </PostSearchParamLink>
            </>
          )}
          {postCountByStatus.draft !== 0 && (
            <>
              <Separator
                orientation="vertical"
                className="bg-muted-foreground"
              />
              <PostSearchParamLink
                param="post_status"
                value="draft"
                className={cn(
                  "text-sm",
                  params.get("post_status") === "draft" && "font-semibold"
                )}
              >
                Draft ({postCountByStatus.draft})
              </PostSearchParamLink>
            </>
          )}
          {postCountByStatus.trash !== 0 && (
            <>
              <Separator
                orientation="vertical"
                className="bg-muted-foreground"
              />
              <PostSearchParamLink
                param="post_status"
                value="trash"
                className={cn(
                  "text-sm",
                  params.get("post_status") === "trash" && "font-semibold"
                )}
              >
                Trash ({postCountByStatus.trash})
              </PostSearchParamLink>
            </>
          )}
        </div>

        <Input
          placeholder={`Search for ${postType}s by title`}
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("title")?.setFilterValue(event.target.value);
            router.push(
              pathname +
                "?" +
                createSearchQueryString("search", event.target.value)
            );
          }}
          className="max-w-sm"
        />
      </section>

      <div className="space-y-2">
        {data.length !== 0 && (
          <div className="flex items-center gap-5">
            {params.get("post_status") !== "trash" ? (
              <div className="flex items-center gap-2">
                <Select
                  defaultValue={bulkAction}
                  onValueChange={(value) => setBulkAction(value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-action">Bulk Actions</SelectItem>
                    <SelectItem value="edit">Edit</SelectItem>
                    <SelectItem value="move-to-trash">Move to Trash</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={"outline"}
                  disabled={isLoading}
                  onClick={() => applyBulkAction()}
                >
                  Apply
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Select
                  defaultValue={bulkActionOnTrashTab}
                  onValueChange={(value) => setBulkActionOnTrashTab(value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-action">Bulk Actions</SelectItem>
                    <SelectItem value="restore">Restore</SelectItem>
                    <SelectItem value="delete-parmanently">
                      Delete Permanently
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={"outline"}
                  disabled={isLoading}
                  onClick={() => applyBulkActionOnTrashTab()}
                >
                  Apply
                </Button>
              </div>
            )}
          </div>
        )}

        {/* <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}

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
                  if (row.id === quickEditRowIdValue) {
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
