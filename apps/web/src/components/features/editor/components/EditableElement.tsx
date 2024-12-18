"use client";

import { useAtom } from "jotai";
import {
  EditorElement,
  textTags,
  selectedElementIdForEditingAtom,
  selectElementAtom,
  listTags,
  deleteElementByIdAtom,
  insertElementAfterSelectedElementByIdAtom,
} from "../libs/store";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import icon from "@/lib/icons";
import { nanoid } from "../libs/utils";
import { useFloating } from "@floating-ui/react";
import { useEffect, useRef } from "react";

export default function EditableElement({
  element,
  children,
}: {
  element: EditorElement;
  children: React.ReactNode;
}) {
  const [selectedElementId, setSelectedElementId] = useAtom(
    selectedElementIdForEditingAtom
  );
  const [, setElement] = useAtom(selectElementAtom);
  const [, insertElement] = useAtom(insertElementAfterSelectedElementByIdAtom);

  if (textTags.includes(element.type) && !Array.isArray(element.content)) {
    return (
      <div
        contentEditable={element.id === selectedElementId}
        suppressContentEditableWarning
        id={element.id}
        className={cn(
          "mx-auto cursor-pointer border focus-within:outline-none hover:border hover:border-muted",
          selectedElementId === element.id
            ? "border-blue-500 focus-within:cursor-auto hover:border-blue-500"
            : "border-background",
          element.className
        )}
        style={element.style}
        onClick={() => setSelectedElementId(element.id)}
        onBlur={(e) => {
          setElement({ ...element, content: e.currentTarget.innerHTML });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            const newElementid = nanoid();

            insertElement(element.id, {
              id: newElementid,
              type: "p",
              content: "paragraph",
              className: "text-subtitle",
              style: {
                width: "768px",
                marginLeft: "auto",
                marginRight: "auto",
              },
            });

            setSelectedElementId(newElementid);
          }
        }}
      >
        {element.content}
      </div>
    );
  }

  if (listTags.includes(element.type)) {
    return (
      <div
        id={element.id}
        className={cn(
          "mx-auto w-auto cursor-pointer border py-1 hover:border hover:border-muted",
          selectedElementId === element.id
            ? "border-blue-500 hover:border-blue-500"
            : "border-background"
        )}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElementId(element.id);
        }}
      >
        {children}
      </div>
    );
  }

  if (element.type === "li" && !Array.isArray(element.content)) {
    return (
      <li
        contentEditable={element.id === selectedElementId}
        suppressContentEditableWarning
        id={element.id}
        className={cn(
          "cursor-pointer border focus-within:outline-none hover:border hover:border-muted",
          selectedElementId === element.id
            ? "border-blue-500 focus-within:cursor-auto hover:border-blue-500"
            : "border-background",
          element.className
        )}
        style={element.style}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElementId(element.id);
        }}
        onBlur={(e) => {
          setElement({ ...element, content: e.currentTarget.innerHTML });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            const newElementid = nanoid();

            insertElement(element.id, {
              id: newElementid,
              type: "li",
              content: "",
            });

            setSelectedElementId(newElementid);
          }
        }}
      >
        {element.content}
      </li>
    );
  }

  // return (
  //   <div
  //     className="mx-auto w-fit"
  //     onClick={() => setSelectedElementId(element.id)}
  //   >
  //     {children}
  //   </div>
  // );
}

export function FloatingTopbar() {
  const elementRef = useRef<HTMLElement | null>(null);
  const { refs, floatingStyles, update } = useFloating({
    placement: "top-start",
  });
  const [element] = useAtom(selectElementAtom);
  const [, deleteElementById] = useAtom(deleteElementByIdAtom);

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
