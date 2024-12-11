"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { addEditorElementAtom, ElementType } from "../libs/store";
import { useAtom } from "jotai";
import {
  ButtonIcon,
  HeadingIcon,
  ListBulletIcon,
  PilcrowIcon,
} from "@radix-ui/react-icons";
import { SearchInput } from "./editor-ui/SearchInput";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { nanoid } from "../libs/utils";

type ComponentsListType = {
  title: string;
  lebel: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  type: ElementType;
  content?: string;
};

const components: ComponentsListType[] = [
  {
    title: "Paragraph",
    lebel: "paragraph",
    icon: PilcrowIcon,
    type: "p",
    content: "Paragraph",
  },
  {
    title: "Heading",
    lebel: "heading",
    icon: HeadingIcon,
    type: "h1",
    content: "This is a header",
  },
  {
    title: "List",
    lebel: "list",
    icon: ListBulletIcon,
    type: "li",
    content: "This is a list",
  },
  {
    title: "Button",
    lebel: "button",
    icon: ButtonIcon,
    type: "button",
    content: "Button",
  },
];

export default function InsertComponentBtn() {
  const [, addEditorElement] = useAtom(addEditorElementAtom);
  const [search, setSearch] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} className="size-6">
          <Plus />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-96 space-y-2 p-4">
        <SearchInput
          type="text"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="grid grid-cols-3 gap-2">
          {components
            .filter((component) =>
              component.lebel.includes(search.toLowerCase())
            )
            .map((component) => (
              <Button
                variant="ghost"
                key={component.lebel}
                className="flex h-auto flex-col items-center justify-center gap-2 [&_svg]:size-5"
                onClick={() =>
                  addEditorElement({
                    id: nanoid(),
                    type: component.type,
                    style: {
                      width: "768px",
                      margin: "auto",
                    },
                    className: "",
                    content: component.content
                      ? component.content
                      : component.title,
                  })
                }
              >
                <span>{component.title}</span>
                <component.icon className="size-6" />
              </Button>
            ))}
        </div>

        {components.filter((component) =>
          component.lebel.includes(search.toLowerCase())
        ).length === 0 && (
          <div className="w-full text-center text-muted-foreground">
            No Components
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
