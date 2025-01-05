import { useAtom } from "jotai";
import editorStore from "../../libs/store";
import { Button } from "@/components/ui/button";
import { nanoid } from "../../libs/utils";
import { ElementConfigType } from "../../libs/types";

export default function AddBtn({
  elementConfig,
}: {
  elementConfig: ElementConfigType;
}) {
  const [, addEditorElement] = useAtom(editorStore.addEditorElementAtom);
  const [, setElementID] = useAtom(editorStore.selectedElementIdForEditingAtom);
  const [, setOpen] = useAtom(editorStore.openInsertPopoverAtom);

  return (
    <Button
      key={elementConfig.lebel}
      variant={"ghost"}
      className="flex h-auto flex-col items-center justify-center gap-2 [&_svg]:size-5"
      onClick={(event) => {
        event.stopPropagation();
        setOpen(false);

        const id = nanoid();

        addEditorElement({
          id: id,
          type: elementConfig.defaultContent.type,
          content: elementConfig.defaultContent.content
            ? elementConfig.defaultContent.content
            : "",
          style: elementConfig.defaultContent.style,
          className: elementConfig.defaultContent.className,
        });

        setElementID(id);
      }}
    >
      <span>{elementConfig.title}</span>
      <elementConfig.icon className="size-6" />
    </Button>
  );
}
