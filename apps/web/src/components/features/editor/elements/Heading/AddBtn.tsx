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
  const [, addNewElementInRoot] = useAtom(editorStore.insertElementAtom);
  const [editorState, setEditorState] = useAtom(editorStore.editorStateAtom);
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

        addNewElementInRoot({
          id: id,
          type: elementConfig.defaultContent.type,
          content: elementConfig.defaultContent.content,
          style: elementConfig.defaultContent.style,
        });

        setEditorState({
          ...editorState,
          selectedElementId: id,
          selectedElementContent: elementConfig.defaultContent.content,
        });
      }}
    >
      <span>{elementConfig.title}</span>
      <elementConfig.icon className="size-6" />
    </Button>
  );
}
