import ProgressBar from "@/components/providers/ProgressBar";
import { Toaster } from "@/components/ui/sonner";
import auth from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentUser = auth.getCurrentUser();

  if (!currentUser) {
    redirect("/");
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
