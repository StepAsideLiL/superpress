import { createStore, useAtom } from "jotai";
import { atoms } from ".";
import {
  EditorElementType,
  EditorSelectedStateType,
  ElementConfigType,
} from "../types";
import { PostForEditType } from "@/lib/types";

export const store = createStore();

const editorStore = {
  componentSidebar: {
    useIsOpen: () => {
      return useAtom(atoms.isComponentSidebarOpenAtom)[0];
    },
    setIsOpen: (open: boolean) =>
      store.set(atoms.isComponentSidebarOpenAtom, open),
    toggle: () =>
      store.set(
        atoms.isComponentSidebarOpenAtom,
        !store.get(atoms.isComponentSidebarOpenAtom)
      ),
  },

  settingSidebar: {
    useIsOpen: () => {
      return useAtom(atoms.isSettingsSidebarOpenAtom)[0];
    },
    setIsOpen: (open: boolean) =>
      store.set(atoms.isSettingsSidebarOpenAtom, open),
    toggle: () =>
      store.set(
        atoms.isSettingsSidebarOpenAtom,
        !store.get(atoms.isSettingsSidebarOpenAtom)
      ),
  },

  insertComponentPopover: {
    useIsOpen: () => {
      return useAtom(atoms.isComponentInsertPopoverOpenAtom)[0];
    },
    setIsOpen: (open: boolean) =>
      store.set(atoms.isComponentInsertPopoverOpenAtom, open),
  },

  post: {
    usePost: () => {
      return useAtom(atoms.postAtom)[0];
    },
    setPost: (post: PostForEditType) => store.set(atoms.postAtom, post),
  },

  configs: {
    all: store.get(atoms.elementConfigsAtom),
    componentGroup: store
      .get(atoms.elementConfigsAtom)
      .filter((config) =>
        store.get(atoms.componentGroupNamesAtom).includes(config.group)
      ),
    componentByGroup: store.get(atoms.componentGroupNamesAtom).map((name) => {
      return {
        name,
        elementsConfigs: store
          .get(atoms.elementConfigsAtom)
          .filter((elementConfig) => elementConfig.group === name),
      };
    }),
    componentByTag: store.get(atoms.elementConfigsAtom).reduce(
      (acc, elementConfig) => {
        elementConfig.tags.forEach((tag) => (acc[tag.type] = elementConfig));

        return acc;
      },
      {} as {
        [key: string]: ElementConfigType;
      }
    ),
  },

  selected: {
    useSelected: () => {
      return useAtom(atoms.editorSelectedAtom)[0];
    },
    useSelectedElement: () => {
      return useAtom(atoms.selectedElementAtom)[0];
    },
    setSelected: (editorState: EditorSelectedStateType) =>
      store.set(atoms.editorSelectedAtom, editorState),
  },

  element: {
    useElements: () => {
      return useAtom(atoms.editorElementsAtom)[0];
    },
    setElements: (content: EditorElementType[]) =>
      store.set(atoms.editorElementsAtom, content),
  },

  elementActions: {
    /**
     * Insert an element after the selected element or at the end of the root element.
     * @param newElement New element.
     * @param selectedElementId Select element id. Null if no element is selected.
     */
    insertElementAfter: (
      newElement: EditorElementType,
      selectedElementId: string | null = null
    ) => {
      const initialEditorElements = store.get(atoms.editorElementsAtom);

      if (!selectedElementId) {
        store.set(atoms.editorElementsAtom, [
          ...initialEditorElements,
          newElement,
        ]);
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

      store.set(
        atoms.editorElementsAtom,
        updateEditorElements(initialEditorElements)
      );
    },

    /**
     * Update the selected element.
     * @param updatedElement Updated selected element.
     */
    updateSelectedElement: (updatedElement: EditorElementType) => {
      const initialEditorElements = store.get(atoms.editorElementsAtom);

      function updateElement(
        elements: EditorElementType[]
      ): EditorElementType[] {
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

      store.set(atoms.editorElementsAtom, updateElement(initialEditorElements));
    },

    /**
     * Delete the element by id.
     * @param elementId Element id
     */
    deleteElementById: (elementId: string) => {
      const initialEditorElements = store.get(atoms.editorElementsAtom);

      function updateElement(
        elements: EditorElementType[]
      ): EditorElementType[] {
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

      store.set(atoms.editorElementsAtom, updateElement(initialEditorElements));
    },
  },
};

export default editorStore;
