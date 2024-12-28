import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ReactNode } from "react";

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

export type ComponentGroupsType = {
  name: string;
  components: {
    title: string;
    lebel: string;
    icon: (props: IconProps) => ReactNode;
    type: ElementType;
    content?: string | EditorElement[];
    className?: string;
    style?: React.CSSProperties;
    tags?: string[];
  }[];
};
