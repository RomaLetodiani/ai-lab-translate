"use client";

import { useLanguage } from "@/contexts/lang.context";
import { Button } from "./ui/button";

export const LangToggler = () => {
  const { toggleLang, t } = useLanguage();
  return (
    <Button
      aria-label="button to toggle Lang"
      onClick={toggleLang}
      className="flex min-w-10 items-center justify-center font-bold  transition-colors "
    >
      {t("langToggler")}
    </Button>
  );
};
