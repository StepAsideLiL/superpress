import { Button } from "@/components/ui/button";
import React from "react";
import UserTableSection from "./_parts/UserTableSection";
import fetch from "@/lib/fetchers";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    role?: string;
  };
}) {
  if (searchParams.role === "") {
    redirect("/sp-admin/users");
  }

  const userTableData = await fetch.user.getUserDataTableByRole(
    searchParams.role
  );

  return (
    <div className="space-y-6">
      <section className="flex items-center gap-2">
        <h1 className="text-2xl">Users</h1>
        <Button variant={"outline"}>Add New User</Button>
      </section>

      <UserTableSection data={userTableData} />
    </div>
  );
}
