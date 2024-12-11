"use client";

import { useAtom } from "jotai";
import { selectedElementIdForEditingAtom } from "../../libs/store";

export default function EditableElement({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [, setSelectedElementId] = useAtom(selectedElementIdForEditingAtom);

  return (
    <div className="border" onClick={() => setSelectedElementId(id)}>
      {children}
    </div>
  );
}
