import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserSettingsKVType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSettingByName(settings: UserSettingsKVType, name: string) {
  return settings.find((setting) => setting.key.endsWith(name));
}
