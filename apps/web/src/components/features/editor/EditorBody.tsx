"use client";

import "./style.css";
import InsertComponentBtn from "./components/InsertComponentBtn";
import { renderHtmlForEditor } from "./libs/render";
import editorStore from "./libs/store";
import { useAtom } from "jotai";
import { FloatingTopbar } from "./components/EditableElement";

export default function EditorBody() {
  const [content] = useAtom(editorStore.editorElementsAtom);
  const [, setElementID] = useAtom(editorStore.selectedElementIdForEditingAtom);

  return (
    <section
      className="h-full flex-1 overflow-auto"
      onClick={() => setElementID("1")}
    >
      <div className="p-4">{renderHtmlForEditor(content)}</div>
      <FloatingTopbar />
      <div className="flex max-w-3xl items-center justify-center">
        <InsertComponentBtn />
      </div>
    </section>
  );
}
