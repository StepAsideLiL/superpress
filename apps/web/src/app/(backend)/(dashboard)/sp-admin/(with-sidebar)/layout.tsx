import DashboardProvider from "@/components/providers/DashboardProvider";
import DashboardSidebar from "@/components/sp-ui/DashboardSidebar";
import auth from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await auth.getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <DashboardProvider userId={currentUser.id}>
      <DashboardSidebar />
      <main className="w-full px-8 py-6">{children}</main>
    </DashboardProvider>
  );
}
