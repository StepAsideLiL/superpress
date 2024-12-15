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
      <div
        className={cn(
          "mx-auto w-fit cursor-pointer border hover:border hover:border-muted",
          selectedElementId === element.id
            ? "border-muted"
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
          onChange={(e) => setElement({ ...element, content: e.target.value })}
        />
      </div>
    );
  }

  if (listTags.includes(element.type)) {
    return (
      <div
        className={cn(
          "mx-auto w-auto cursor-pointer border py-1 hover:border hover:border-muted",
          selectedElementId === element.id
            ? "border-muted"
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
        className={cn(
          "z-50 w-fit cursor-pointer border hover:border hover:border-muted",
          selectedElementId === element.id
            ? "border-muted"
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
