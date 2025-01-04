import { useAtom } from "jotai";
import editorStore from "../../libs/store";
import { Button } from "@/components/ui/button";
import { ElementType } from "../../libs/types";
import { nanoid } from "../../libs/utils";

export default function AddBtn({ element }: { element: ElementType }) {
  const [, addEditorElement] = useAtom(editorStore.addEditorElementAtom);
  const [, setElementID] = useAtom(editorStore.selectedElementIdForEditingAtom);

  return (
    <Button
      key={element.lebel}
      variant={"ghost"}
      className="flex h-auto flex-col items-center justify-center gap-2 [&_svg]:size-5"
      onClick={() => {
        const id = nanoid();

        addEditorElement({
          id: id,
          type: element.defaultContent.type,
          content: element.defaultContent.content
            ? element.defaultContent.content
            : "",
          style: element.defaultContent.style,
          className: element.defaultContent.className,
        });

        setElementID(id);
      }}
    >
      <span>{element.title}</span>
      <element.icon className="size-6" />
    </Button>
  );
}
