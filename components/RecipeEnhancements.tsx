"use client";

import { useState } from "react";
import type { Locale } from "@/lib/types";

export default function RecipeEnhancements({ locale, name }: { locale: Locale; name: string }) {
  const [shareMessage, setShareMessage] = useState("");
  const [mixingMode, setMixingMode] = useState(false);

  const startMixing = () => {
    setMixingMode(true);
    document.querySelector(".steps")?.scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelector(".steps")?.classList.add("steps-focus");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage(locale === "th" ? "คัดลอกลิงก์แล้ว" : "Recipe link copied");
    } catch {
      setShareMessage(locale === "th" ? "คัดลอกลิงก์ไม่สำเร็จ" : "Could not copy link");
    }
    window.setTimeout(() => setShareMessage(""), 2200);
  };

  const stopMixing = () => {
    setMixingMode(false);
    document.querySelector(".steps")?.classList.remove("steps-focus");
  };

  return (
    <div className="recipe-toolbar" aria-label={locale === "th" ? "เครื่องมือสูตร" : "Recipe tools"}>
      <div className="recipe-toolbar-copy">
        <span className="recipe-toolbar-kicker">{locale === "th" ? "ถึงเวลาลงมือ" : "YOUR NEXT POUR"}</span>
        <span className="recipe-toolbar-title">{locale === "th" ? "พร้อมผสมแก้วนี้หรือยัง?" : "Ready to make this one?"}</span>
      </div>
      <div className="recipe-toolbar-actions">
        <button type="button" className="recipe-start" onClick={mixingMode ? stopMixing : startMixing}>
          <span aria-hidden="true">{mixingMode ? "✓" : "↘"}</span>
          {mixingMode ? (locale === "th" ? "โหมดผสมเปิดอยู่" : "Mixing mode on") : (locale === "th" ? "เริ่มผสม" : "Start mixing")}
        </button>
        <button type="button" className="recipe-share" onClick={copyLink}>
          <span aria-hidden="true">↗</span> {locale === "th" ? "แชร์สูตร" : "Share"}
        </button>
      </div>
      {shareMessage && <span className="recipe-share-feedback" role="status">{shareMessage}</span>}
      <span className="sr-only">{locale === "th" ? `สูตร ${name}` : `Recipe: ${name}`}</span>
    </div>
  );
}
