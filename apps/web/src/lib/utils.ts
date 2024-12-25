import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserSettingsKVType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSettingByName(settings: UserSettingsKVType, name: string) {
  return settings.find((setting) => setting.key.endsWith(name));
}

export function generateStrongPassword(length: number = 16): string {
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:',.<>?";
  const allChars = lowerCase + upperCase + numbers + specialChars;

  let password: string = "";

  // Ensure at least one character from each character set
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the rest of the password with random characters from all sets
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to ensure randomness
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}
