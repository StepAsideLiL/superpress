"use client";

import "./style.css";
import InsertComponentBtn from "./components/InsertComponentBtn";
import editorStore from "./libs/store";
import { useAtom } from "jotai";
import { EditorElement } from "./libs/types";
import { createElement } from "react";
import FloatingToolbar from "./components/editor-ui/FloatingToolbar";
import { elementsByTag } from "./elements";

export default function EditorBody() {
  const [content] = useAtom(editorStore.editorElementsAtom);
  const [, setElementID] = useAtom(editorStore.selectedElementIdForEditingAtom);

  return (
    <section
      className="h-full flex-1 overflow-auto"
      onClick={() => setElementID(null)}
    >
      <div className="p-4">
        <RenderElements elements={content} />
      </div>
      <FloatingToolbar />
      <div className="flex max-w-3xl items-center justify-center">
        <InsertComponentBtn />
      </div>
    </section>
  );
}

function RenderElements({ elements }: { elements: EditorElement[] }) {
  return (
    <>
      {elements.map((element) => {
        const Render = elementsByTag[element.type].renderInEditor;

        if (Array.isArray(element.content)) {
          return (
            <Render key={element.id} element={element}>
              {createElement(
                element.type,
                {
                  style: element.style,
                  className: element.className,
                },
                <RenderElements key={element.id} elements={element.content} />
              )}
            </Render>
          );
        }

        return (
          <Render key={element.id} element={element}>
            {element.content}
          </Render>
        );
      })}
    </>
  );
}
