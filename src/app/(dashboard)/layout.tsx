import ProgressBar from "@/components/providers/ProgressBar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar>
        {children}
        <Toaster />
      </ProgressBar>
    </>
  );
}
