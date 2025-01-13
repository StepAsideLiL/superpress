import { useFloating } from "@floating-ui/react";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import editorStore from "../../libs/store";
import icon from "@/lib/icons";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { elementConfigsByTag } from "../../elements";

export default function FloatingToolbar() {
  const elementRef = useRef<HTMLElement | null>(null);
  const { refs, floatingStyles, update } = useFloating({
    placement: "top-start",
  });
  const [seletedElement] = useAtom(editorStore.selectElementAtom);
  const [, deleteElementById] = useAtom(editorStore.deleteElementByIdAtom);

  useEffect(() => {
    if (seletedElement) {
      elementRef.current = document.getElementById(seletedElement.id) || null;
      refs.setReference(elementRef.current);
      update();
    } else {
      refs.setReference(null);
    }
  }, [refs, seletedElement, update]);

  if (!seletedElement) return null;

  const elementConfig = elementConfigsByTag[seletedElement.type];

  if (!elementConfig.toolbar) return null;

  const Toolbar = elementConfig.toolbar;

  return (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className="w-96 border border-primary bg-background px-2"
    >
      <div className="flex items-center justify-between">
        <elementConfig.icon />

        <Separator orientation="vertical" className="h-11 bg-primary" />

        <Toolbar element={seletedElement} elementConfig={elementConfig} />

        <Separator orientation="vertical" className="h-11 bg-primary" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <icon.EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => deleteElementById(seletedElement.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
