"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import CocktailCard from "./CocktailCard";
import type { CardData } from "@/lib/view";
import type { Locale, SpiritKey, TasteKey } from "@/lib/types";

type Labels = {
  searchLabel: string;
  searchPlaceholder: string;
  baseLabel: string;
  allBases: string;
  sortBy: string;
  sortName: string;
  sortSweet: string;
  sortSour: string;
  sortBitter: string;
  sortRough: string;
  sortStrength: string;
  drinks: string;
  noResults: string;
  clearFilters: string;
};

type Sort = "name" | TasteKey;

export default function Browse({
  items,
  labels,
  locale,
}: {
  items: CardData[];
  labels: Labels;
  locale: Locale;
}) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [base, setBase] = useState<SpiritKey | "all">("all");
  const [sort, setSort] = useState<Sort>("name");
  const [restored, setRestored] = useState(false);
  const storageKey = "browse-state:" + pathname;

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const state = JSON.parse(saved) as { query?: string; base?: SpiritKey | "all"; sort?: Sort };
        if (typeof state.query === "string") setQuery(state.query);
        if (typeof state.base === "string" && (state.base === "all" || items.some((item) => item.baseKey === state.base))) setBase(state.base);
        if (typeof state.sort === "string" && ["name", "sweet", "sour", "bitter", "rough", "strength"].includes(state.sort)) setSort(state.sort as Sort);
      }
    } catch { /* Ignore unavailable or invalid saved state. */ }
    setRestored(true);
  }, [storageKey, items]);

  useEffect(() => {
    if (!restored) return;
    try { sessionStorage.setItem(storageKey, JSON.stringify({ query, base, sort })); } catch { /* Filtering still works without storage. */ }
  }, [storageKey, query, base, sort, restored]);

  // Only offer base spirits that exist in this list.
  const bases = useMemo(() => {
    const seen = new Map<SpiritKey, string>();
    items.forEach((i) => seen.set(i.baseKey, i.baseLabel));
    return Array.from(seen, ([key, label]) => ({ key, label }));
  }, [items]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = items.filter(
      (i) => (base === "all" || i.baseKey === base) && (!q || i.search.includes(q)),
    );
    return [...list].sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name, locale) : b.taste[sort] - a.taste[sort] || a.name.localeCompare(b.name, locale),
    );
  }, [items, query, base, sort, locale]);

  const filtered = query !== "" || base !== "all" || sort !== "name";
  const reset = () => {
    setQuery("");
    setBase("all");
    setSort("name");
  };

  return (
    <section aria-label="Browse">
      <div className="filters">
        <label className="field">
          <span>{labels.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
          />
        </label>
        <label className="field">
          <span>{labels.sortBy}</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="name">{labels.sortName}</option>
            <option value="sweet">{labels.sortSweet}</option>
            <option value="sour">{labels.sortSour}</option>
            <option value="bitter">{labels.sortBitter}</option>
            <option value="rough">{labels.sortRough}</option>
            <option value="strength">{labels.sortStrength}</option>
          </select>
        </label>
      </div>

      <div className="chips" role="group" aria-label={labels.baseLabel}>
        <button type="button" aria-pressed={base === "all"} onClick={() => setBase("all")}>
          {labels.allBases}
        </button>
        {bases.map((b) => (
          <button key={b.key} type="button" aria-pressed={base === b.key} onClick={() => setBase(b.key)}>
            {b.label}
          </button>
        ))}
      </div>

      <p className="count" aria-live="polite">
        {shown.length} {labels.drinks}
        {filtered && (
          <button type="button" className="link-btn" onClick={reset}>
            {labels.clearFilters}
          </button>
        )}
      </p>

      {shown.length === 0 ? (
        <p className="empty">{labels.noResults}</p>
      ) : (
        <div className="grid">
          {shown.map((item) => (
            <CocktailCard key={item.slug} item={item} locale={locale} />
          ))}
        </div>
      )}
    </section>
  );
}
