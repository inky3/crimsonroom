"use client";

import { useMemo, useState } from "react";
import CocktailCard from "@/components/CocktailCard";
import { cocktails } from "@/data/cocktails";
import { pantryGroups, pantryNeeds, type Need, type PantryKey } from "@/data/pantry";
import { pick, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { toCard } from "@/lib/view";

type ShakerFilter = "any" | "required" | "no";
type MatchMode = "all" | "some";

export default function PantryFinder({ locale }: { locale: Locale }) {
  const s = ui[locale];
  const [selected, setSelected] = useState<PantryKey[]>(["gin", "rum-white", "rum-aged", "vodka", "lime"]);
  const [shaker, setShaker] = useState<ShakerFilter>("any");
  const [match, setMatch] = useState<MatchMode>("all");
  const [showPantry, setShowPantry] = useState(true);

  const recipeResults = useMemo(() => {
    return cocktails.map((cocktail) => {
      const needs = pantryNeeds[cocktail.slug] ?? [];
      const missing = needs.filter((need) => {
        const options = Array.isArray(need) ? need : [need];
        return !options.some((key) => selected.includes(key));
      });
      return { cocktail, missing };
    }).filter(({ cocktail, missing }) => {
      if (shaker === "required" && !cocktail.tools.includes("shaker")) return false;
      if (shaker === "no" && cocktail.tools.includes("shaker")) return false;
      return match === "all" ? missing.length === 0 : true;
    }).sort((a, b) => a.missing.length - b.missing.length || pick(a.cocktail.name, locale).localeCompare(pick(b.cocktail.name, locale), locale));
  }, [selected, shaker, match, locale]);

  const availableLabels = useMemo(() => new Map(
    pantryGroups.flatMap((group) => group.items.map((item) => [item.key, pick(item.label, locale)] as const))
  ), [locale]);

  const toggle = (key: PantryKey) => setSelected((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  const reset = () => { setSelected([]); setShaker("any"); setMatch("all"); };
  const cardItems = recipeResults.map(({ cocktail }) => toCard(cocktail, locale));

  return (
    <main className="container section pantry-finder">
      <p className="pantry-kicker">{locale === "en" ? "YOUR HOME BAR" : "บาร์ที่บ้านของคุณ"}</p>
      <h1 className="page-title">{locale === "en" ? "What can I make?" : "มีอะไร ทำเมนูอะไรได้บ้าง?"}</h1>
      <p className="pantry-intro">{locale === "en" ? "Select what you have. We’ll match it against every recipe and show what you can make right now." : "เลือกวัตถุดิบที่มี แล้วเราจะเทียบกับทุกสูตรเพื่อแสดงเมนูที่ทำได้ตอนนี้"}</p>

      <section className="pantry-panel" aria-label={locale === "en" ? "Available ingredients" : "วัตถุดิบที่มี"}>
        <div className="pantry-panel-top">
          <div>
            <h2>{locale === "en" ? "Ingredients you have" : "วัตถุดิบที่มี"}</h2>
            <p className="muted">{locale === "en" ? "Choose all that apply. Ice, water, sugar and simple syrup are treated as staples." : "เลือกทั้งหมดที่มี โดยถือว่าน้ำแข็ง น้ำเปล่า น้ำตาล และไซรัปเป็นของพื้นฐานที่มีอยู่แล้ว"}</p>
          </div>
          <button type="button" className="link-btn" onClick={reset}>{locale === "en" ? "Reset all" : "ล้างทั้งหมด"}</button>
        </div>
        <div className="pantry-groups">
          {pantryGroups.map((group) => (
            <fieldset className="pantry-group" key={group.key}>
              <legend>{pick(group.title, locale)}</legend>
              <div className="pantry-options">
                {group.items.map((item) => {
                  const active = selected.includes(item.key);
                  return <button type="button" key={item.key} className="pantry-chip" aria-pressed={active} onClick={() => toggle(item.key)}>
                    <span className="pantry-chip-mark" aria-hidden="true">{active ? "✓" : "+"}</span>{pick(item.label, locale)}
                  </button>;
                })}
              </div>
            </fieldset>
          ))}
        </div>
        <button type="button" className="pantry-collapse" aria-expanded={showPantry} onClick={() => setShowPantry(!showPantry)}>
          {showPantry ? (locale === "en" ? "Hide ingredient list" : "ซ่อนรายการวัตถุดิบ") : (locale === "en" ? "Edit ingredients" : "แก้ไขวัตถุดิบ")}
        </button>
      </section>

      <section className="pantry-controls" aria-label={locale === "en" ? "Recipe filters" : "ตัวกรองสูตร"}>
        <div className="pantry-control">
          <label htmlFor="pantry-shaker">{locale === "en" ? "Shaker" : "เชคเกอร์"}</label>
          <select id="pantry-shaker" value={shaker} onChange={(e) => setShaker(e.target.value as ShakerFilter)}>
            <option value="any">{locale === "en" ? "Any method" : "ทุกวิธี"}</option>
            <option value="required">{locale === "en" ? "Shaker required" : "ต้องใช้เชคเกอร์"}</option>
            <option value="no">{locale === "en" ? "No shaker needed" : "ไม่ต้องใช้เชคเกอร์"}</option>
          </select>
        </div>
        <div className="pantry-control">
          <label htmlFor="pantry-match">{locale === "en" ? "Ingredient match" : "การจับคู่วัตถุดิบ"}</label>
          <select id="pantry-match" value={match} onChange={(e) => setMatch(e.target.value as MatchMode)}>
            <option value="all">{locale === "en" ? "I have everything" : "มีครบทุกอย่าง"}</option>
            <option value="some">{locale === "en" ? "Show missing ingredients too" : "แสดงเมนูที่ยังขาดวัตถุดิบ"}</option>
          </select>
        </div>
      </section>

      <section className="pantry-results" aria-live="polite">
        <div className="pantry-results-heading">
          <div>
            <h2>{locale === "en" ? "Your matches" : "เมนูที่ตรงกับวัตถุดิบ"}</h2>
            <p className="muted">{match === "all" ? (locale === "en" ? "Recipes you can make with your selection." : "สูตรที่ทำได้จากวัตถุดิบที่เลือก") : (locale === "en" ? "Closest matches first, with missing ingredients listed." : "เรียงเมนูที่ใกล้เคียงที่สุดก่อน พร้อมแสดงวัตถุดิบที่ขาด")}</p>
          </div>
          <span className="pantry-count">{recipeResults.length} {locale === "en" ? "recipes" : "เมนู"}</span>
        </div>
        {recipeResults.length === 0 ? (
          <div className="pantry-empty">
            <h3>{locale === "en" ? "No exact matches yet" : "ยังไม่มีเมนูที่ตรงกัน"}</h3>
            <p>{locale === "en" ? "Select more ingredients, or switch to “Show missing ingredients too” to find recipes you’re close to making." : "ลองเลือกวัตถุดิบเพิ่ม หรือเลือก “แสดงเมนูที่ยังขาดวัตถุดิบ” เพื่อดูสูตรที่ใกล้เคียง"}</p>
          </div>
        ) : (
          <div className="grid">
            {recipeResults.map(({ cocktail, missing }) => {
              const item = cardItems.find((card) => card.slug === cocktail.slug)!;
              return <article className="pantry-result" key={cocktail.slug}>
                <CocktailCard item={item} locale={locale} />
                {match === "some" && missing.length > 0 && <div className="pantry-missing">
                  <strong>{locale === "en" ? "Missing:" : "ยังขาด:"}</strong>{" "}
                  {missing.map((need: Need) => {
                    const options = Array.isArray(need) ? need : [need];
                    return options.map((key) => availableLabels.get(key) ?? key).join(locale === "en" ? " or " : " หรือ ");
                  }).join(", ")}
                </div>}
                {match === "some" && missing.length === 0 && <p className="pantry-ready">✓ {locale === "en" ? "You have everything" : "มีวัตถุดิบครบแล้ว"}</p>}
              </article>;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
