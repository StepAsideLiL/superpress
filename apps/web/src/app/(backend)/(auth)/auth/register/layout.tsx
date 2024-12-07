import fetch from "@/lib/fetchers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdminExist = await fetch.check.checkSiteAdmin();

  if (isAdminExist) {
    redirect("/");
  }

  return <>{children}</>;
}
