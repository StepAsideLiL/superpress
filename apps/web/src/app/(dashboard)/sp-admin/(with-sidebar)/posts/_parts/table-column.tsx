import { Checkbox } from "@/components/ui/checkbox";
import { PostType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  DeleteParmanentlyButton,
  MoveToTrashButton,
  QuickEditButton,
  RestoreButton,
} from "./action-btns";
import { Separator } from "@/components/ui/separator";
import ButtonLink from "@/components/sp-ui/ButtonLink";
import PostSearchParamLink from "@/components/sp-ui/PostSearchParamLink";
import * as df from "date-fns";

export const columns: ColumnDef<PostType>[] = [
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
                  post.postmeta ? post.postmeta[0].value : "draft"
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
