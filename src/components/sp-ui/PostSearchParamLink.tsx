"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { quickEditRowId } from "@/store/post-table";
import { useSetAtom } from "jotai";

export default function PostSearchParamLink({
  param,
  value,
  allTab = false,
  reset = false,
  className,
  children,
}: {
  param?: string;
  value?: string;
  allTab?: boolean;
  reset?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQuickEditRowId = useSetAtom(quickEditRowId);

  function handleClick() {
    const params = new URLSearchParams(searchParams.toString());

    if (allTab) {
      params.delete("post_status");
    }

    if (reset) {
      params.delete("post_status");
      params.delete("search");
      params.delete("author");
    }

    if (param && value && !allTab && !reset) {
      params.set(param, value);
    }
    router.push(pathname + "?" + params.toString());
    setQuickEditRowId("");
  }

  return (
    <Button
      variant={"link"}
      className={cn("p-0 text-xs", className)}
      onClick={() => handleClick()}
    >
      {children}
    </Button>
  );
}
