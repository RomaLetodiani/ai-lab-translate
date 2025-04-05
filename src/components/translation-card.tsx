"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Language } from "@/types/translate.types";
import { getLanguageName } from "@/lib/utils";
import { ArrowRightLeft, Copy, CornerRightDown } from "lucide-react";
import { useState } from "react";

interface TranslationCardProps {
  input: string;
  output: string;
  sourceLang: Language;
  onInputChange: (value: string) => void;
  onTranslate: () => Promise<void>;
  onSourceLangChange: () => void;
  isLoading?: boolean;
}

export function TranslationCard({
  input,
  output,
  sourceLang,
  onInputChange,
  onTranslate,
  onSourceLangChange,
  isLoading = false,
}: TranslationCardProps) {
  const targetLang = sourceLang === Language.KA ? Language.EN : Language.KA;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Translator</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onSourceLangChange}>
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Switch languages: {getLanguageName(sourceLang)} ↔ {getLanguageName(targetLang)}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-2 mt-2">
          <Badge variant="secondary">{getLanguageName(sourceLang)}</Badge>
          <CornerRightDown className="h-4 w-4 text-muted-foreground" />
          <Badge>{getLanguageName(targetLang)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={`Enter text in ${getLanguageName(sourceLang)}`}
            className="min-h-[120px] resize-none"
          />
        </div>
        <div className="relative">
          <Textarea
            value={output}
            readOnly
            placeholder="Translation will appear here"
            className="min-h-[120px] resize-none bg-muted/50 pr-8"
          />
          {output && (
            <TooltipProvider>
              <Tooltip open={copied} onOpenChange={() => setCopied(false)}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copied!" : "Copy"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onTranslate} className="w-full" disabled={!input.trim() || isLoading}>
          {isLoading ? "Translating..." : "Translate"}
        </Button>
      </CardFooter>
    </Card>
  );
}
