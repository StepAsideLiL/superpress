import { EditorElementType, ElementConfigType } from "../../libs/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import editorStore from "../../libs/store";

export default function TagLevel({
  element,
  elementConfig,
}: {
  element: EditorElementType;
  elementConfig: ElementConfigType;
}) {
  const [, setElement] = useAtom(editorStore.selectElementAtom);
  const tagConfig =
    elementConfig.tags.find((tag) => tag.type === element.type) ||
    elementConfig.tags[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="[&_svg]:size-5">
          <tagConfig.icon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {elementConfig.tags.map((tag) => (
          <DropdownMenuItem
            key={tag.type}
            className="cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              setElement({
                ...element,
                type: tag.type,
              });
            }}
          >
            <span
              className={cn(
                "rounded-sm p-1",
                tag.type === element.type
                  ? "bg-primary text-background"
                  : "text-primary"
              )}
            >
              <tag.icon />
            </span>
            <span>{tag.title}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
