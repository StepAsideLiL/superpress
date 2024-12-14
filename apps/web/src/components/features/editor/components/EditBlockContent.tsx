"use client";

import { useAtom } from "jotai";
import { headingTags, selectElementAtom } from "../libs/store";
import EditText from "./block-edit/EditText";
import { HeadingIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

export default function EditBlockContent() {
  const [element] = useAtom(selectElementAtom);

  if (!element) {
    return (
      <div className="py-5">
        <p className="text-center text-sm text-muted-foreground">
          No block selected.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {headingTags.includes(element.type) && (
        <div>
          <div className="flex items-start gap-2 p-4">
            <HeadingIcon className="size-6" />

            <div className="text-xs">
              <h1 className="font-semibold">Heading</h1>
              <p>Important heading for sections</p>
            </div>
          </div>

          <Separator orientation="horizontal" />

          <EditText element={element} />
        </div>
      )}
    </div>
  );
}
