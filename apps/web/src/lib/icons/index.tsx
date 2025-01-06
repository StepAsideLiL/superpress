import * as lucideIcon from "lucide-react";
import * as radixIcon from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export type IconType = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => React.ReactElement;

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
  Heading1: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.Heading1 size={size} className={cn(className)} />,
  Heading2: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.Heading2 size={size} className={cn(className)} />,
  Heading3: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.Heading3 size={size} className={cn(className)} />,
  Heading4: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.Heading4 size={size} className={cn(className)} />,
  Heading5: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.Heading5 size={size} className={cn(className)} />,
  Heading6: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.Heading6 size={size} className={cn(className)} />,
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
  ListItem: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      className={cn(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 5.25C1.91421 5.25 2.25 4.91421 2.25 4.5C2.25 4.08579 1.91421 3.75 1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25ZM4 4.5C4 4.22386 4.22386 4 4.5 4H13.5C13.7761 4 14 4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H4.5ZM2.25 7.5C2.25 7.91421 1.91421 8.25 1.5 8.25C1.08579 8.25 0.75 7.91421 0.75 7.5C0.75 7.08579 1.08579 6.75 1.5 6.75C1.91421 6.75 2.25 7.08579 2.25 7.5ZM1.5 11.25C1.91421 11.25 2.25 10.9142 2.25 10.5C2.25 10.0858 1.91421 9.75 1.5 9.75C1.08579 9.75 0.75 10.0858 0.75 10.5C0.75 10.9142 1.08579 11.25 1.5 11.25Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  ListOrder: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => <lucideIcon.ListOrdered size={size} className={cn(className)} />,
  LogOut: ({ size = 20, className }: { size?: number; className?: string }) => (
    <lucideIcon.LogOut size={size} className={cn(className)} />
  ),
  Logs: ({ size = 20, className }: { size?: number; className?: string }) => (
    <lucideIcon.LogsIcon size={size} className={cn(className)} />
  ),
  Moon: ({ size = 20, className }: { size?: number; className?: string }) => (
    <radixIcon.MoonIcon className={cn(className)} height={size} width={size} />
  ),
  Paragraph: ({
    size = 20,
    className,
  }: {
    size?: number;
    className?: string;
  }) => (
    <radixIcon.PilcrowIcon
      className={cn(className)}
      height={size}
      width={size}
    />
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
