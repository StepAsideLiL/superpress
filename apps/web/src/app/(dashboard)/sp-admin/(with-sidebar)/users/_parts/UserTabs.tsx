import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function UserTabs() {
  return (
    <div className="flex h-4 items-center gap-2">
      <Button variant={"link"} className={cn("p-0 text-sm font-semibold")}>
        All (2)
      </Button>

      <Separator orientation="vertical" className="bg-muted-foreground" />

      <Button variant={"link"} className={cn("p-0 text-sm")}>
        Admin (2)
      </Button>

      <Separator orientation="vertical" className="bg-muted-foreground" />

      <Button variant={"link"} className={cn("p-0 text-sm")}>
        Editor (2)
      </Button>

      <Separator orientation="vertical" className="bg-muted-foreground" />

      <Button variant={"link"} className={cn("p-0 text-sm")}>
        Author (2)
      </Button>

      <Separator orientation="vertical" className="bg-muted-foreground" />

      <Button variant={"link"} className={cn("p-0 text-sm")}>
        Subscriber (2)
      </Button>
    </div>
  );
}
