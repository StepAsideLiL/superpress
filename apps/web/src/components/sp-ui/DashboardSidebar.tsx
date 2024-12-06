import { BookOpen, Home, StickyNote, Terminal, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import ToggleSidebarMenuButton from "@/components/sp-ui/ToggleSidebarMenuButton";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/sp-admin",
    icon: Home,
  },
  {
    title: "Pages",
    url: "/sp-admin/posts?post_type=page",
    icon: BookOpen,
  },
  {
    title: "Posts",
    url: "/sp-admin/posts?post_type=post",
    icon: StickyNote,
  },
  {
    title: "Users",
    url: "/sp-admin/users",
    icon: Users,
  },
  {
    title: "Dev",
    url: "/sp-admin/dev",
    icon: Terminal,
  },
];

export default function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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

        <SidebarGroup>
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
