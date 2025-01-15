import { Button } from "@/components/ui/button";
import { nanoid } from "../../libs/utils";
import { ElementConfigType } from "../../libs/types";
import { editorStore } from "../../libs/store";

export default function AddBtn({
  elementConfig,
}: {
  elementConfig: ElementConfigType;
}) {
  const selectState = editorStore.selected.useSelected();

  return (
    <Button
      key={elementConfig.lebel}
      variant={"ghost"}
      className="flex h-auto flex-col items-center justify-center gap-2 [&_svg]:size-5"
      onClick={(event) => {
        event.stopPropagation();
        editorStore.insertComponentPopover.setIsOpen(false);

        const id = nanoid();

        editorStore.elementActions.insertElementAfter(
          {
            id: id,
            type: elementConfig.defaultContent.type,
            content: elementConfig.defaultContent.content,
            style: elementConfig.defaultContent.style,
          },
          selectState.elementId
        );

        editorStore.selected.setSelected({
          ...selectState,
          elementId: id,
          elementContent: elementConfig.defaultContent.content,
        });
      }}
    >
      <span>{elementConfig.title}</span>
      <elementConfig.icon className="size-6" />
    </Button>
  );
}
