import { nanoid } from "./utils";
import { ComponentGroupsType } from "./types";
import icon from "@/lib/icons";

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
        tags: ["button", "btn", "link"],
        className: "button",
        style: {},
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
