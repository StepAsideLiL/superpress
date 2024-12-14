"use client";

import { useAtom } from "jotai";
import {
  EditorElement,
  textTags,
  selectedElementIdForEditingAtom,
  selectElementAtom,
} from "../libs/store";
import { cn } from "@/lib/utils";

export default function EditableElement({
  element,
  children,
}: {
  element: EditorElement;
  children: React.ReactNode;
}) {
  const [, setSelectedElementId] = useAtom(selectedElementIdForEditingAtom);
  const [, setElement] = useAtom(selectElementAtom);

  if (textTags.includes(element.type) && !Array.isArray(element.content)) {
    return (
      <div
        className="mx-auto w-fit"
        onClick={() => setSelectedElementId(element.id)}
      >
        <input
          className={cn(
            "bg-background focus-within:outline-none",
            element.className
          )}
          style={element.style}
          value={element.content}
          onChange={(e) => setElement({ ...element, content: e.target.value })}
        />
      </div>
    );
  }

  return (
    <div
      className="mx-auto w-fit"
      onClick={() => setSelectedElementId(element.id)}
    >
      {children}
    </div>
  );
}
