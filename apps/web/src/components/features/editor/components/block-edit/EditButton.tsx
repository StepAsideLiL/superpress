import icon from "@/lib/icons";
import { EditorElement } from "../../libs/types";

export default function EditButton({ element }: { element: EditorElement }) {
  console.log(element);

  return (
    <div>
      <div className="flex items-start gap-2 p-4">
        <icon.Button className="size-6" />

        <div className="text-xs">
          <h1 className="font-semibold">Button</h1>
          <p>Button</p>
        </div>
      </div>
    </div>
  );
}
