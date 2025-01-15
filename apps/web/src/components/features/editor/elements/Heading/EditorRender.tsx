import { EditorElementType } from "../../libs/types";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { nanoid } from "../../libs/utils";
import { editorStore } from "../../libs/store";

export default function EditorRender({
  children,
  element,
}: {
  children: React.ReactNode;
  element: EditorElementType;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const selectState = editorStore.selected.useSelected();

  useEffect(() => {
    if (ref.current && element.id === selectState.elementId) {
      ref.current.contentEditable = "true";
      ref.current.focus();
    }
  }, [element.id, selectState.elementId]);

  function handleClick(event: React.MouseEvent) {
    event.stopPropagation();

    editorStore.settingSidebar.setIsOpen(true);
    editorStore.selected.setSelected({
      ...selectState,
      elementId: element.id,
      elementContent: element.content,
    });

    if (ref.current) {
      ref.current.contentEditable = "true";
      ref.current.focus();
    }
  }

  const getCursorInfo = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0); // The current selection range
    const startOffset = range.startOffset; // Caret start position
    const endOffset = range.endOffset; // Caret end position
    const selectedText = selection.toString(); // Selected text (if any)

    editorStore.selected.setSelected({
      ...selectState,
      cursorSelectedText: selectedText,
      cursorPosition: { start: startOffset, end: endOffset },
    });
  };

  return (
    <div
      ref={ref}
      id={element.id}
      className={cn(
        "mx-auto h-auto min-h-4 cursor-pointer border focus-within:outline-none hover:border hover:border-muted",
        selectState.elementId === element.id
          ? "border-blue-500 focus-within:cursor-auto hover:border-blue-500"
          : "border-background",
        element.className
      )}
      style={element.style?.base}
      onMouseUp={getCursorInfo}
      onClick={(event: React.MouseEvent) => handleClick(event)}
      onBlur={(e) => {
        if (e.target.innerHTML === "<br>") {
          editorStore.elementActions.updateSelectedElement({
            ...element,
            content: "",
          });
        } else {
          editorStore.elementActions.updateSelectedElement({
            ...element,
            content: e.currentTarget.innerHTML,
          });
        }
      }}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
          event.preventDefault();
        }
      }}
      onKeyUp={(event: React.KeyboardEvent) => {
        getCursorInfo();

        if (event.key === "Enter") {
          const newElementid = nanoid();

          editorStore.elementActions.insertElementAfter(
            {
              id: newElementid,
              type: "h1",
              content: "",
              className: "",
              style: {
                base: {},
              },
            },
            element.id
          );

          editorStore.selected.setSelected({
            ...selectState,
            elementId: newElementid,
            elementContent: "",
          });
          if (ref.current) {
            ref.current.contentEditable = "false";
          }
        }
      }}
    >
      {children}
    </div>
  );
}
