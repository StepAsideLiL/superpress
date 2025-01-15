import { EditorElementType } from "../../libs/types";
import { Button } from "@/components/ui/button";
import icon from "@/lib/icons";
import _ from "lodash";
import { Input } from "@/components/ui/input";
import { editorStore } from "../../libs/store";

export default function Padding({ element }: { element: EditorElementType }) {
  const baseStyle = element.style?.base || {
    base: {},
  };

  return (
    <div className="space-y-2 px-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold">Padding</h3>

        <div>
          {"padding" in baseStyle ? (
            <Button
              variant={"ghost"}
              size={"icon"}
              className="size-6"
              disabled={!("padding" in baseStyle)}
              onClick={() => {
                const newBaseStyle = _.omit(baseStyle, "padding");
                editorStore.elementActions.updateSelectedElement({
                  ...element,
                  style: { base: { ...newBaseStyle } },
                });
              }}
            >
              <icon.Minus />
            </Button>
          ) : (
            <Button
              variant={"ghost"}
              size={"icon"}
              className="size-6"
              disabled={"padding" in baseStyle}
              onClick={() => {
                editorStore.elementActions.updateSelectedElement({
                  ...element,
                  style: { base: { ...baseStyle, padding: "0px" } },
                });
              }}
            >
              <icon.Plus />
            </Button>
          )}
        </div>
      </div>

      {"padding" in baseStyle && (
        <div className="relative">
          <Input
            type="number"
            min={0}
            value={parseInt(baseStyle.padding?.toString() || "0px")}
            placeholder={baseStyle.padding?.toString()}
            className="peer w-full pe-12"
            onWheel={(e) => e.currentTarget.blur()}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              if (!Number.isInteger(Number(e.target.value))) {
                return;
              }
              editorStore.elementActions.updateSelectedElement({
                ...element,
                style: {
                  base: { ...baseStyle, padding: `${e.target.value}px` },
                },
              });
            }}
          />
          <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
            px
          </span>
        </div>
      )}
    </div>
  );
}
