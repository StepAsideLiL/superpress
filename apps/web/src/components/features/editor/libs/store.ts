import { PostForEditType } from "@/lib/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { EditorElement } from "./types";

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

const editorElementsAtom = atom<EditorElement[]>([]);
const addEditorElementAtom = atom(
  null,
  (get, set, newEditorElement: EditorElement) => {
    set(editorElementsAtom, [...get(editorElementsAtom), newEditorElement]);
  }
);

const selectedElementIdForEditingAtom = atom<string | null>(null);
const selectElementAtom = atom(
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

const deleteElementByIdAtom = atom(null, (get, set, elementId) => {
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

const insertElementAfterSelectedElementByIdAtom = atom(
  null,
  (get, set, elementId: string, newElement: EditorElement) => {
    const editorElementData = get(editorElementsAtom);

    function updateElement(content: EditorElement[]): EditorElement[] {
      const updatedElements: EditorElement[] = [];

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
  selectedElementIdForEditingAtom,
  selectElementAtom,
  deleteElementByIdAtom,
  insertElementAfterSelectedElementByIdAtom,
  openInsertPopoverAtom,
};

export default editorStore;
