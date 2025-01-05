import { cn } from "@/lib/utils";
import { EditorElementType } from "../../libs/types";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import editorStore from "../../libs/store";
import { nanoid } from "../../libs/utils";

export default function EditorRender({
  children,
  element,
}: {
  children: React.ReactNode;
  element: EditorElementType;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const [selectedElementId, setSelectedElementId] = useAtom(
    editorStore.selectedElementIdForEditingAtom
  );
  const [, setElement] = useAtom(editorStore.selectElementAtom);
  const [, insertElement] = useAtom(
    editorStore.insertElementAfterSelectedElementByIdAtom
  );

  useEffect(() => {
    if (ref.current && element.id === selectedElementId) {
      ref.current.contentEditable = "true";
      ref.current.focus();
    }
  }, [element.id, selectedElementId]);

  return (
    <li
      ref={ref}
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
        if (ref.current) {
          ref.current.contentEditable = "true";
          ref.current.focus();
        }
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
          if (ref.current) {
            ref.current.contentEditable = "false";
          }
        }
      }}
    >
      {children}
    </li>
  );
}
