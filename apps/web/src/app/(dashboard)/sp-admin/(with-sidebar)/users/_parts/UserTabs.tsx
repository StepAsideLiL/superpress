"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserDataTableRowType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function UserTabs({ data }: { data: UserDataTableRowType[] }) {
  const adminCount = data.filter((user) => user.role === "admin").length;
  const editorCount = data.filter((user) => user.role === "editor").length;
  const authorCount = data.filter((user) => user.role === "author").length;
  const subscriberCount = data.filter(
    (user) => user.role === "subscriber"
  ).length;
  const userCount = data.filter((user) => user.role === "user").length;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleTabClick(
    tab: "all" | "admin" | "editor" | "author" | "subscriber" | "user"
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (tab === "all") {
      params.delete("role");
    }

    if (tab !== "all") {
      params.set("role", tab);
    }
    router.push(pathname + "?" + params.toString());
  }

  return (
    <div className="flex h-4 items-center gap-2">
      <Button
        variant={"link"}
        className={cn(
          "p-0 text-sm",
          searchParams.has("role") || "font-semibold"
        )}
        onClick={() => handleTabClick("all")}
      >
        All ({data.length})
      </Button>

      {adminCount !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <Button
            variant={"link"}
            className={cn(
              "p-0 text-sm",
              searchParams.get("role") === "admin" && "font-semibold"
            )}
            onClick={() => handleTabClick("admin")}
          >
            Admin ({adminCount})
          </Button>
        </>
      )}

      {editorCount !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <Button
            variant={"link"}
            className={cn(
              "p-0 text-sm",
              searchParams.get("role") === "editor" && "font-semibold"
            )}
            onClick={() => handleTabClick("editor")}
          >
            Editor ({editorCount})
          </Button>
        </>
      )}

      {authorCount !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <Button
            variant={"link"}
            className={cn(
              "p-0 text-sm",
              searchParams.get("role") === "author" && "font-semibold"
            )}
            onClick={() => handleTabClick("author")}
          >
            Author ({authorCount})
          </Button>
        </>
      )}

      {subscriberCount !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <Button
            variant={"link"}
            className={cn(
              "p-0 text-sm",
              searchParams.get("role") === "subscriber" && "font-semibold"
            )}
            onClick={() => handleTabClick("subscriber")}
          >
            Subscriber ({subscriberCount})
          </Button>
        </>
      )}

      {userCount !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <Button
            variant={"link"}
            className={cn(
              "p-0 text-sm",
              searchParams.get("role") === "user" && "font-semibold"
            )}
            onClick={() => handleTabClick("user")}
          >
            userCount ({userCount})
          </Button>
        </>
      )}
    </div>
  );
}
