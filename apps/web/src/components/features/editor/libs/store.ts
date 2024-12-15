import { PostForEditType } from "@/lib/types";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { atom } from "jotai";
import {
  ButtonIcon,
  ContainerIcon,
  ListBulletIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { nanoid } from "./utils";

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

type ComponentGroupsType = {
  name: string;
  components: {
    title: string;
    lebel: string;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
    type: ElementType;
    content?: string | EditorElement[];
    className?: string;
    style?: React.CSSProperties;
    tags?: string[];
  }[];
};

export const componentGroups: ComponentGroupsType[] = [
  {
    name: "Text",
    components: [
      {
        title: "Text",
        lebel: "text",
        icon: TextIcon,
        type: "p",
        content: "Text",
        className: "text-subtitle",
        style: {
          width: "768px",
          marginLeft: "auto",
          marginRight: "auto",
        },
        tags: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "span",
          "heading",
          "paragraph",
          "text",
        ],
      },
      {
        title: "Button",
        lebel: "button",
        icon: ButtonIcon,
        type: "button",
        content: "Click Me",
        tags: ["button", "btn"],
      },
      {
        title: "List",
        lebel: "list",
        icon: ListBulletIcon,
        type: "ul",
        content: [
          {
            id: nanoid(),
            type: "li",
            content: "list",
          },
        ],
        className: "list-ul-bullet",
        style: {
          width: "768px",
          marginLeft: "auto",
          marginRight: "auto",
        },
        tags: ["list", "ul", "ol", "bullet", "unordered", "ordered"],
      },
    ],
  },
  {
    name: "Container",
    components: [
      {
        title: "Container",
        lebel: "container",
        icon: ContainerIcon,
        type: "div",
        content: "Container",
        className: "container",
        tags: ["container", "div"],
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
