import { EditorElement } from "../../libs/store";
import icon from "@/lib/icons";

export default function EditListItem({ element }: { element: EditorElement }) {
  return (
    <div className="divide-y-2">
      <div className="flex items-start gap-2 p-4">
        <icon.Logs className="size-6" />

        <div className="text-xs">
          <h1 className="font-semibold">List Item</h1>
          <p>Individual item in a list</p>
        </div>
      </div>

      <div className="p-4">{element.id}</div>
    </div>
  );
}
