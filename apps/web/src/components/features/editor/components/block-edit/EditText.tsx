"use client";

import { useAtom } from "jotai";
import { EditorElement, selectElementAtom } from "../../libs/store";

export default function EditText({ element }: { element: EditorElement }) {
  // const [, setElement] = useAtom(selectElementAtom);

  return <div className="p-4">{element.type}</div>;
}
