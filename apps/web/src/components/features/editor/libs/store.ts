import { PostForEditType } from "@/lib/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type ElementType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "button"
  | "ol"
  | "ul"
  | "li"
  | "div";

export type EditorElement = {
  id: string;
  type: ElementType;
  content: string | EditorElement[];
  style?: React.CSSProperties;
  className?: string;
};

export const textTags = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"];
export const listTags = ["ol", "ul"];

export const postAtom = atom<PostForEditType>();

export const openComponentSidebarAtom = atomWithStorage<boolean>(
  "ComponentSidebar",
  false
);
export const openSettingsSidebarAtom = atomWithStorage<boolean>(
  "SettingSidebar",
  true
);

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
  (get, set, updatedElment: EditorElement) => {
    const data = get(editorElementsAtom);

    const updateElement = (elements: EditorElement[]): EditorElement[] => {
      return elements.map((element) => {
        if (element.id === updatedElment.id) {
          return updatedElment;
        }

        if (Array.isArray(element.content)) {
          return {
            ...element,
            content: updateElement(element.content as EditorElement[]),
          };
        }
        return element;
      });
    };

    const updatedData = updateElement(data);
    set(editorElementsAtom, updatedData);
  }
);

export const deleteElementByIdAtom = atom(null, (get, set, elementId) => {
  const elementData = get(editorElementsAtom);

  const updateElement = (elements: EditorElement[]): EditorElement[] => {
    return elements
      .filter((element) => element.id !== elementId)
      .map((element) => {
        if (Array.isArray(element.content)) {
          return {
            ...element,
            content: updateElement(element.content as EditorElement[]),
          };
        }
        return element;
      });
  };

  const updatedElementData = updateElement(elementData);
  set(editorElementsAtom, updatedElementData);
});
