"use client";

import {
  BookOpen,
  Home,
  PanelLeft,
  StickyNote,
  Terminal,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";

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
  const { toggleSidebar } = useSidebar();

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
                <SidebarMenuButton onClick={toggleSidebar}>
                  <PanelLeft />
                  <span>Collapse</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
