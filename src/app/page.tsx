"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { translate } from "@/actions/translate.actions";
import { Language } from "@/types/translate.types";
import { getLanguageName } from "@/lib/utils";

const Home = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sourceLang, setSourceLang] = useState<Language>("ka");
  const [history, setHistory] = useState<{ input: string; output: string }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("translationHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleTranslate = async () => {
    const from = sourceLang;
    const to = sourceLang === "ka" ? "en" : "ka";

    const result = await translate({ text: input, sourceLanguage: from, targetLanguage: to });
    setOutput(result || "");

    const newHistory = [{ input, output: result }, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("translationHistory", JSON.stringify(newHistory));
  };

  return (
    <main className="flex-1 w-full max-w-xl mx-auto py-10 px-8 space-y-4">
      <div className="flex justify-between gap-5 flex-wrap items-center">
        <h1 className="text-2xl font-bold">Geo↔Eng Translator</h1>
        <Button onClick={() => setSourceLang(sourceLang === "ka" ? "en" : "ka")}>
          {getLanguageName(sourceLang)} → {getLanguageName(sourceLang === "ka" ? "en" : "ka")}
        </Button>
      </div>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Enter text in ${getLanguageName(sourceLang)}`}
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
};

export default Home;
