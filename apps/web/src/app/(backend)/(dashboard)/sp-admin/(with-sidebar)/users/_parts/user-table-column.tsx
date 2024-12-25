import { Checkbox } from "@/components/ui/checkbox";
import { UserDataTableRowType } from "@/lib/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Separator } from "@/components/ui/separator";
import ButtonLink from "@/components/sp-ui/ButtonLink";
import { DeleteButton, SendPasswordButton } from "./action-btns";
import { useAtom } from "jotai";
import store from "@/lib/store";

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
      return <TableActionsBtns row={row} />;
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

function TableActionsBtns({ row }: { row: Row<UserDataTableRowType> }) {
  const [userId] = useAtom(store.userId);

  return (
    <div className="space-y-2">
      <h1 className="font-semibold">{row.getValue("username")}</h1>
      <section className="action-btns flex h-3 items-center gap-2 text-xs">
        <ButtonLink href={`/sp-admin/edit-profile?id=${row.original.id}`}>
          Edit
        </ButtonLink>

        {userId === row.original.id || (
          <>
            <Separator orientation="vertical" className="bg-muted-foreground" />
            <DeleteButton user={row.original} />
          </>
        )}

        <Separator orientation="vertical" className="bg-muted-foreground" />
        <ButtonLink href={`/author/${row.original.username}`}>View</ButtonLink>

        {userId === row.original.id || (
          <>
            <Separator orientation="vertical" className="bg-muted-foreground" />
            <SendPasswordButton />
          </>
        )}
      </section>
    </div>
  );
}
