import { Language, LanguageName } from "@/types/translate.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getLanguageName = (language: Language): LanguageName => {
  switch (language) {
    case Language.EN:
      return "English";
    case Language.KA:
      return "Georgian";
  }
};
