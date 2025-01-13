import editorStore, { listTags } from "../../libs/store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import icon from "@/lib/icons";
import { EditorElementType, TagType } from "../../libs/types";

const unorderedListStyle = [
  {
    styleName: "None",
    className: "list-ul-none",
  },
  {
    styleName: "Bullet",
    className: "list-ul-bullet",
  },
  {
    styleName: "Circle",
    className: "list-ul-circle",
  },
  {
    styleName: "Check",
    className: "list-ul-check",
  },
];

const orderedListStyle = [
  {
    styleName: "None",
    className: "list-ol-none",
  },
  {
    styleName: "Deciaml",
    className: "list-ol-decimal",
  },
  {
    styleName: "Alphabet",
    className: "list-ol-alphabet",
  },
  {
    styleName: "Roman",
    className: "list-ol-roman",
  },
];

export default function EditList({ element }: { element: EditorElementType }) {
  const [, updateElement] = useAtom(editorStore.updateSelectedElementAtom);

  return (
    <div className="divide-y-2">
      <div className="flex items-start gap-2 p-4">
        <icon.List className="size-6" />

        <div className="text-xs">
          <h1 className="font-semibold">List</h1>
          <p>Ordered and Unordered list</p>
        </div>
      </div>

      {/* Tag type */}
      <fieldset className="space-y-2 p-4">
        <div>
          <legend className="text-sm font-medium text-foreground">Tags</legend>
        </div>
        <RadioGroup
          className="grid grid-cols-4 gap-2"
          defaultValue={element.type}
          value={element.type}
        >
          {listTags.map((tag) => (
            <label
              key={tag}
              className={cn(
                "relative flex cursor-pointer flex-col items-center gap-3 rounded border border-input px-2 py-3 text-center shadow outline-offset-2 transition-colors has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70",
                "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                "has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground",
                "has-[[data-disabled]]:cursor-not-allowed"
              )}
              onClick={() => {
                updateElement({ ...element, type: tag as TagType });
              }}
            >
              <RadioGroupItem
                id={tag}
                value={tag}
                className="sr-only after:absolute after:inset-0"
              />
              <p className="text-sm font-medium leading-none">{tag}</p>
            </label>
          ))}
        </RadioGroup>
      </fieldset>

      {/* Order List style */}
      {element.type === "ol" && (
        <fieldset className="space-y-2 p-4">
          <div>
            <legend className="text-sm font-medium text-foreground">
              Unordered List Style
            </legend>
          </div>
          <RadioGroup
            className="grid grid-cols-4 gap-2"
            defaultValue={"list-ul-bullet"}
            value={element.className}
          >
            {orderedListStyle.map((style) => (
              <label
                key={style.className}
                className={cn(
                  "relative flex cursor-pointer flex-col items-center gap-3 rounded border border-input px-2 py-3 text-center shadow outline-offset-2 transition-colors has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70",
                  "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                  "has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground",
                  "has-[[data-disabled]]:cursor-not-allowed"
                )}
                onClick={() => {
                  updateElement({ ...element, className: style.className });
                }}
              >
                <RadioGroupItem
                  id={style.className}
                  value={style.className}
                  className="sr-only after:absolute after:inset-0"
                />
                <p className="text-sm font-medium leading-none">
                  {style.styleName}
                </p>
              </label>
            ))}
          </RadioGroup>
        </fieldset>
      )}

      {/* Unorder List style */}
      {element.type === "ul" && (
        <fieldset className="space-y-2 p-4">
          <div>
            <legend className="text-sm font-medium text-foreground">
              Unordered List Style
            </legend>
          </div>
          <RadioGroup
            className="grid grid-cols-4 gap-2"
            defaultValue={"list-ul-bullet"}
            value={element.className}
          >
            {unorderedListStyle.map((style) => (
              <label
                key={style.className}
                className={cn(
                  "relative flex cursor-pointer flex-col items-center gap-3 rounded border border-input px-2 py-3 text-center shadow outline-offset-2 transition-colors has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70",
                  "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                  "has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground",
                  "has-[[data-disabled]]:cursor-not-allowed"
                )}
                onClick={() => {
                  updateElement({ ...element, className: style.className });
                }}
              >
                <RadioGroupItem
                  id={style.className}
                  value={style.className}
                  className="sr-only after:absolute after:inset-0"
                />
                <p className="text-sm font-medium leading-none">
                  {style.styleName}
                </p>
              </label>
            ))}
          </RadioGroup>
        </fieldset>
      )}
    </div>
  );
}
