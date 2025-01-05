import { useAtom } from "jotai";
import editorStore from "../../libs/store";
import { Button } from "@/components/ui/button";
import { ElementConfigType } from "../../libs/types";
import { nanoid } from "../../libs/utils";

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
          id: nanoid(),
          type: elementConfig.defaultContent.type,
          content: [
            {
              id: id,
              type: "li",
              content: "",
            },
          ],
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
