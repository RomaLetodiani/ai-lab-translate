import { z } from "zod";

export const Lang = z.object({
  en: z.string(),
  ge: z.string(),
});

export type Lang = z.infer<typeof Lang>;

export type LangKey = keyof Lang;
