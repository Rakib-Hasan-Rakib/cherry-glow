"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    setLang(navigator.language.startsWith("bn") ? "BN" : "EN");
  }, []);

  return (
    <Button variant="ghost" size="icon">
      {lang}
    </Button>
  );
}
