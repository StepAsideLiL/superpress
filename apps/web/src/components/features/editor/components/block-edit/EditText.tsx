"use client";

import { useAtom } from "jotai";
import { EditorElement, selectElementAtom } from "../../libs/store";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const stylePresets = [
  {
    title: "Default",
    lebel: "default",
    className: "text-default",
  },
  {
    title: "Display",
    lebel: "display",
    className: "text-display",
  },
  {
    title: "Subtitle",
    lebel: "subtitle",
    className: "text-subtitle",
  },
  {
    title: "Annotation",
    lebel: "annotation",
    className: "text-annotation",
  },
];

export default function EditText({ element }: { element: EditorElement }) {
  const [, setElement] = useAtom(selectElementAtom);

  function handleChange(style: (typeof stylePresets)[0]) {
    setElement({ ...element, className: style.className });
  }

  return (
    <div className="divide-y-2">
      <fieldset className="space-y-2 p-4">
        <div>
          <legend className="text-sm font-medium text-foreground">Style</legend>
        </div>
        <RadioGroup
          className="grid grid-cols-2 gap-2"
          defaultValue={element.className}
          // value={""}
        >
          {stylePresets.map((style) => (
            <label
              key={style.lebel}
              className={cn(
                "relative flex cursor-pointer flex-col items-center gap-3 rounded border border-input px-2 py-3 text-center shadow outline-offset-2 transition-colors has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70",
                "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                "has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground",
                "has-[[data-disabled]]:cursor-not-allowed"
              )}
              onClick={() => {
                handleChange(style);
              }}
            >
              <RadioGroupItem
                id={style.lebel}
                value={style.className}
                className="sr-only after:absolute after:inset-0"
              />
              <p className="text-sm font-medium leading-none">{style.title}</p>
            </label>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  );
}