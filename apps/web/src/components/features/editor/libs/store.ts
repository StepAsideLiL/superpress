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
  selectedElementContent: string | (string | EditorElementType)[];
  selectedText: string;
  cursorPosition: { start: number; end: number };
};

const editorStateAtom = atom<EditorStateType>({
  selectedElementId: null,
  selectedElementContent: "",
  selectedText: "",
  cursorPosition: { start: 0, end: 0 },
});

/**
 * Get seleted element.
 */
const selectElementAtom = atom((get) => {
  const editorElements = get(editorElementsAtom);
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

  return findElement(editorElements);
});

/**
 * Updates the selected element.
 */
const updateSelectedElementAtom = atom(
  null,
  (get, set, updatedElement: EditorElementType) => {
    const initialEditorElements = get(editorElementsAtom);

    function updateElement(elements: EditorElementType[]): EditorElementType[] {
      return elements.map((element) => {
        if (element.id === updatedElement.id) {
          return updatedElement;
        }

        if (Array.isArray(element.content)) {
          return {
            ...element,
            content: updateElement(element.content as EditorElementType[]),
          };
        }
        return element;
      });
    }

    set(editorElementsAtom, updateElement(initialEditorElements));
  }
);

/**
 * Deletes an element by its id.
 */
const deleteElementByIdAtom = atom(null, (get, set, elementId) => {
  const initialEditorElements = get(editorElementsAtom);

  function updateElement(elements: EditorElementType[]): EditorElementType[] {
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
  }

  set(editorElementsAtom, updateElement(initialEditorElements));
});

/**
 * Inserts a new element after the selected element. If no selected element is found, it inserts the new element at the end of the root editor elements array.
 */
const insertElementAtom = atom(
  null,
  (
    get,
    set,
    newElement: EditorElementType,
    selectedElementId?: string | null
  ) => {
    const initialEditorElements = get(editorElementsAtom);

    if (!selectedElementId) {
      set(editorElementsAtom, [...initialEditorElements, newElement]);
      return;
    }

    function updateEditorElements(content: (string | EditorElementType)[]) {
      const updatedEditorElements: EditorElementType[] = [];

      for (let i = 0; i < content.length; i++) {
        const element = content[i];
        if (typeof element !== "string") {
          updatedEditorElements.push(element);
        }

        if (typeof element !== "string" && element.id === selectedElementId) {
          updatedEditorElements.push(newElement);
        }

        if (typeof element !== "string" && Array.isArray(element.content)) {
          updatedEditorElements[updatedEditorElements.length - 1] = {
            ...element,
            content: updateEditorElements(element.content),
          };
        }
      }

      return updatedEditorElements;
    }

    set(editorElementsAtom, updateEditorElements(initialEditorElements));
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
  openInsertPopoverAtom,
  insertElementAtom,
  updateSelectedElementAtom,
};

export default editorStore;
