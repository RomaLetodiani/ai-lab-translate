**Step-by-step guide for building your Georgian-English translation site using**:

- **Next.js (App Router)**
- **Tailwind CSS + ShadCN UI**
- **OpenAI SDK** to connect to Georgian First LLM
- **Server Actions** (instead of API routes)
- **LocalStorage** for translation history
- **Cursor IDE**

---

## 🧰 Final Stack Overview

| Layer   | Tech                                   |
| ------- | -------------------------------------- |
| UI      | Next.js App Router + Tailwind + ShadCN |
| Server  | Server Actions                         |
| AI      | Georgian First LLM via OpenAI SDK      |
| Storage | `localStorage` on client               |
| IDE     | [Cursor](https://www.cursor.so/)       |

---

## 🧭 Step-by-Step Setup in Cursor IDE

```bash
npx shadcn-ui@latest add button textarea select switch card tooltip toast skeleton badge avatar
```

---

### **3. Install OpenAI SDK**

```bash
npm install openai
```

Create an `.env.local`:

```env
OPENAI_API_KEY=your-georgian-llm-key
OPENAI_BASE_URL=https://your-llm-server.com/v1
```

---

### **4. Set Up Server Action (`app/actions/translate.ts`)**

```ts
// app/actions/translate.ts
"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_BASE_URL, // Georgian LLM endpoint
});

export async function translateText(input: string, sourceLang: string, targetLang: string) {
  const prompt = `Translate from ${sourceLang} to ${targetLang}: ${input}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // or your LLM model ID
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}
```

---

### **5. Build the UI (`app/page.tsx`)**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { translateText } from "./actions/translate";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sourceLang, setSourceLang] = useState<"Georgian" | "English">("Georgian");
  const [history, setHistory] = useState<{ input: string; output: string }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("translationHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleTranslate = async () => {
    const from = sourceLang;
    const to = sourceLang === "Georgian" ? "English" : "Georgian";

    const result = await translateText(input, from, to);
    setOutput(result || "");

    const newHistory = [{ input, output: result }, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("translationHistory", JSON.stringify(newHistory));
  };

  return (
    <main className="max-w-xl mx-auto py-10 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Geo↔Eng Translator</h1>
        <Button onClick={() => setSourceLang(sourceLang === "Georgian" ? "English" : "Georgian")}>
          {sourceLang} → {sourceLang === "Georgian" ? "English" : "Georgian"}
        </Button>
      </div>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Enter text in ${sourceLang}`}
      />

      <Button onClick={handleTranslate}>Translate</Button>

      <Textarea value={output} readOnly placeholder="Translated text will appear here" />

      <div>
        <h2 className="text-lg font-semibold mt-6">History</h2>
        <ul className="space-y-2 mt-2">
          {history.map((item, idx) => (
            <li key={idx} className="border p-2 rounded text-sm bg-gray-100">
              <strong>Input:</strong> {item.input}
              <br />
              <strong>Output:</strong> {item.output}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
```

---

## ✅ Features Summary

- ✍️ Translate Geo ↔ Eng using your own LLM
- 🌐 Minimal, responsive UI with ShadCN and Tailwind
- 🧠 Translation logic uses Server Actions (no API route)
- 🧩 Translation history saved in browser via `localStorage`

---

## 🧱 Folder Structure (simplified)

```
app/
│
├── page.tsx           ← main UI
├── actions/
│   └── translate.ts   ← server action for translation
├── components/        ← ShadCN UI components
```
