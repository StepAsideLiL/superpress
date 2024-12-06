import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { quickEditRowIdAtom } from "@/lib/store";
import { PostCountByStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PostTabs({
  postCountByStatus,
}: {
  postCountByStatus: PostCountByStatus;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const setQuickEditRowId = useSetAtom(quickEditRowIdAtom);

  function handleClick(
    tab: "all" | "published" | "pending" | "draft" | "trash"
  ) {
    if (tab === "all") {
      params.delete("post_status");
    }

    if (tab !== "all") {
      params.set("post_status", tab);
    }

    router.push(pathname + "?" + params.toString());
    setQuickEditRowId("");
  }

  return (
    <div className="flex h-4 items-center gap-2">
      <Button
        variant={"link"}
        className={cn(
          "p-0 text-sm",
          params.has("post_status") || "font-semibold"
        )}
        onClick={() => handleClick("all")}
      >
        All ({postCountByStatus.all})
      </Button>
      {postCountByStatus.published !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <Button
            variant={"link"}
            className={cn(
              "p-0 text-sm",
              params.get("post_status") === "published" && "font-semibold"
            )}
            onClick={() => handleClick("published")}
          >
            Published ({postCountByStatus.published})
          </Button>
        </>
      )}
      {postCountByStatus.pending !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <Button
            variant={"link"}
            className={cn(
              "p-0 text-sm",
              params.get("post_status") === "pending" && "font-semibold"
            )}
            onClick={() => handleClick("pending")}
          >
            Pending ({postCountByStatus.pending})
          </Button>
        </>
      )}
      {postCountByStatus.draft !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <Button
            variant={"link"}
            className={cn(
              "p-0 text-sm",
              params.get("post_status") === "draft" && "font-semibold"
            )}
            onClick={() => handleClick("draft")}
          >
            Draft ({postCountByStatus.draft})
          </Button>
        </>
      )}
      {postCountByStatus.trash !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <Button
            variant={"link"}
            className={cn(
              "p-0 text-sm",
              params.get("post_status") === "trash" && "font-semibold"
            )}
            onClick={() => handleClick("trash")}
          >
            Trash ({postCountByStatus.trash})
          </Button>
        </>
      )}
    </div>
  );
}
