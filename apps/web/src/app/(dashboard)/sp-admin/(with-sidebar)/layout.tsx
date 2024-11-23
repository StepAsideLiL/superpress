import DashboardSidebar from "@/components/sp-ui/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Provider as JotaiProvider } from "jotai";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full px-8 py-6">{children}</main>
      </SidebarProvider>
    </JotaiProvider>
  );
}
