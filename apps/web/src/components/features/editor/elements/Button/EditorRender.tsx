import { EditorElement } from "../../libs/types";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import editorStore from "../../libs/store";
import { useAtom } from "jotai";

export default function EditorRender({
  children,
  element,
}: {
  children: React.ReactNode;
  element: EditorElement;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [, setSelectedElementId] = useAtom(
    editorStore.selectedElementIdForEditingAtom
  );
  const [, setElement] = useAtom(editorStore.selectElementAtom);

  return (
    <div
      ref={ref}
      id={element.id}
      className={cn(
        "inline-block hover:cursor-pointer focus-visible:cursor-auto focus-visible:outline-none",
        element.className
      )}
      style={element.style}
      onClick={(event) => {
        event.stopPropagation();
        setSelectedElementId(element.id);
        if (ref.current) {
          ref.current.contentEditable = "true";
          ref.current.focus();
        }
      }}
      onBlur={(event) => {
        setElement({ ...element, content: event.currentTarget.innerHTML });
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
        }
      }}
    >
      {children}
    </div>
  );
}
