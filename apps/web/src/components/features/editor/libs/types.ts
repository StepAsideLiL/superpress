import { IconType } from "@/lib/icons";

export type TagType =
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
  type: TagType;
  content: string | EditorElement[];
  style?: React.CSSProperties;
  className?: string;
};

export type ComponentGroupsType = {
  name: string;
  components: {
    title: string;
    lebel: string;
    icon: IconType;
    type: TagType;
    content?: string | EditorElement[];
    className?: string;
    style?: React.CSSProperties;
    tags?: string[];
  }[];
};

export type ComponentGroupType = "Text" | "List";

export type ElementType = {
  title: string;
  description: string;
  lebel: string;
  group: ComponentGroupType;
  icon: IconType;
  tags: {
    title: string;
    type: TagType;
    icon: IconType;
  }[];
  keyWords: string[];
  defaultContent: EditorElement;
  sidebar: () => React.ReactNode;
  renderInEditor: ({
    children,
    element,
  }: {
    children: React.ReactNode;
    element: EditorElement;
  }) => React.ReactNode;
  toolbar: () => React.ReactNode;
  addElement: ({ element }: { element: ElementType }) => React.ReactNode;
};
