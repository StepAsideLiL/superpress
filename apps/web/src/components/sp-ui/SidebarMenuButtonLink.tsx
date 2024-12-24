"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function SidebarMenuButtonLink({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const realPath = `${pathname}${params.toString() === "" ? "" : "?" + params.toString()}`;

  return (
    <SidebarMenuButton
      isActive={pathname === url}
      asChild
      className={cn(realPath === url && "bg-sidebar-accent")}
    >
      {children}
    </SidebarMenuButton>
  );
}
