import * as lucideIcon from "lucide-react";
import * as radixIcon from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { cn } from "@/lib/utils";

const icon = {
  BookOpen: (props: lucideIcon.LucideProps) => (
    <lucideIcon.BookOpen {...props} />
  ),
  BracesIcon: (props: lucideIcon.LucideProps) => (
    <lucideIcon.BracesIcon {...props} />
  ),
  Button: (props: IconProps) => (
    <radixIcon.ButtonIcon
      className={cn("size-5", props.className)}
      {...props}
    />
  ),
  ChevronsUpDown: (props: lucideIcon.LucideProps) => (
    <lucideIcon.ChevronsUpDown {...props} />
  ),
  Container: (props: IconProps) => (
    <radixIcon.ContainerIcon
      className={cn("size-5", props.className)}
      {...props}
    />
  ),
  EllipsisVertical: (props: lucideIcon.LucideProps) => (
    <lucideIcon.EllipsisVerticalIcon {...props} />
  ),
  Home: (props: lucideIcon.LucideProps) => <lucideIcon.Home {...props} />,
  Leaf: (props: lucideIcon.LucideProps) => <lucideIcon.Leaf {...props} />,
  List: (props: IconProps) => (
    <radixIcon.ListBulletIcon
      className={cn("size-5", props.className)}
      {...props}
    />
  ),
  LogOut: (props: lucideIcon.LucideProps) => <lucideIcon.LogOut {...props} />,
  Logs: (props: lucideIcon.LucideProps) => <lucideIcon.LogsIcon {...props} />,
  Moon: (props: IconProps) => (
    <radixIcon.MoonIcon className={cn("size-5", props.className)} {...props} />
  ),
  Plus: (props: lucideIcon.LucideProps) => <lucideIcon.Plus {...props} />,
  Search: (props: IconProps) => (
    <radixIcon.MagnifyingGlassIcon
      className={cn("size-5", props.className)}
      {...props}
    />
  ),
  Setting: (props: IconProps) => (
    <radixIcon.GearIcon className={cn("size-5", props.className)} {...props} />
  ),
  SidebarLeft: (props: lucideIcon.LucideProps) => (
    <lucideIcon.PanelLeft {...props} />
  ),
  SidebarRight: (props: lucideIcon.LucideProps) => (
    <lucideIcon.PanelRight {...props} />
  ),
  StickyNote: (props: lucideIcon.LucideProps) => (
    <lucideIcon.StickyNote {...props} />
  ),
  Sun: (props: IconProps) => (
    <radixIcon.SunIcon className={cn("size-5", props.className)} {...props} />
  ),
  Terminal: (props: lucideIcon.LucideProps) => (
    <lucideIcon.Terminal {...props} />
  ),
  Text: (props: IconProps) => (
    <radixIcon.TextIcon className={cn("size-5", props.className)} {...props} />
  ),
  User: (props: lucideIcon.LucideProps) => <lucideIcon.User {...props} />,
  UserRound: (props: lucideIcon.LucideProps) => (
    <lucideIcon.UserRound {...props} />
  ),
  Users: (props: lucideIcon.LucideProps) => <lucideIcon.Users {...props} />,
  X: (props: lucideIcon.LucideProps) => <lucideIcon.X {...props} />,
};

export default icon;
