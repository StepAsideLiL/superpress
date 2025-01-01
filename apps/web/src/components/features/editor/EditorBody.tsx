"use client";

import "./style.css";
import InsertComponentBtn from "./components/InsertComponentBtn";
import editorStore, { listTags, textTags } from "./libs/store";
import { useAtom } from "jotai";
import { EditorElement } from "./libs/types";
import TextElement from "./components/render/TextElement";
import ListElement from "./components/render/ListElement";
import ListItemElement from "./components/render/ListItemElement";
import { createElement } from "react";
import FloatingToolbar from "./components/block-edit/FloatingToolbar";
import ButtonElement from "./components/render/ButtonElement";

export default function EditorBody() {
  const [content] = useAtom(editorStore.editorElementsAtom);
  const [, setElementID] = useAtom(editorStore.selectedElementIdForEditingAtom);

  return (
    <section
      className="h-full flex-1 overflow-auto"
      onClick={() => setElementID("1")}
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
        if (textTags.includes(element.type)) {
          return <TextElement key={element.id} element={element} />;
        }

        if (element.type === "button") {
          return <ButtonElement key={element.id} element={element} />;
        }

        if (listTags.includes(element.type) && Array.isArray(element.content)) {
          return (
            <ListElement key={element.id} element={element}>
              {createElement(
                element.type,
                {
                  style: element.style,
                  className: element.className,
                },
                <RenderElements key={element.id} elements={element.content} />
              )}
            </ListElement>
          );
        }

        if (element.type === "li") {
          return <ListItemElement key={element.id} element={element} />;
        }

        if (!Array.isArray(element.content)) {
          return <div key={element.id}>{element.content}</div>;
        }

        return <RenderElements key={element.id} elements={element.content} />;
      })}
    </>
  );
}
