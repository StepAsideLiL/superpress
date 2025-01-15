"use client";

import { Provider as EditorProvider } from "jotai";
import { store } from "../libs/store";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <EditorProvider store={store}>{children}</EditorProvider>;
}
