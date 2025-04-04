import { z } from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
  OPENAI_BASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
