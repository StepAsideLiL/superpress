import { atom } from "jotai";

export const openComponentSidebarAtom = atom<boolean>(false);
export const openSettingsSidebarAtom = atom<boolean>(false);

export const toggleComponentSidebarAtom = atom(null, (get, set) => {
  set(openComponentSidebarAtom, !get(openComponentSidebarAtom));
});
export const toggleSettingsSidebarAtom = atom(null, (get, set) => {
  set(openSettingsSidebarAtom, !get(openSettingsSidebarAtom));
});
