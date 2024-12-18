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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [, deleteElementById] = useAtom(deleteElementByIdAtom);
  const [, insertElement] = useAtom(insertElementAfterSelectedElementByIdAtom);

  if (textTags.includes(element.type) && !Array.isArray(element.content)) {
    return (
      <Popover open={selectedElementId === element.id}>
        <PopoverTrigger asChild>
          <div
            contentEditable={element.id === selectedElementId}
            suppressContentEditableWarning
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
        </PopoverTrigger>

        <PopoverContent
          align="start"
          side="top"
          className="flex h-11 items-center justify-between px-2 py-1"
        >
          <icon.Text className="size-5" />

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
        </PopoverContent>
      </Popover>
    );
  }

  if (listTags.includes(element.type)) {
    return (
      <Popover open={selectedElementId === element.id}>
        <PopoverTrigger asChild>
          <div
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
        </PopoverTrigger>

        <PopoverContent
          align="start"
          side="top"
          className="flex h-11 items-center justify-between px-2 py-1"
        >
          <icon.List className="size-5" />

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
        </PopoverContent>
      </Popover>
    );
  }

  if (element.type === "li" && !Array.isArray(element.content)) {
    return (
      <Popover open={selectedElementId === element.id}>
        <PopoverTrigger asChild>
          <li
            contentEditable={element.id === selectedElementId}
            suppressContentEditableWarning
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
        </PopoverTrigger>

        <PopoverContent
          align="start"
          side="top"
          className="flex h-11 items-center justify-between px-2 py-1"
        >
          <icon.Logs className="size-5" />

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
        </PopoverContent>
      </Popover>
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
