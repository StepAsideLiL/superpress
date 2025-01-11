import { EditorElementType } from "../../libs/types";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [, setElement] = useAtom(editorStore.selectElementAtom);
  const [editorState, setEditorState] = useAtom(editorStore.editorStateAtom);
  const [, insertElementAfterSelectedElement] = useAtom(
    editorStore.insertElementAtom
  );

  useEffect(() => {
    if (ref.current && element.id === editorState.selectedElementId) {
      ref.current.contentEditable = "true";
      ref.current.focus();
    }
  }, [editorState.selectedElementId, element.id]);

  function handleClick(event: React.MouseEvent) {
    event.stopPropagation();
    // setSelectedElementId(element.id);
    setEditorState({
      ...editorState,
      selectedElementId: element.id,
      selectedElementContent: element.content,
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

    setEditorState({
      ...editorState,
      selectedText: selectedText,
      cursorPosition: { start: startOffset, end: endOffset },
    });
  };

  return (
    <div
      ref={ref}
      id={element.id}
      className={cn(
        "mx-auto h-auto min-h-4 cursor-pointer border focus-within:outline-none hover:border hover:border-muted",
        editorState.selectedElementId === element.id
          ? "border-blue-500 focus-within:cursor-auto hover:border-blue-500"
          : "border-background",
        element.className
      )}
      style={element.style?.base}
      onMouseUp={getCursorInfo}
      onClick={(event: React.MouseEvent) => handleClick(event)}
      onBlur={(e) => {
        if (e.target.innerHTML === "<br>") {
          setElement({ ...element, content: "" });
        } else {
          setElement({ ...element, content: e.currentTarget.innerHTML });
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

          insertElementAfterSelectedElement(
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

          setEditorState({
            ...editorState,
            selectedElementId: newElementid,
            selectedElementContent: "",
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
