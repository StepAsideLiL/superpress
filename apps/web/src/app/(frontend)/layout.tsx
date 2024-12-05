import fetch from "@/lib/fetchers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminExist = await fetch.check.checkSiteAdmin();

  if (!adminExist) {
    redirect("/auth/register");
  }

  return <>{children}</>;
}
