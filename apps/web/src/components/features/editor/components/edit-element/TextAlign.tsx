import { EditorElementType } from "../../libs/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import editorStore from "../../libs/store";
import icon, { IconType } from "@/lib/icons";
import { CSSProperties } from "react";
import _ from "lodash";

type TextAlignOptionType = {
  title: string;
  value: CSSProperties["textAlign"];
  icon: IconType;
  style: CSSProperties;
};

const textAlignOptions: TextAlignOptionType[] = [
  {
    title: "Left",
    value: "left",
    icon: icon.TextAlignLeft,
    style: {
      textAlign: "left",
    },
  },
  {
    title: "Center",
    value: "center",
    icon: icon.TextAlignCenter,
    style: {
      textAlign: "center",
    },
  },
  {
    title: "Right",
    value: "right",
    icon: icon.TextAlignRight,
    style: {
      textAlign: "right",
    },
  },
  {
    title: "Justify",
    value: "justify",
    icon: icon.TextAlignJustify,
    style: {
      textAlign: "justify",
    },
  },
];

export default function TextAlign({ element }: { element: EditorElementType }) {
  const [, updateElement] = useAtom(editorStore.updateSelectedElementAtom);
  const defaultStyle =
    textAlignOptions.find(
      (option) => option.value === element.style?.base?.textAlign
    ) || textAlignOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="[&_svg]:size-5">
          <defaultStyle.icon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {textAlignOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();

              if (element.style?.base?.textAlign === option.value) {
                const newStyle = _.omit(element.style?.base, ["textAlign"]);
                updateElement({
                  ...element,
                  style: { base: { ...newStyle } },
                });
                return;
              }

              updateElement({
                ...element,
                style: { base: { ...element?.style?.base, ...option.style } },
              });
            }}
          >
            <span
              className={cn(
                "rounded-sm p-1",
                option.value === element.style?.base?.textAlign
                  ? "bg-primary text-background"
                  : "text-primary"
              )}
            >
              <option.icon />
            </span>
            <span>{option.title}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
