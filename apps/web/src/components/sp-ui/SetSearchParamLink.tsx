"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SetSearchParamLink({
  param,
  value,
  className,
  children,
}: {
  param: string;
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleClick() {
    const params = new URLSearchParams(searchParams.toString());

    params.set(param, value);
    router.push(pathname + "?" + params.toString());
  }

  return (
    <Button
      variant={"link"}
      className={cn("p-0 text-sm", className)}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
