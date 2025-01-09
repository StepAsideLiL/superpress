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

export type EditorElementType = {
  id: string;
  type: TagType;
  content: string | EditorElementType[];
  style?: { [styleType in "base" | "hover"]?: React.CSSProperties };
  className?: string;
};

export type ComponentGroupsType = {
  name: string;
  components: {
    title: string;
    lebel: string;
    icon: IconType;
    type: TagType;
    content?: string | EditorElementType[];
    className?: string;
    style?: React.CSSProperties;
    tags?: string[];
  }[];
};

export type ElementConfigGroupType = "Text" | "List";

export type ElementConfigType = {
  title: string;
  description: string;
  lebel: string;
  group: ElementConfigGroupType;
  icon: IconType;
  tags: {
    title: string;
    type: TagType;
    icon: IconType;
  }[];
  keyWords: string[];
  defaultContent: EditorElementType;
  sidebar: ({
    elementConfig,
    element,
  }: {
    elementConfig: ElementConfigType;
    element: EditorElementType;
  }) => React.ReactNode;
  renderInEditor: ({
    children,
    element,
  }: {
    children: React.ReactNode;
    element: EditorElementType;
  }) => React.ReactNode;
  toolbar: () => React.ReactNode;
  addElement: ({
    elementConfig,
  }: {
    elementConfig: ElementConfigType;
  }) => React.ReactNode;
};
