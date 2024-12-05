"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserTableTabCountByRoleType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function UserTabs({
  countUserByRole,
}: {
  countUserByRole: UserTableTabCountByRoleType;
}) {
  // const adminCount = data.filter((user) => user.role === "admin").length;
  // const editorCount = data.filter((user) => user.role === "editor").length;
  // const authorCount = data.filter((user) => user.role === "author").length;
  // const subscriberCount = data.filter(
  //   (user) => user.role === "subscriber"
  // ).length;
  // const userCount = data.filter((user) => user.role === "user").length;

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
        All ({countUserByRole.all})
      </Button>

      {countUserByRole.admin !== 0 && (
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
            Admin ({countUserByRole.admin})
          </Button>
        </>
      )}

      {countUserByRole.editor !== 0 && (
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
            Editor ({countUserByRole.editor})
          </Button>
        </>
      )}

      {countUserByRole.author !== 0 && (
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
            Author ({countUserByRole.author})
          </Button>
        </>
      )}

      {countUserByRole.subscribe !== 0 && (
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
            Subscriber ({countUserByRole.subscribe})
          </Button>
        </>
      )}

      {countUserByRole.user !== 0 && (
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
            User ({countUserByRole.user})
          </Button>
        </>
      )}
    </div>
  );
}
