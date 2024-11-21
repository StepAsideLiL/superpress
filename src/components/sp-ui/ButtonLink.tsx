import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ButtonLink({
  className = "",
  href = "",
  disabled = false,
  children,
  onClick,
}: {
  className?: string;
  href?: string;
  disabled?: boolean;
  children: string;
  onClick?: () => void;
}) {
  if (!href) {
    return (
      <Button
        variant={"link"}
        disabled={disabled}
        className={cn("p-0 text-xs", className)}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      variant={"link"}
      disabled={disabled}
      className={cn("p-0 text-xs", className)}
      onClick={onClick}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
