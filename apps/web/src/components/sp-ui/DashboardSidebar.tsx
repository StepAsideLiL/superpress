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
import icon from "@/lib/icons";

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
      icon: icon.StickyNote,
    });
  }

  if (role === "admin" || role === "editor") {
    contentMenu.push({
      title: "Pages",
      url: "/sp-admin/posts?post_type=page",
      icon: icon.BookOpen,
    });
  }

  if (role === "admin") {
    settingMenu.push({
      title: "Users",
      url: "/sp-admin/users",
      icon: icon.Users,
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
      icon: icon.User,
    });
  }

  if (role === "admin") {
    settingMenu.push({
      title: "Dev",
      url: "/sp-admin/dev",
      icon: icon.Terminal,
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
                    <icon.Home />
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
