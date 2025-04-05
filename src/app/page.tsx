"use client";

import { useState, useEffect } from "react";
import { TranslationCard } from "@/components/translation-card";
import { HistoryList } from "@/components/history-list";
import { StatsCard } from "@/components/stats-card";
import { translate } from "@/actions/translate.actions";
import { Language } from "@/types/translate.types";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface TranslationHistoryItem {
  input: string;
  output: string;
  timestamp: number;
}

const Home = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sourceLang, setSourceLang] = useState<Language>("ka");
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Stats data
  const [stats, setStats] = useState({
    totalTranslations: 0,
    lastTranslationTime: undefined as number | undefined,
    characterCount: {
      input: 0,
      output: 0,
    },
  });

  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("translationHistory");
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);

        // Initialize stats
        if (parsedHistory.length > 0) {
          updateStatsFromHistory(parsedHistory);
        }
      }
      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading translation history:", error);
      setIsInitialized(true);
    }
  }, []);

  const updateStatsFromHistory = (historyItems: TranslationHistoryItem[]) => {
    const totalCharsInput = historyItems.reduce((sum, item) => sum + item.input.length, 0);
    const totalCharsOutput = historyItems.reduce((sum, item) => sum + item.output.length, 0);
    const lastTime = historyItems.length > 0 ? historyItems[0].timestamp : undefined;

    setStats({
      totalTranslations: historyItems.length,
      lastTranslationTime: lastTime,
      characterCount: {
        input: totalCharsInput,
        output: totalCharsOutput,
      },
    });
  };

  const handleTranslate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const from = sourceLang;
      const to = sourceLang === "ka" ? "en" : "ka";

      const result = await translate({ text: input, sourceLanguage: from, targetLanguage: to });
      setOutput(result || "");

      // Create history item with timestamp
      const newHistoryItem = {
        input,
        output: result,
        timestamp: Date.now(),
      };

      // Update history (max 10 items)
      const newHistory = [newHistoryItem, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem("translationHistory", JSON.stringify(newHistory));

      // Update stats
      updateStatsFromHistory(newHistory);

      toast.success("Translation completed!");
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Translation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSourceLangChange = () => {
    setSourceLang(sourceLang === "ka" ? "en" : "ka");
    setInput("");
    setOutput("");
  };

  const handleHistoryItemSelect = (item: TranslationHistoryItem) => {
    setInput(item.input);
    setOutput(item.output);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("translationHistory");
    updateStatsFromHistory([]);
    toast.info("Translation history cleared");
  };

  if (!isInitialized) {
    return (
      <main className="flex-1 w-full max-w-5xl mx-auto py-10 px-8 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold">Geo↔Eng Translator</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="md:col-span-2">
          <TranslationCard
            input={input}
            output={output}
            sourceLang={sourceLang}
            onInputChange={setInput}
            onTranslate={handleTranslate}
            onSourceLangChange={handleSourceLangChange}
            isLoading={isLoading}
          />
        </div>

        <div className="space-y-6">
          <StatsCard
            totalTranslations={stats.totalTranslations}
            sourceLang={sourceLang}
            lastTranslationTime={stats.lastTranslationTime}
            characterCount={stats.characterCount}
          />
        </div>
      </div>

      <HistoryList
        history={history}
        onHistoryItemSelect={handleHistoryItemSelect}
        onClearHistory={handleClearHistory}
        sourceLang={sourceLang}
      />

      <Toaster position="bottom-right" />
    </main>
  );
};

export default Home;
