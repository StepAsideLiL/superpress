import { Button } from "@/components/ui/button";
import React from "react";
import UserTableSection from "./_parts/UserTableSection";
import fetch from "@/lib/fetchers";
import { redirect } from "next/navigation";
import { getSettingByName } from "@/lib/utils";
import auth from "@/lib/auth";

export default async function Page(
  props: {
    searchParams: Promise<{
      role?: string;
      search?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const user = await auth.getCurrentUser();

  if (!user) {
    redirect("/");
  }

  if (searchParams.role === "") {
    redirect("/sp-admin/users");
  }

  const userTableData = await fetch.user.getUserDataTable(
    searchParams.role,
    searchParams.search
  );
  const countUserByRole = await fetch.user.getUserCountByRole();
  const userscreenSettings = await fetch.user.getUserSettingsKVType("user");

  const itemPerPageKV = getSettingByName(
    userscreenSettings,
    "item_limit_per_page"
  ) || {
    id: "setting.user.item_limit_per_page",
    key: `setting.user.item_limit_per_page`,
    value: "20",
  };
  const columnViewKV = getSettingByName(userscreenSettings, "column_view") || {
    id: "setting.user.column_view",
    key: `setting.user.column_view`,
    value: JSON.stringify([
      {
        colId: "username",
        title: "Username",
        show: true,
      },
      {
        colId: "email",
        title: "Email",
        show: true,
      },
      {
        colId: "role",
        title: "Role",
        show: true,
      },
    ]),
  };

  return (
    <div className="space-y-6">
      <section className="flex items-center gap-2">
        <h1 className="text-2xl">Users</h1>
        <Button variant={"outline"}>Add New User</Button>
      </section>

      <UserTableSection
        user={user}
        data={userTableData}
        countUserByRole={countUserByRole}
        itemPerPageKV={itemPerPageKV}
        columnViewKV={columnViewKV}
      />
    </div>
  );
}
