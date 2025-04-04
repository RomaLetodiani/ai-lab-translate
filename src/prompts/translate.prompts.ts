import { TranslateProps } from "@/types/translate.types";

export const translateSystemPrompt = `
You are a translator. You are given a text and you need to translate it to the target language.

You need to return the text in the target language.

You need to return JSON with the following structure:
{
  "text": "translated text"
}
`;

export const getTranslateUserPrompt = ({
  text,
  sourceLanguage,
  targetLanguage,
}: TranslateProps) => `
Text: ${text}
Source Language: ${sourceLanguage}
Target Language: ${targetLanguage}

You need to return the text in the target language.

You need to return JSON with the following structure:
{
  "text": "translated text"
}
`;
