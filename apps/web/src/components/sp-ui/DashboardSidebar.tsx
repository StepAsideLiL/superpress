import {
  BookOpen,
  Home,
  StickyNote,
  Terminal,
  User,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import ToggleSidebarMenuButton from "@/components/sp-ui/ToggleSidebarMenuButton";
import auth from "@/lib/auth";
import { SidebarMenuItemType } from "@/lib/types";
import SidebarProfileDropdown from "./SidebarProfileDropdown";

export default async function DashboardSidebar() {
  const user = await auth.getCurrentUser();

  if (!user || user.capability === "user") {
    return (
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup className="p-1">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <ToggleSidebarMenuButton />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  const role = user.capability;
  const contentMenu: SidebarMenuItemType[] = [];
  const settingMenu: SidebarMenuItemType[] = [];

  if (
    role === "admin" ||
    role === "editor" ||
    role === "author" ||
    role === "contributor"
  ) {
    contentMenu.push({
      title: "Posts",
      url: "/sp-admin/posts?post_type=post",
      icon: StickyNote,
    });
  }

  if (role === "admin" || role === "editor") {
    contentMenu.push({
      title: "Pages",
      url: "/sp-admin/posts?post_type=page",
      icon: BookOpen,
    });
  }

  if (role === "admin") {
    settingMenu.push({
      title: "Users",
      url: "/sp-admin/users",
      icon: Users,
    });
  }

  if (
    role === "admin" ||
    role === "editor" ||
    role === "author" ||
    role === "contributor" ||
    role === "subscriber"
  ) {
    settingMenu.push({
      title: "Profile",
      url: "/sp-admin/profile",
      icon: User,
    });
  }

  if (role === "admin") {
    settingMenu.push({
      title: "Dev",
      url: "/sp-admin/dev",
      icon: Terminal,
    });
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarProfileDropdown username={user.username} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-1">
        <SidebarGroup className="p-1">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/sp-admin"}>
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {contentMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {settingMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-1">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <ToggleSidebarMenuButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

{
  /* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <UserRound className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.username}
                    </span>
                    <span className="truncate text-xs">{activeTeam.plan}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Teams
                </DropdownMenuLabel>
                {teams.map((team, index) => (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => setActiveTeam(team)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <team.logo className="size-4 shrink-0" />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Add team
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */
}
