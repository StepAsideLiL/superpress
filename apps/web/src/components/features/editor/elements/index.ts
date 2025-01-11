import icon from "@/lib/icons";
import {
  AddHeadingBtn,
  HeadingEditorRender,
  HeadingSidebar,
  HeadingToolbar,
} from "./Heading";
import { nanoid } from "../libs/utils";
import { ElementConfigGroupType, ElementConfigType } from "../libs/types";
import { TextEffectEditorRender } from "./TextEffect";

export const elementConfigs: ElementConfigType[] = [
  {
    title: "Text Effect",
    description: "Text Effects.",
    lebel: "textEffect",
    group: "Text Extra",
    icon: icon.Button,
    tags: [
      {
        title: "Strong",
        type: "strong",
        icon: icon.Bold,
      },
    ],
    keyWords: [],
    defaultContent: {
      id: nanoid(),
      type: "strong",
      content: "",
    },
    renderInEditor: TextEffectEditorRender,
  },
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
        icon: icon.Heading2,
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
      className: "",
      style: {
        base: {},
      },
    },
    renderInEditor: HeadingEditorRender,
    sidebar: HeadingSidebar,
    toolbar: HeadingToolbar,
    addElement: AddHeadingBtn,
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
