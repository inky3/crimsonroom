"use client";

import { useState } from "react";
import type { Locale } from "@/lib/types";

export default function RecipeEnhancements({ locale, name }: { locale: Locale; name: string }) {
  const [checked, setChecked] = useState<number[]>([]);
  const [servings, setServings] = useState(1);
  const [shareMessage, setShareMessage] = useState("");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage(locale === "th" ? "คัดลอกลิงก์แล้ว" : "Recipe link copied");
    } catch {
      setShareMessage(locale === "th" ? "คัดลอกลิงก์ไม่สำเร็จ" : "Could not copy link");
    }
    window.setTimeout(() => setShareMessage(""), 2200);
  };

  return (
    <div className="recipe-toolbar" aria-label={locale === "th" ? "เครื่องมือสูตร" : "Recipe tools"}>
      <div className="recipe-toolbar-group">
        <span className="recipe-toolbar-label">{locale === "th" ? "จำนวนเสิร์ฟ" : "Servings"}</span>
        <div className="serving-stepper">
          <button type="button" aria-label="Decrease servings" disabled={servings <= 1} onClick={() => setServings((n) => Math.max(1, n - 1))}>−</button>
          <strong aria-live="polite">{servings}×</strong>
          <button type="button" aria-label="Increase servings" disabled={servings >= 8} onClick={() => setServings((n) => Math.min(8, n + 1))}>+</button>
        </div>
      </div>
      <span className="recipe-toolbar-hint">{locale === "th" ? "ใช้ช่องติ๊กเพื่อติดตามส่วนผสม" : "Tick ingredients as you prepare them"}</span>
      <button type="button" className="recipe-share" onClick={copyLink}>
        <span aria-hidden="true">↗</span> {locale === "th" ? "แชร์สูตร" : "Share recipe"}
      </button>
      {shareMessage && <span className="recipe-share-feedback" role="status">{shareMessage}</span>}
      <span className="sr-only">{locale === "th" ? `สูตร ${name}` : `Recipe: ${name}`}</span>
      <RecipeChecklistBridge checked={checked} setChecked={setChecked} />
    </div>
  );
}

function RecipeChecklistBridge({ checked, setChecked }: { checked: number[]; setChecked: (value: number[]) => void }) {
  // This state is intentionally shared through a lightweight custom event with the ingredient list.
  return (
    <button type="button" className="recipe-check-reset" onClick={() => { setChecked([]); window.dispatchEvent(new Event("recipe-check-reset")); }}>
      Reset ingredient checks
    </button>
  );
}
