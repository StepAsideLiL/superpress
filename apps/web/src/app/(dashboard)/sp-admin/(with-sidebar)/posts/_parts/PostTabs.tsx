import PostSearchParamLink from "@/components/sp-ui/PostSearchParamLink";
import { Separator } from "@/components/ui/separator";
import { PostCountByStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function PostTabs({
  postCountByStatus,
}: {
  postCountByStatus: PostCountByStatus;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  return (
    <div className="flex h-4 items-center gap-2">
      <PostSearchParamLink
        reset={true}
        className={cn("text-sm", params.has("post_status") || "font-semibold")}
      >
        All ({postCountByStatus.all})
      </PostSearchParamLink>
      {postCountByStatus.published !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <PostSearchParamLink
            param="post_status"
            value="published"
            className={cn(
              "text-sm",
              params.get("post_status") === "published" && "font-semibold"
            )}
          >
            Published ({postCountByStatus.published})
          </PostSearchParamLink>
        </>
      )}
      {postCountByStatus.pending !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <PostSearchParamLink
            param="post_status"
            value="pending"
            className={cn(
              "text-sm",
              params.get("post_status") === "pending" && "font-semibold"
            )}
          >
            Pending ({postCountByStatus.pending})
          </PostSearchParamLink>
        </>
      )}
      {postCountByStatus.draft !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <PostSearchParamLink
            param="post_status"
            value="draft"
            className={cn(
              "text-sm",
              params.get("post_status") === "draft" && "font-semibold"
            )}
          >
            Draft ({postCountByStatus.draft})
          </PostSearchParamLink>
        </>
      )}
      {postCountByStatus.trash !== 0 && (
        <>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <PostSearchParamLink
            param="post_status"
            value="trash"
            className={cn(
              "text-sm",
              params.get("post_status") === "trash" && "font-semibold"
            )}
          >
            Trash ({postCountByStatus.trash})
          </PostSearchParamLink>
        </>
      )}
    </div>
  );
}
