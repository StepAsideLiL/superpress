"use client";

import "./style.css";
import InsertComponentBtn from "./components/InsertComponentBtn";
import { renderHtmlForEditor } from "./libs/render";
import { editorElementsAtom } from "./libs/store";
import { useAtom } from "jotai";

export default function EditorBody() {
  const [content] = useAtom(editorElementsAtom);

  return (
    <section className="flex-1 overflow-auto">
      <div className="p-4">{renderHtmlForEditor(content)}</div>
      <div className="container mx-auto flex max-w-3xl items-center justify-center">
        <InsertComponentBtn />
      </div>
    </section>
  );
}
