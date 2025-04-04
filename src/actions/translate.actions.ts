"use server";

import { env } from "@/env";
import { OpenAI } from "openai";
import { TranslateProps } from "@/types/translate.types";
import { translateSystemPrompt, getTranslateUserPrompt } from "@/prompts/translate.prompts";
import { ChatCompletion } from "openai/resources/index.mjs";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  baseURL: env.OPENAI_BASE_URL,
});

export const translate = async ({ text, sourceLanguage, targetLanguage }: TranslateProps) => {
  const completion = await openai.chat.completions.create({
    model: "tbilisi-ai-lab-2.0",
    temperature: 0,
    frequency_penalty: 0,
    messages: [
      {
        role: "system",
        content: translateSystemPrompt,
      },
      {
        role: "user",
        content: getTranslateUserPrompt({ text, sourceLanguage, targetLanguage }),
      },
    ],
  });

  return processCompletion(completion);
};

const processCompletion = (completion: ChatCompletion) => {
  try {
    const content = completion.choices[0].message.content;

    const cleanedContent = content?.replace(/```json\n/, "").replace(/\n```/, "") || "";

    const result = JSON.parse(cleanedContent);

    const parsedResult = textZodSchema.parse(result);

    return parsedResult.text;
  } catch (error) {
    throw new Error(`Failed to parse AI response: ${error}`);
  }
};

const textZodSchema = z.object({
  text: z.string(),
});
