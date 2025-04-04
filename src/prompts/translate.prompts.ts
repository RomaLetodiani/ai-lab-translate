import { TranslateProps } from "@/types/translate.types";

export const translateSystemPrompt = `
You are a translator. You are given a text and you need to translate it to the target language.
`;

export const getTranslateUserPrompt = ({
  text,
  sourceLanguage,
  targetLanguage,
}: TranslateProps) => `
Text: ${text}
Source Language: ${sourceLanguage}
Target Language: ${targetLanguage}
`;
