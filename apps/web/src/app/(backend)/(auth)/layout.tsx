import ProgressBar from "@/components/providers/ProgressBar";
import { Toaster } from "@/components/ui/sonner";
import auth from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isUserLoggedIn = await auth.isUserLoggedIn();

  if (isUserLoggedIn) {
    redirect("/sp-admin");
  }

  return (
    <>
      <ProgressBar>
        {children}
        <Toaster />
      </ProgressBar>
    </>
  );
}
