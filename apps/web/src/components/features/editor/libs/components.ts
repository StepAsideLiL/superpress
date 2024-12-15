import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import {
  ButtonIcon,
  ContainerIcon,
  ListBulletIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { nanoid } from "./utils";
import { EditorElement, ElementType } from "./store";

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

export const components = componentGroups.flatMap((group) => group.components);
