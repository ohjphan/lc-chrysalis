import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "border-w": ["border-app"],
      "border-w-t": ["border-app-t"],
      "border-w-r": ["border-app-r"],
      "border-w-b": ["border-app-b"],
      "border-w-l": ["border-app-l"],
      "border-w-y": ["border-app-y"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
