"use client";

import { useAtom } from "jotai";
import {
  EditorElement,
  textTags,
  selectedElementIdForEditingAtom,
  selectElementAtom,
  listTags,
} from "../libs/store";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ListBulletIcon, TextIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon, LogsIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

  if (textTags.includes(element.type) && !Array.isArray(element.content)) {
    return (
      <Popover open={selectedElementId === element.id}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "mx-auto w-fit cursor-pointer border hover:border hover:border-muted",
              selectedElementId === element.id
                ? "border-blue-500 hover:border-blue-500"
                : "border-background"
            )}
            onClick={() => setSelectedElementId(element.id)}
          >
            <input
              className={cn(
                "cursor-pointer bg-background focus-within:cursor-auto focus-within:outline-none",
                element.className
              )}
              style={element.style}
              value={element.content}
              onChange={(e) =>
                setElement({ ...element, content: e.target.value })
              }
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          side="top"
          className="flex h-11 items-center justify-between px-2 py-1"
        >
          <TextIcon className="size-5" />

          <Separator orientation="vertical" className="h-11" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <EllipsisVerticalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuItem className="hover:cursor-pointer">
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
          <ListBulletIcon className="size-5" />

          <Separator orientation="vertical" className="h-11" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <EllipsisVerticalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuItem className="hover:cursor-pointer">
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
            className={cn(
              "z-50 w-fit cursor-pointer border hover:border hover:border-muted",
              selectedElementId === element.id
                ? "border-blue-500 hover:border-blue-500"
                : "border-background"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedElementId(element.id);
            }}
          >
            <input
              className={cn(
                "cursor-pointer bg-background focus-within:cursor-auto focus-within:outline-none",
                element.className
              )}
              style={element.style}
              defaultValue={element.content}
            />
          </li>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          side="top"
          className="flex h-11 items-center justify-between px-2 py-1"
        >
          <LogsIcon className="size-5" />

          <Separator orientation="vertical" className="h-11" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <EllipsisVerticalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuItem className="hover:cursor-pointer">
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
