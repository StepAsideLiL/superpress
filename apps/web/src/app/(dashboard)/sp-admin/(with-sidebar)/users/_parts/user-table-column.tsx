import { Checkbox } from "@/components/ui/checkbox";
import { UserDataTableRowType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Separator } from "@/components/ui/separator";
import ButtonLink from "@/components/sp-ui/ButtonLink";
import { DeleteButton, SendPasswordPasswordButton } from "./action-btns";

export const userTableColumns: ColumnDef<UserDataTableRowType>[] = [
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
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      return (
        <div className="space-y-2">
          <h1 className="font-semibold">{row.getValue("username")}</h1>
          <section className="action-btns flex h-3 items-center gap-2 text-xs">
            <ButtonLink href={`/sp-admin/edit-profile?id=${row.original.id}`}>
              Edit
            </ButtonLink>
            <Separator orientation="vertical" className="bg-muted-foreground" />
            <DeleteButton userId={row.original.id} />
            <Separator orientation="vertical" className="bg-muted-foreground" />
            <ButtonLink href={`/author/${row.original.username}`}>
              View
            </ButtonLink>
            <Separator orientation="vertical" className="bg-muted-foreground" />
            <SendPasswordPasswordButton />
          </section>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("role")}</div>;
    },
  },
];
