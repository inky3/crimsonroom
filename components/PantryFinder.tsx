"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CocktailCard from "@/components/CocktailCard";
import { cocktails } from "@/data/cocktails";
import { pantryGroups, pantryNeeds, type Need, type PantryKey } from "@/data/pantry";
import { pick, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { toCard } from "@/lib/view";

type ShakerFilter = "any" | "required" | "no";
type MatchMode = "all" | "some";
const STORAGE_KEY = "crimson-room-pantry-filters-v1";
const DEFAULT_INGREDIENTS: PantryKey[] = ["gin", "rum-white", "rum-aged", "vodka", "lime"];

export default function PantryFinder({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<PantryKey[]>(DEFAULT_INGREDIENTS);
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [shaker, setShaker] = useState<ShakerFilter>("any");
  const [match, setMatch] = useState<MatchMode>("all");
  const [surprise, setSurprise] = useState<(typeof cocktails)[number] | null>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [shakeFrame, setShakeFrame] = useState(0);
  const shakeTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastShakeAt = useRef(0);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { selected?: unknown; shaker?: unknown; match?: unknown };
        const validKeys = new Set(pantryGroups.flatMap((group) => group.items.map((item) => item.key)));
        if (Array.isArray(parsed.selected)) setSelected(parsed.selected.filter((key): key is PantryKey => typeof key === "string" && validKeys.has(key as PantryKey)));
        if (parsed.shaker === "any" || parsed.shaker === "required" || parsed.shaker === "no") setShaker(parsed.shaker);
        if (parsed.match === "all" || parsed.match === "some") setMatch(parsed.match);
      }
    } catch { /* Keep defaults if saved preferences are unavailable or invalid. */ }
    finally { setPreferencesReady(true); }
  }, []);

  useEffect(() => {
    if (!preferencesReady) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected, shaker, match })); }
    catch { /* The finder still works if storage is disabled or full. */ }
  }, [selected, shaker, match, preferencesReady]);

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

  const pickRandomDrink = useCallback(() => {
    if (recipeResults.length === 0) return;
    const chosen = recipeResults[Math.floor(Math.random() * recipeResults.length)];
    setSurprise(chosen.cocktail);
    setShakeFrame((frame) => frame + 1);
  }, [recipeResults]);

  const startShakeReveal = useCallback(() => {
    if (recipeResults.length === 0 || shaking) return;
    setShaking(true);
    const firstPick = recipeResults[Math.floor(Math.random() * recipeResults.length)];
    setSurprise(firstPick.cocktail);
    setShakeFrame((frame) => frame + 1);
    let swings = 0;
    if (shakeTimer.current) window.clearInterval(shakeTimer.current);
    shakeTimer.current = window.setInterval(() => {
      swings += 1;
      setShakeFrame((frame) => frame + 1);
      if (swings >= 5) {
        if (shakeTimer.current) window.clearInterval(shakeTimer.current);
        shakeTimer.current = null;
        const chosen = recipeResults[Math.floor(Math.random() * recipeResults.length)];
        setSurprise(chosen.cocktail);
        setShaking(false);
      }
    }, 260);
  }, [recipeResults, shaking]);

  useEffect(() => () => {
    if (shakeTimer.current) window.clearInterval(shakeTimer.current);
  }, []);

  const enableMotion = async () => {
    const motionEvent = DeviceMotionEvent as typeof DeviceMotionEvent & { requestPermission?: () => Promise<"granted" | "denied"> };
    if (typeof motionEvent.requestPermission === "function") {
      try { setMotionEnabled((await motionEvent.requestPermission()) === "granted"); }
      catch { setMotionEnabled(false); }
    } else { setMotionEnabled("DeviceMotionEvent" in window); }
  };

  useEffect(() => {
    if (!("DeviceMotionEvent" in window)) return;
    setMotionEnabled(true);
  }, []);

  useEffect(() => {
    if (!motionEnabled) return;
    let lastTrigger = 0;
    let previousMagnitude = 0;
    const handleMotion = (event: DeviceMotionEvent) => {
      const a = event.acceleration;
      const g = event.accelerationIncludingGravity;
      const magnitude = a
        ? Math.sqrt((a.x ?? 0) ** 2 + (a.y ?? 0) ** 2 + (a.z ?? 0) ** 2)
        : g ? Math.sqrt((g.x ?? 0) ** 2 + (g.y ?? 0) ** 2 + (g.z ?? 0) ** 2) : 0;
      const now = Date.now();
      const delta = Math.abs(magnitude - previousMagnitude);
      previousMagnitude = magnitude;
      if ((magnitude > 10 || delta > 7) && now - lastTrigger > 2400) {
        lastTrigger = now;
        startShakeReveal();
      }
    };
    window.addEventListener("devicemotion", handleMotion, { passive: true });
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [motionEnabled, startShakeReveal]);

  const toggle = (key: PantryKey) => setSelected((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  const reset = () => { setSelected(DEFAULT_INGREDIENTS); setShaker("any"); setMatch("all"); };
  const cardItems = recipeResults.map(({ cocktail }) => toCard(cocktail, locale));

  return (
    <main className="container section pantry-finder">
      <p className="pantry-kicker">{locale === "en" ? "YOUR HOME BAR" : "บาร์ที่บ้านของคุณ"}</p>
      <h1 className="page-title">{locale === "en" ? "What can I make?" : "มีอะไร ทำเมนูอะไรได้บ้าง?"}</h1>
      <p className="pantry-intro">{locale === "en" ? "Pick what’s on your shelf. Find your next pour." : "เลือกวัตถุดิบที่มี แล้วค้นหาแก้วถัดไปของคุณ"}</p>

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
            <details className="pantry-group" key={group.key} open={group.key === "spirits"}>
              <summary className="pantry-group-summary"><span className="pantry-group-title">{pick(group.title, locale)}</span><span className="pantry-group-meta">{group.items.filter((item) => selected.includes(item.key)).length > 0 && <span className="pantry-group-selected">{group.items.filter((item) => selected.includes(item.key)).length} {locale === "en" ? "selected" : "รายการ"}</span>}<span className="pantry-group-chevron" aria-hidden="true">⌄</span></span></summary>
              <div className="pantry-options">
                {group.items.map((item) => {
                  const active = selected.includes(item.key);
                  return <button type="button" key={item.key} className="pantry-chip" aria-pressed={active} onClick={() => toggle(item.key)}>
                    <span className="pantry-chip-mark" aria-hidden="true">{active ? "✓" : "+"}</span>{pick(item.label, locale)}
                  </button>;
                })}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="pantry-controls" aria-label={locale === "en" ? "Recipe filters" : "ตัวกรองสูตร"}>
        <div className="pantry-control">
          <span className="pantry-control-label">{locale === "en" ? "How are we mixing?" : "เลือกวิธีผสม"}</span>
          <div className="pantry-segmented" role="group" aria-label={locale === "en" ? "Shaker filter" : "ตัวกรองเชคเกอร์"}>
            <button type="button" className="pantry-method" aria-pressed={shaker === "any"} onClick={() => setShaker("any")}><span aria-hidden="true">🍸</span><span>{locale === "en" ? "Any" : "ทั้งหมด"}</span></button>
            <button type="button" className="pantry-method" aria-pressed={shaker === "required"} onClick={() => setShaker("required")}><span aria-hidden="true">🧊</span><span>{locale === "en" ? "Shake" : "เขย่า"}</span></button>
            <button type="button" className="pantry-method" aria-pressed={shaker === "no"} onClick={() => setShaker("no")}><span aria-hidden="true">🥄</span><span>{locale === "en" ? "No shaker" : "ไม่ใช้เชคเกอร์"}</span></button>
          </div>
        </div>
        <div className="pantry-control">
          <span className="pantry-control-label">{locale === "en" ? "Show me" : "แสดงเมนู"}</span>
          <div className="pantry-segmented pantry-segmented-match" role="group" aria-label={locale === "en" ? "Ingredient matching" : "การจับคู่วัตถุดิบ"}>
            <button type="button" className="pantry-method" aria-pressed={match === "all"} onClick={() => setMatch("all")}><span aria-hidden="true">✓</span><span>{locale === "en" ? "Can make now" : "ทำได้เลย"}</span></button>
            <button type="button" className="pantry-method" aria-pressed={match === "some"} onClick={() => setMatch("some")}><span aria-hidden="true">＋</span><span>{locale === "en" ? "Almost there" : "ขาดอีกนิด"}</span></button>
          </div>
        </div>
      </section>

      <section className="pantry-surprise-bar" aria-label={locale === "en" ? "Random cocktail" : "สุ่มค็อกเทล"}>
        <div className="pantry-surprise-copy"><span className="pantry-surprise-icon" aria-hidden="true">✦</span><div><strong>{locale === "en" ? "Feeling lucky?" : "อยากลองอะไรใหม่ ๆ ไหม?"}</strong><p>{locale === "en" ? "Shake your phone or let the bar choose." : "เขย่าโทรศัพท์ หรือให้บาร์เลือกให้"}</p></div></div>
        <div className="pantry-surprise-actions">
          <button type="button" className="pantry-shake-button" onClick={enableMotion}>{motionEnabled ? (locale === "en" ? "Shake enabled" : "เปิดการเขย่าแล้ว") : (locale === "en" ? "Enable shake" : "เปิดการเขย่า")}</button>
          <button type="button" className="pantry-surprise-button" onClick={startShakeReveal}>{locale === "en" ? "Shake to choose ↗" : "เขย่าเพื่อสุ่ม ↗"}</button>
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
                  <strong>{locale === "en" ? "Still needed:" : "ยังต้องมี:"}</strong>{" "}
                  {missing.map((need: Need) => {
                    const options = Array.isArray(need) ? need : [need];
                    return options.map((key) => availableLabels.get(key) ?? key).join(locale === "en" ? " or " : " หรือ ");
                  }).join(", ")}
                </div>}
                {match === "some" && missing.length === 0 && <p className="pantry-ready">✓ {locale === "en" ? "Ready to mix" : "พร้อมผสมแล้ว"}</p>}
              </article>;
            })}
          </div>
        )}
      </section>
      {surprise && <div className="pantry-modal-backdrop" role="presentation" onClick={() => setSurprise(null)}>
        <section key={shakeFrame} className={`pantry-surprise-modal ${shaking ? "pantry-shaker-active" : "pantry-glass-shake"}`} role="dialog" aria-modal="true" aria-labelledby="pantry-surprise-title" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="pantry-modal-close" aria-label={locale === "en" ? "Close" : "ปิด"} onClick={() => setSurprise(null)}>×</button>
          <div className="pantry-shaker-illustration" aria-hidden="true"><span className="pantry-shaker-cap" /><span className="pantry-shaker-body"><i /><i /><i /></span><span className="pantry-shaker-base" /></div><span className="pantry-surprise-eyebrow">{shaking ? (locale === "en" ? "SHAKING UP YOUR NEXT DRINK" : "กำลังเขย่าสุ่มเมนู") : (locale === "en" ? "THE BAR HAS CHOSEN" : "บาร์เลือกให้คุณแล้ว")}</span>
          <h2 id="pantry-surprise-title">{shaking ? (locale === "en" ? "Mixing your options…" : "กำลังเลือกเมนู…") : pick(surprise.name, locale)}</h2>
          {!shaking && <p className="pantry-surprise-base">{toCard(surprise, locale).baseLabel}</p>}
          {!shaking && <p className="pantry-surprise-description">{locale === "en" ? "This drink matches your current ingredients and filters." : "เมนูนี้ตรงกับวัตถุดิบและตัวกรองที่คุณเลือก"}</p>}
          {!shaking && <div className="pantry-modal-actions">
            <button type="button" className="pantry-surprise-button" onClick={() => router.push(`/${locale}/cocktails/${surprise.slug}`)}>{locale === "en" ? "Let’s try" : "ลองทำแก้วนี้"}</button>
            <button type="button" className="pantry-not-now" onClick={() => setSurprise(null)}>{locale === "en" ? "Not interested" : "ไม่สนใจ"}</button>
          </div>}
        </section>
      </div>}
    </main>
  );
}
