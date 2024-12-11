import { PostForEditType } from "@/lib/types";
import { atom } from "jotai";

export type ElementType =
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "div"
  | "span"
  | "button"
  | "li";

export type EditorElement = {
  id: string;
  type: ElementType;
  content: string | EditorElement[];
  style?: React.CSSProperties;
  className?: string;
};

export const htmlJson: EditorElement[] = [
  {
    id: "1",
    type: "div",
    className: "container mx-auto",
    content: [
      {
        id: "2",
        type: "h1",
        className: "text-2xl",
        style: { color: "red" },
        content: "Hello, world!",
      },
      {
        id: "3",
        type: "p",
        className: "paragraph",
        style: { fontSize: "18px" },
        content: "This is a nested paragraph.",
      },
      {
        id: "4",
        type: "div",
        className: "nested-container",
        content: [
          {
            id: "5",
            type: "h2",
            style: { fontWeight: "bold" },
            content: "Nested Heading",
          },
        ],
      },
    ],
  },
];

export const postAtom = atom<PostForEditType>();

export const openComponentSidebarAtom = atom<boolean>(false);
export const openSettingsSidebarAtom = atom<boolean>(true);

export const toggleComponentSidebarAtom = atom(null, (get, set) => {
  set(openComponentSidebarAtom, !get(openComponentSidebarAtom));
});
export const toggleSettingsSidebarAtom = atom(null, (get, set) => {
  set(openSettingsSidebarAtom, !get(openSettingsSidebarAtom));
});

export const editorElementsAtom = atom<EditorElement[]>([]);
export const addEditorElementAtom = atom(
  null,
  (get, set, newEditorElement: EditorElement) => {
    set(editorElementsAtom, [...get(editorElementsAtom), newEditorElement]);
  }
);

export const selectedElementIdForEditingAtom = atom<string | null>(null);
export const selectElementAtom = atom(
  (get) => {
    const data = get(editorElementsAtom);
    const selectedId = get(selectedElementIdForEditingAtom);

    if (!selectedId) return null;

    const findElement = (elements: EditorElement[]): EditorElement | null => {
      for (const element of elements) {
        if (element.id === selectedId) return element;
        if (Array.isArray(element.content)) {
          const childElement = findElement(element.content as EditorElement[]);
          if (childElement) return childElement;
        }
      }
      return null;
    };

    return findElement(data);
  },
  (get, set, id: string) => {
    set(selectedElementIdForEditingAtom, id);
  }
);
