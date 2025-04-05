"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/lang.context";
import { BarChart2, BookOpen, Clock } from "lucide-react";

interface StatsCardProps {
  totalTranslations: number;
  lastTranslationTime?: number;
  characterCount: {
    input: number;
    output: number;
  };
}

export function StatsCard({
  totalTranslations,
  lastTranslationTime,
  characterCount,
}: StatsCardProps) {
  const { t } = useLanguage();
  const getTimeSince = (timestamp?: number) => {
    if (!timestamp) return t("never");

    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return `${seconds} ${t("secondsAgo")}`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} ${t("minutesAgo")}`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ${t("hoursAgo")}`;
    return `${Math.floor(seconds / 86400)} ${t("daysAgo")}`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart2 className="h-4 w-4" />
          {t("translationsStats")}
        </CardTitle>
        <CardDescription>{t("yourTranslationActivity")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-md p-3 flex flex-col">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs">{t("totalTranslations")}</span>
            </div>
            <div className="text-lg font-bold">{totalTranslations}</div>
          </div>

          <div className="border rounded-md p-3 flex flex-col">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">{t("lastTranslationTime")}</span>
            </div>
            <div className="text-sm font-medium truncate">{getTimeSince(lastTranslationTime)}</div>
          </div>

          <div className="border rounded-md p-3 col-span-2">
            <div className="text-xs text-muted-foreground mb-1">{t("charactersCount")}</div>
            <div className="flex justify-between mt-2">
              <div>
                <div className="text-xs text-muted-foreground">{t("input")}</div>
                <div className="font-medium">{characterCount.input}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{t("output")}</div>
                <div className="font-medium">{characterCount.output}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
