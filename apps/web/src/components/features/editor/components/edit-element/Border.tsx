import { EditorElementType } from "../../libs/types";
import { Button } from "@/components/ui/button";
import icon from "@/lib/icons";
import { useAtom } from "jotai";
import editorStore from "../../libs/store";
import _ from "lodash";
import { Input } from "@/components/ui/input";

export default function Border({ element }: { element: EditorElementType }) {
  const [, setElement] = useAtom(editorStore.selectElementAtom);
  const baseStyle = element.style?.base || {
    base: {},
  };

  return (
    <div className="space-y-2 px-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold">Border</h3>

        <div>
          {"border" in baseStyle ? (
            <Button
              variant={"ghost"}
              size={"icon"}
              className="size-6"
              disabled={!("border" in baseStyle)}
              onClick={() => {
                const newBaseStyle = _.omit(baseStyle, "border");
                setElement({
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
              disabled={"border" in baseStyle}
              onClick={() => {
                setElement({
                  ...element,
                  style: { base: { ...baseStyle, border: "6px red solid" } },
                });
              }}
            >
              <icon.Plus />
            </Button>
          )}
        </div>
      </div>

      {"border" in baseStyle && (
        <Input
          type="text"
          min={0}
          defaultValue={baseStyle.border}
          placeholder={baseStyle.border?.toString()}
          className="peer w-full pe-12"
          onWheel={(e) => e.currentTarget.blur()}
          onFocus={(e) => e.target.select()}
        />
      )}

      {/* {"border" in baseStyle && (
        <div className="relative">
          <Input
            type="number"
            min={0}
            value={parseInt(baseStyle.border?.toString() || "0px")}
            placeholder={baseStyle.border?.toString()}
            className="peer w-full pe-12"
            onWheel={(e) => e.currentTarget.blur()}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              if (!Number.isInteger(Number(e.target.value))) {
                return;
              }
              setElement({
                ...element,
                style: {
                  base: { ...baseStyle, border: `${e.target.value}px` },
                },
              });
            }}
          />
          <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
            px
          </span>
        </div>
      )} */}
    </div>
  );
}
