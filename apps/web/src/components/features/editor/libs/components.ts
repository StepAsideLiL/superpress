import { ReactNode } from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { nanoid } from "./utils";
import { EditorElement, ElementType } from "./store";
import icon from "@/lib/icons";

type ComponentGroupsType = {
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

export const componentGroups: ComponentGroupsType[] = [
  {
    name: "Text",
    components: [
      {
        title: "Text",
        lebel: "text",
        icon: icon.Text,
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
        icon: icon.Button,
        type: "button",
        content: "Click Me",
        tags: ["button", "btn"],
      },
      {
        title: "List",
        lebel: "list",
        icon: icon.List,
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
        icon: icon.Container,
        type: "div",
        content: "Container",
        className: "container",
        tags: ["container", "div"],
      },
    ],
  },
];

export const components = componentGroups.flatMap((group) => group.components);
