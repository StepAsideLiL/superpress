import { PostForEditType } from "@/lib/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { EditorElementType } from "./types";

export const textTags = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"];
export const listTags = ["ol", "ul"];

const postAtom = atom<PostForEditType>();

const openComponentSidebarAtom = atomWithStorage<boolean>(
  "ComponentSidebar",
  false
);
const openSettingsSidebarAtom = atomWithStorage<boolean>(
  "SettingSidebar",
  true
);

const openInsertPopoverAtom = atom(false);

const toggleComponentSidebarAtom = atom(null, (get, set) => {
  set(openComponentSidebarAtom, !get(openComponentSidebarAtom));
});
const toggleSettingsSidebarAtom = atom(null, (get, set) => {
  set(openSettingsSidebarAtom, !get(openSettingsSidebarAtom));
});

const editorElementsAtom = atom<EditorElementType[]>([]);
const addEditorElementAtom = atom(
  null,
  (get, set, newEditorElement: EditorElementType) => {
    set(editorElementsAtom, [...get(editorElementsAtom), newEditorElement]);
  }
);

type EditorStateType = {
  selectedElementId: string | null;
  selectedElementContent: EditorElementType[] | string;
  selectedText: string;
  cursorPosition: { start: number; end: number };
};

const editorStateAtom = atom<EditorStateType>({
  selectedElementId: null,
  selectedElementContent: "",
  selectedText: "",
  cursorPosition: { start: 0, end: 0 },
});
const selectElementAtom = atom(
  (get) => {
    const data = get(editorElementsAtom);
    const selectedId = get(editorStateAtom).selectedElementId;

    if (!selectedId) return null;

    const findElement = (
      elements: EditorElementType[]
    ): EditorElementType | null => {
      for (const element of elements) {
        if (element.id === selectedId) return element;
        if (Array.isArray(element.content)) {
          const childElement = findElement(
            element.content as EditorElementType[]
          );
          if (childElement) return childElement;
        }
      }
      return null;
    };

    return findElement(data);
  },
  (get, set, updatedElment: EditorElementType) => {
    const data = get(editorElementsAtom);

    const updateElement = (
      elements: EditorElementType[]
    ): EditorElementType[] => {
      return elements.map((element) => {
        if (element.id === updatedElment.id) {
          return updatedElment;
        }

        if (Array.isArray(element.content)) {
          return {
            ...element,
            content: updateElement(element.content as EditorElementType[]),
          };
        }
        return element;
      });
    };

    const updatedData = updateElement(data);
    set(editorElementsAtom, updatedData);
  }
);

const deleteElementByIdAtom = atom(null, (get, set, elementId) => {
  const elementData = get(editorElementsAtom);

  const updateElement = (
    elements: EditorElementType[]
  ): EditorElementType[] => {
    return elements
      .filter((element) => element.id !== elementId)
      .map((element) => {
        if (Array.isArray(element.content)) {
          return {
            ...element,
            content: updateElement(element.content as EditorElementType[]),
          };
        }
        return element;
      });
  };

  const updatedElementData = updateElement(elementData);
  set(editorElementsAtom, updatedElementData);
});

const insertElementAfterSelectedElementByIdAtom = atom(
  null,
  (get, set, elementId: string, newElement: EditorElementType) => {
    const editorElementData = get(editorElementsAtom);

    function updateElement(content: EditorElementType[]): EditorElementType[] {
      const updatedElements: EditorElementType[] = [];

      for (let i = 0; i < content.length; i++) {
        const element = content[i];
        updatedElements.push(element);

        if (element.id === elementId) {
          updatedElements.push(newElement);
        }

        if (Array.isArray(element.content)) {
          updatedElements[updatedElements.length - 1] = {
            ...element,
            content: updateElement(element.content),
          };
        }
      }
      return updatedElements;
    }

    const updatedElements = updateElement(editorElementData);

    set(editorElementsAtom, updatedElements);
  }
);

const editorStore = {
  postAtom,
  openComponentSidebarAtom,
  openSettingsSidebarAtom,
  toggleComponentSidebarAtom,
  toggleSettingsSidebarAtom,
  editorElementsAtom,
  addEditorElementAtom,
  editorStateAtom,
  selectElementAtom,
  deleteElementByIdAtom,
  insertElementAfterSelectedElementByIdAtom,
  openInsertPopoverAtom,
};

export default editorStore;
