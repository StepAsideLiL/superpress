import { cn } from "@/lib/utils";
import { EditorElement } from "../../libs/types";
import editorStore from "../../libs/store";
import { useAtom } from "jotai";

export default function EditorRender({
  children,
  element,
}: {
  children: React.ReactNode;
  element: EditorElement;
}) {
  const [selectedElementId, setSelectedElementId] = useAtom(
    editorStore.selectedElementIdForEditingAtom
  );

  return (
    <div
      id={element.id}
      className={cn(
        "mx-auto w-auto cursor-pointer border py-1 hover:border hover:border-muted",
        selectedElementId === element.id
          ? "border-blue-500 hover:border-blue-500"
          : "border-background"
      )}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElementId(element.id);
      }}
    >
      {children}
    </div>
  );
}
