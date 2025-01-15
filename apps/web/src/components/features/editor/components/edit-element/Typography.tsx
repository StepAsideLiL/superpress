import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { EditorElementType } from "../../libs/types";
import { SelectValue } from "@radix-ui/react-select";
import { editorStore } from "../../libs/store";

const fontWeightOptions = [
  { title: "Thin", value: "100", style: { fontWeight: "100" } },
  {
    title: "Extra Light",
    value: "200",
    style: { fontWeight: "200" },
  },
  {
    title: "Light",
    value: "300",
    style: { fontWeight: "300" },
  },
  {
    title: "Regular",
    value: "400",
    style: { fontWeight: "400" },
  },
  {
    title: "Medium",
    value: "500",
    style: { fontWeight: "500" },
  },
  {
    title: "Semi Bold",
    value: "600",
    style: { fontWeight: "600" },
  },
  { title: "Bold", value: "700", style: { fontWeight: "700" } },
  {
    title: "Extra Bold",
    value: "800",
    style: { fontWeight: "800" },
  },
  {
    title: "Black",
    value: "900",
    style: { fontWeight: "900" },
  },
];

const fontSizeOptions = [
  {
    label: "10px",
    value: "10px",
    style: { fontSize: "10px", lineHeight: "1" },
  },
  {
    label: "11px",
    value: "11px",
    style: { fontSize: "11px", lineHeight: "1" },
  },
  {
    label: "12px",
    value: "12px",
    style: { fontSize: "12px", lineHeight: "1" },
  },
  {
    label: "13px",
    value: "13px",
    style: { fontSize: "13px", lineHeight: "1" },
  },
  {
    label: "14px",
    value: "14px",
    style: { fontSize: "14px", lineHeight: "1" },
  },
  {
    label: "15px",
    value: "15px",
    style: { fontSize: "15px", lineHeight: "1" },
  },
  {
    label: "16px",
    value: "16px",
    style: { fontSize: "16px", lineHeight: "1" },
  },
  {
    label: "18px",
    value: "18px",
    style: { fontSize: "18px", lineHeight: "1" },
  },
  {
    label: "20px",
    value: "20px",
    style: { fontSize: "20px", lineHeight: "1" },
  },
  {
    label: "24px",
    value: "24px",
    style: { fontSize: "24px", lineHeight: "1" },
  },
  {
    label: "30px",
    value: "30px",
    style: { fontSize: "30px", lineHeight: "1" },
  },
  {
    label: "36px",
    value: "36px",
    style: { fontSize: "36px", lineHeight: "1" },
  },
  {
    label: "48px",
    value: "48px",
    style: { fontSize: "48px", lineHeight: "1" },
  },
  {
    label: "60px",
    value: "60px",
    style: { fontSize: "60px", lineHeight: "1" },
  },
  {
    label: "72px",
    value: "72px",
    style: { fontSize: "72px", lineHeight: "1" },
  },
  {
    label: "96px",
    value: "96px",
    style: { fontSize: "96px", lineHeight: "1" },
  },
  {
    label: "128px",
    value: "128px",
    style: { fontSize: "128px", lineHeight: "1" },
  },
];

export default function Typography({
  element,
}: {
  element: EditorElementType;
}) {
  function handleFontWeightChange(value: string) {
    const fontWeightStyle = fontWeightOptions.find(
      (option) => option.value === value
    )?.style;

    editorStore.elementActions.updateSelectedElement({
      ...element,
      style: { base: { ...element.style?.base, ...fontWeightStyle } },
    });
  }

  function handleFontSizeChange(value: string) {
    const fontSizeStyle = fontSizeOptions.find(
      (option) => option.value === value
    )?.style;

    editorStore.elementActions.updateSelectedElement({
      ...element,
      style: { base: { ...element.style?.base, ...fontSizeStyle } },
    });
  }

  return (
    <div className="space-y-2 px-4 py-2">
      <h3 className="text-xs font-semibold">Typography</h3>

      <div className="flex items-center gap-2">
        <Select
          defaultValue={element.style?.base?.fontWeight?.toString() || "400"}
          onValueChange={(value) => handleFontWeightChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Font Weight" />
          </SelectTrigger>

          <SelectContent>
            {fontWeightOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue={element.style?.base?.fontSize?.toString() || "14px"}
          onValueChange={(value) => handleFontSizeChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Font Size" />
          </SelectTrigger>

          <SelectContent>
            {fontSizeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
