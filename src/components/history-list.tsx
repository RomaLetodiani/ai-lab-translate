"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getLanguageName } from "@/lib/utils";
import { ArrowUpCircle, RotateCcw, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { TranslationHistoryItem } from "@/types/translate.types";

interface HistoryListProps {
  history: TranslationHistoryItem[];
  onHistoryItemSelect: (item: TranslationHistoryItem) => void;
  onClearHistory: () => void;
}

export function HistoryList({ history, onHistoryItemSelect, onClearHistory }: HistoryListProps) {
  const [collapsed, setCollapsed] = useState(true);
  const displayItems = collapsed ? history.slice(0, 3) : history;

  if (history.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Translation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No translation history yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Translation History
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClearHistory}>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-md p-3 text-sm hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => onHistoryItemSelect(item)}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium">
                {getLanguageName(item.sourceLang)} → {getLanguageName(item.targetLang)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  onHistoryItemSelect(item);
                }}
              >
                <ArrowUpCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="line-clamp-1 text-muted-foreground mb-1">
              <span className="font-medium text-foreground">Input:</span> {item.input}
            </div>
            <div className="line-clamp-1 text-muted-foreground">
              <span className="font-medium text-foreground">Output:</span> {item.output}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {new Date(item.timestamp).toLocaleString()}
            </div>
          </div>
        ))}

        {history.length > 3 && (
          <div className="flex justify-center pt-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-all"
                checked={!collapsed}
                onCheckedChange={(checked) => setCollapsed(!checked)}
              />
              <label htmlFor="show-all" className="text-sm cursor-pointer">
                Show all ({history.length})
              </label>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
