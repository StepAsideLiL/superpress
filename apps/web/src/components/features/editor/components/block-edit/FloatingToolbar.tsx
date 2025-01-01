import { useFloating } from "@floating-ui/react";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import editorStore, { listTags, textTags } from "../../libs/store";
import icon from "@/lib/icons";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function FloatingToolbar() {
  const elementRef = useRef<HTMLElement | null>(null);
  const { refs, floatingStyles, update } = useFloating({
    placement: "top-start",
  });
  const [element] = useAtom(editorStore.selectElementAtom);
  const [, deleteElementById] = useAtom(editorStore.deleteElementByIdAtom);

  useEffect(() => {
    if (element) {
      elementRef.current = document.getElementById(element.id) || null;
      refs.setReference(elementRef.current);
      update();
    } else {
      refs.setReference(null);
    }
  }, [element, refs, update]);

  if (!element) return null;

  return (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className="w-96 border border-primary bg-background px-2"
    >
      <div className="flex items-center justify-between">
        {textTags.includes(element.type) && !Array.isArray(element.content) && (
          <icon.Text className="size-5" />
        )}
        {element.type === "button" && <icon.Button className="size-5" />}
        {listTags.includes(element.type) && <icon.List className="size-5" />}
        {element.type === "li" && !Array.isArray(element.content) && (
          <icon.Logs className="size-5" />
        )}

        <Separator orientation="vertical" className="h-11" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <icon.EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => deleteElementById(element.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
