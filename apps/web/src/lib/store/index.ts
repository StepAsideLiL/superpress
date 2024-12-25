import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const quickEditRowIdAtom = atom("");
export const isBulkEditTableRowOpenAtom = atom(false);

const store = {
  quickEditRowIdAtom,
  isBulkEditTableRowOpenAtom,
  isDashboardSidebarOpen: atomWithStorage("isDashboardSidebarOpen", false),
  userId: atomWithStorage("userId", ""),
};

export default store;
