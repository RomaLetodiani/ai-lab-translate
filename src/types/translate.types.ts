export enum Language {
  EN = "EN",
  KA = "KA",
}

export type TranslateProps = {
  text: string;
  sourceLanguage: Language;
  targetLanguage: Language;
};

export type LanguageName = "English" | "Georgian";

export type TranslationHistoryItem = {
  input: string;
  output: string;
  timestamp: number;
  sourceLang: Language;
  targetLang: Language;
};
