import icon from "@/lib/icons";
import {
  AddHeadingBtn,
  HeadingEditorRender,
  HeadingSidebar,
  HeadingToolbar,
} from "./Heading";
import { nanoid } from "../libs/utils";
import { ElementConfigGroupType, ElementConfigType } from "../libs/types";
import {
  AddParagraphBtn,
  ParagraphEditorRender,
  ParagraphSidebar,
  ParagraphToolbar,
} from "./Paragraph";
import { AddListBtn, ListEditorRender, ListSidebar, ListToolbar } from "./List";
import {
  AddButtonBtn,
  ButtonEditorRender,
  ButtonSidebar,
  ButtonToolbar,
} from "./Button";
import {
  AddListItemBtn,
  ListItemEditorRender,
  ListItemSidebar,
  ListItemToolbar,
} from "./ListItem";

export const elementConfigs: ElementConfigType[] = [
  {
    title: "Heading",
    description: "Heading texts with heading tag.",
    lebel: "heading",
    group: "Text",
    icon: icon.Heading,
    tags: [
      {
        title: "Heading 1",
        type: "h1",
        icon: icon.Heading1,
      },
      {
        title: "Heading 2",
        type: "h2",
        icon: icon.Heading3,
      },
      {
        title: "Heading 3",
        type: "h3",
        icon: icon.Heading3,
      },
      {
        title: "Heading 4",
        type: "h4",
        icon: icon.Heading4,
      },
      {
        title: "Heading 5",
        type: "h5",
        icon: icon.Heading5,
      },
      {
        title: "Heading 6",
        type: "h6",
        icon: icon.Heading6,
      },
    ],
    keyWords: ["heading", "title", "h1", "h2", "h3", "h4", "h5", "h6"],
    defaultContent: {
      id: nanoid(),
      type: "h1",
      content: "",
      className: "text-default",
      style: {
        width: "768px",
      },
    },
    renderInEditor: HeadingEditorRender,
    sidebar: HeadingSidebar,
    toolbar: HeadingToolbar,
    addElement: AddHeadingBtn,
  },
  {
    title: "Paragraph",
    description: "Sub title texts with p tag.",
    lebel: "paragraph",
    group: "Text",
    icon: icon.Paragraph,
    tags: [
      {
        title: "Paragraph",
        type: "p",
        icon: icon.Paragraph,
      },
    ],
    keyWords: ["paragraph", "subtitle", "subheading", "p"],
    defaultContent: {
      id: nanoid(),
      type: "p",
      content: "",
      className: "text-subtitle",
      style: {
        width: "768px",
      },
    },
    renderInEditor: ParagraphEditorRender,
    sidebar: ParagraphSidebar,
    toolbar: ParagraphToolbar,
    addElement: AddParagraphBtn,
  },
  {
    title: "Button",
    description: "Button to take action.",
    lebel: "button",
    group: "Text",
    icon: icon.Button,
    tags: [
      {
        title: "Button",
        type: "button",
        icon: icon.Button,
      },
    ],
    keyWords: ["button", "link", "btn", "a", "href"],
    defaultContent: {
      id: nanoid(),
      type: "button",
      content: "",
      className: "button",
    },
    renderInEditor: ButtonEditorRender,
    sidebar: ButtonSidebar,
    toolbar: ButtonToolbar,
    addElement: AddButtonBtn,
  },
  {
    title: "List",
    description: "Ordered and unordered list.",
    lebel: "list",
    group: "Text",
    icon: icon.List,
    tags: [
      {
        title: "Ordered List",
        type: "ol",
        icon: icon.ListOrder,
      },
      {
        title: "Unordered List",
        type: "ul",
        icon: icon.List,
      },
    ],
    keyWords: ["list", "ordered", "unordered", "ol", "ul"],
    defaultContent: {
      id: nanoid(),
      type: "ul",
      content: [
        {
          id: nanoid(),
          type: "li",
          content: "",
        },
      ],
      className: "list-ul-bullet",
      style: {
        width: "768px",
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    renderInEditor: ListEditorRender,
    sidebar: ListSidebar,
    toolbar: ListToolbar,
    addElement: AddListBtn,
  },
  {
    title: "List Item",
    description: "Ordered and unordered list item.",
    lebel: "list-item",
    group: "List",
    icon: icon.ListItem,
    tags: [
      {
        title: "List Item",
        type: "li",
        icon: icon.ListItem,
      },
    ],
    keyWords: ["list item", "li"],
    defaultContent: {
      id: nanoid(),
      type: "li",
      content: "",
    },
    renderInEditor: ListItemEditorRender,
    sidebar: ListItemSidebar,
    toolbar: ListItemToolbar,
    addElement: AddListItemBtn,
  },
];

const elementConfigGroupNames: ElementConfigGroupType[] = ["Text"];

export const elementConfigBlocks = elementConfigs.filter((elementConfig) =>
  elementConfigGroupNames.includes(elementConfig.group)
);

export const elementConfigBlocksByGroup = elementConfigGroupNames.map(
  (name) => {
    return {
      name,
      elementsConfigs: elementConfigBlocks.filter(
        (elementConfig) => elementConfig.group === name
      ),
    };
  }
);

export const elementConfigsByTag = elementConfigs.reduce(
  (acc, elementConfig) => {
    elementConfig.tags.forEach((tag) => (acc[tag.type] = elementConfig));

    return acc;
  },
  {} as {
    [key: string]: ElementConfigType;
  }
);
