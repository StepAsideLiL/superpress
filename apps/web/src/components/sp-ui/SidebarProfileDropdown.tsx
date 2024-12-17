"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import LogoutDropdownMenuItem from "./LogoutDropdownMenuItem";
import { ModeToggleDropdownMenuItem } from "./ModeToggleDropdownMenuItem";
import icon from "@/lib/icons";

export default function SidebarProfileDropdown({
  username,
}: {
  username: string;
}) {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <icon.UserRound className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{username}</span>
            {/* <span className="truncate text-xs">{activeTeam.plan}</span> */}
          </div>
          <icon.ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side={isMobile ? "bottom" : "right"}
        sideOffset={4}
      >
        <ModeToggleDropdownMenuItem />
        <LogoutDropdownMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
