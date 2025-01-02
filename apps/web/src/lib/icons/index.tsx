import * as lucideIcon from "lucide-react";
import * as radixIcon from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const icon = {
  BookOpen: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.BookOpen size={size} className={cn(className)} />,
  BracesIcon: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.BracesIcon size={size} className={cn(className)} />,
  Button: ({ size = 20, className }: { size?: number; className?: string }) => (
    <radixIcon.ButtonIcon
      className={cn(className)}
      height={size}
      width={size}
    />
  ),
  ChevronsUpDown: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.ChevronsUpDown size={size} className={cn(className)} />,
  Compass: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.Compass size={size} className={cn(className)} />,
  Component: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.Component size={size} className={cn(className)} />,
  Container: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => (
    <radixIcon.ContainerIcon
      className={cn(className)}
      height={size}
      width={size}
    />
  ),
  EllipsisVertical: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => (
    <lucideIcon.EllipsisVerticalIcon size={size} className={cn(className)} />
  ),
  EyeClosed: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.EyeClosed size={size} className={cn(className)} />,
  EyeOpen: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.Eye size={size} className={cn(className)} />,
  Heading: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => (
    <radixIcon.HeadingIcon
      className={cn(className)}
      height={size}
      width={size}
    />
  ),
  Home: ({ size = 20, className }: { size?: number; className?: string }) => (
    <lucideIcon.Home size={size} className={cn(className)} />
  ),
  Leaf: ({ size = 20, className }: { size?: number; className?: string }) => (
    <lucideIcon.Leaf size={size} className={cn(className)} />
  ),
  List: ({ size = 20, className }: { size?: number; className?: string }) => (
    <radixIcon.ListBulletIcon
      className={cn(className)}
      height={size}
      width={size}
    />
  ),
  LogOut: ({ size = 20, className }: { size?: number; className?: string }) => (
    <lucideIcon.LogOut size={size} className={cn(className)} />
  ),
  Logs: ({ size = 20, className }: { size?: number; className?: string }) => (
    <lucideIcon.LogsIcon size={size} className={cn(className)} />
  ),
  Moon: ({ size = 20, className }: { size?: number; className?: string }) => (
    <radixIcon.MoonIcon className={cn(className)} height={size} width={size} />
  ),
  Plus: ({ size = 20, className }: { size?: number; className?: string }) => (
    <lucideIcon.Plus size={size} className={cn(className)} />
  ),
  Search: ({ size = 20, className }: { size?: number; className?: string }) => (
    <radixIcon.MagnifyingGlassIcon
      className={cn(className)}
      height={size}
      width={size}
    />
  ),
  Setting: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => (
    <radixIcon.GearIcon className={cn(className)} height={size} width={size} />
  ),
  SidebarLeft: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.PanelLeft size={size} className={cn(className)} />,
  SidebarRight: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.PanelRight size={size} className={cn(className)} />,
  StickyNote: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.StickyNote size={size} className={cn(className)} />,
  Sun: ({ size = 20, className }: { size?: number; className?: string }) => (
    <radixIcon.SunIcon className={cn(className)} height={size} width={size} />
  ),
  Terminal: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.Terminal size={size} className={cn(className)} />,
  Text: ({ size = 20, className }: { size?: number; className?: string }) => (
    <radixIcon.TextIcon className={cn(className)} height={size} width={size} />
  ),
  User: ({ size = 20, className }: { size?: number; className?: string }) => (
    <lucideIcon.User size={size} className={cn(className)} />
  ),
  UserRound: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.UserRound size={size} className={cn(className)} />,
  Users: ({ size = 20, className }: { size?: number; className?: string }) => (
    <lucideIcon.Users size={size} className={cn(className)} />
  ),
  X: ({ size = 20, className }: { size?: number; className?: string }) => (
    <lucideIcon.X size={size} className={cn(className)} />
  ),
};

export default icon;
