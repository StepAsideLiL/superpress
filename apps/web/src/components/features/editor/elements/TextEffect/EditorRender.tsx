import { createElement } from "react";
import { EditorElementType } from "../../libs/types";

export default function EditorRender({
  children,
  element,
}: {
  children: React.ReactNode;
  element: EditorElementType;
}) {
  return createElement(
    element.type,
    {
      style: element.style?.base,
      contentEditable: "inherit",
      suppressContentEditableWarning: "true",
      key: element.id,
    },
    children
  );
}
