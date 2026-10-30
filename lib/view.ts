import { pick, ui } from "./i18n";
import { spirits } from "@/data/reference";
import type { Cocktail, GlassKey, Locale, SpiritKey, Taste, CategoryKey } from "./types";

/** The small, ready-to-display version of a cocktail used by lists and cards. */
export type CardData = {
  slug: string;
  name: string;
  /** English and Thai names together, so search works in either language. */
  search: string;
  baseKey: SpiritKey;
  baseLabel: string;
  category: CategoryKey;
  glass: GlassKey;
  color: string;
  garnishColor?: string;
  /** The exact garnish from the recipe, used to keep artwork accurate. */
  garnish: string;
  taste: Taste;
};

export function toCard(c: Cocktail, locale: Locale): CardData {
  return {
    slug: c.slug,
    name: pick(c.name, locale),
    search: `${c.name.en} ${c.name.th ?? ""}`.toLowerCase(),
    baseKey: c.base,
    baseLabel: pick(spirits[c.base], locale),
    category: c.category,
    glass: c.glass,
    color: c.color,
    garnishColor: c.garnishColor,
    garnish: pick(c.garnish, locale),
    taste: c.taste,
  };
}

export function tasteLabels(locale: Locale) {
  const s = ui[locale];
  return { sweet: s.sweet, sour: s.sour, bitter: s.bitter, rough: s.rough, strength: s.strength };
}
