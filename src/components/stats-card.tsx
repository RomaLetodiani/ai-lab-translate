"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getLanguageName } from "@/lib/utils";
import { Language } from "@/types/translate.types";
import { BarChart2, BookOpen, Clock } from "lucide-react";

interface StatsCardProps {
  totalTranslations: number;
  sourceLang: Language;
  lastTranslationTime?: number;
  characterCount: {
    input: number;
    output: number;
  };
}

export function StatsCard({
  totalTranslations,
  sourceLang,
  lastTranslationTime,
  characterCount,
}: StatsCardProps) {
  const targetLang = sourceLang === "ka" ? "en" : "ka";

  const getTimeSince = (timestamp?: number) => {
    if (!timestamp) return "Never";

    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart2 className="h-4 w-4" />
          Translation Stats
        </CardTitle>
        <CardDescription>Your translation activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-md p-3 flex flex-col">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs">Total Translations</span>
            </div>
            <div className="text-lg font-bold">{totalTranslations}</div>
          </div>

          <div className="border rounded-md p-3 flex flex-col">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Last Translation</span>
            </div>
            <div className="text-sm font-medium truncate">{getTimeSince(lastTranslationTime)}</div>
          </div>

          <div className="border rounded-md p-3 col-span-2">
            <div className="text-xs text-muted-foreground mb-1">Character Count</div>
            <div className="flex justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Input</div>
                <div className="font-medium">{characterCount.input}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Output</div>
                <div className="font-medium">{characterCount.output}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
