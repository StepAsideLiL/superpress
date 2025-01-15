import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  ComponentGroupType,
  EditorElementType,
  EditorSelectedStateType,
  ElementConfigType,
} from "../../types";
import { PostForEditType } from "@/lib/types";
import { componentGroupNames, elementConfigs } from "../../../elements";

const postAtom = atom<PostForEditType>();

const isComponentSidebarOpenAtom = atomWithStorage<boolean>(
  "ComponentSidebar",
  false
);
const isSettingsSidebarOpenAtom = atomWithStorage<boolean>(
  "SettingSidebar",
  true
);

const isComponentInsertPopoverOpenAtom = atom(false);

/**
 * This is the main atom that holds the content of the editor.
 */
const editorElementsAtom = atom<EditorElementType[]>([]);

/**
 * This atom contains the state of the selected state and caret (text cursor).
 */
const editorSelectedAtom = atom<EditorSelectedStateType>({
  elementId: null,
  elementContent: "",
  cursorSelectedText: "",
  cursorPosition: { start: 0, end: 0 },
});

const elementConfigsAtom = atom<ElementConfigType[]>(elementConfigs);

const componentGroupNamesAtom = atom<ComponentGroupType[]>(componentGroupNames);

/**
 * This atom returns the selected element.
 */
const selectedElementAtom = atom((get) => {
  const editorElements = get(editorElementsAtom);
  const selectedElementId = get(editorSelectedAtom).elementId;

  if (!selectedElementId) return null;

  const findElement = (
    elements: EditorElementType[]
  ): EditorElementType | null => {
    for (const element of elements) {
      if (element.id === selectedElementId) return element;
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

const atoms = {
  postAtom,
  isComponentSidebarOpenAtom,
  isSettingsSidebarOpenAtom,
  isComponentInsertPopoverOpenAtom,
  editorElementsAtom,
  editorSelectedAtom,
  elementConfigsAtom,
  componentGroupNamesAtom,
  selectedElementAtom,
};

export default atoms;
