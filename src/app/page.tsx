"use client";

import { useState, useEffect } from "react";
import { TranslationCard } from "@/components/translation-card";
import { HistoryList } from "@/components/history-list";
import { StatsCard } from "@/components/stats-card";
import { translate } from "@/actions/translate.actions";
import { Language, TranslationHistoryItem } from "@/types/translate.types";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { LangToggler } from "@/components/lang-toggler";
import { useLanguage } from "@/contexts/lang.context";

const Home = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sourceLang, setSourceLang] = useState<Language>(Language.KA);
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const { t } = useLanguage();

  // Stats data
  const [stats, setStats] = useState({
    totalTranslations: 0,
    lastTranslationTime: undefined as number | undefined,
    characterCount: {
      input: 0,
      output: 0,
    },
    wordCount: {
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
    const totalWordsInput = historyItems.reduce(
      (sum, item) => sum + item.input.split(" ").length,
      0
    );
    const totalWordsOutput = historyItems.reduce(
      (sum, item) => sum + item.output.split(" ").length,
      0
    );

    setStats({
      totalTranslations: historyItems.length,
      lastTranslationTime: lastTime,
      characterCount: {
        input: totalCharsInput,
        output: totalCharsOutput,
      },
      wordCount: {
        input: totalWordsInput,
        output: totalWordsOutput,
      },
    });
  };

  const handleTranslate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const from = sourceLang;
      const to = sourceLang === Language.KA ? Language.EN : Language.KA;

      const result = await translate({ text: input, sourceLanguage: from, targetLanguage: to });
      setOutput(result || "");

      // Create history item with timestamp
      const newHistoryItem = {
        input,
        output: result,
        timestamp: Date.now(),
        sourceLang,
        targetLang: to,
      };

      // Update history (max 10 items)
      const newHistory = [newHistoryItem, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem("translationHistory", JSON.stringify(newHistory));

      // Update stats
      updateStatsFromHistory(newHistory);

      toast.success(t("translationCompleted"));
    } catch (error) {
      console.error("Translation error:", error);
      toast.error(t("translationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSourceLangChange = () => {
    setSourceLang(sourceLang === Language.KA ? Language.EN : Language.KA);
    setInput("");
    setOutput("");
  };

  const handleHistoryItemSelect = (item: TranslationHistoryItem) => {
    setInput(item.input);
    setOutput(item.output);
    setSourceLang(item.sourceLang);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("translationHistory");
    updateStatsFromHistory([]);
    toast.info(t("translationHistoryCleared"));
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
          <StatsCard {...stats} />
        </div>
      </div>

      <HistoryList
        history={history}
        onHistoryItemSelect={handleHistoryItemSelect}
        onClearHistory={handleClearHistory}
      />

      <Toaster position="bottom-right" />

      <div className="absolute top-5 right-5">
        <LangToggler />
      </div>
    </main>
  );
};

export default Home;
