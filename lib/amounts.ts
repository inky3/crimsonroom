import type { Locale } from "./types";

export type Unit = "ml" | "oz";

const PLURALS: Record<string, string> = { cup: "cups", pinch: "pinches", dash: "dashes", tsp: "tsp", wedge: "wedges" };

function round(n: number) {
  return Number.isInteger(n) ? n : Math.round(n * 10) / 10;
}

/** 30 ml is treated as one ounce, the usual bar measure. Rounded to the nearest quarter. */
function ounces(ml: number) {
  const q = Math.round((ml / 30) * 4) / 4;
  const whole = Math.floor(q);
  const rem = q - whole;
  const frac = rem === 0.25 ? "¼" : rem === 0.5 ? "½" : rem === 0.75 ? "¾" : "";
  return whole === 0 && frac ? frac : `${whole}${frac}`;
}

/** Scales an amount like "45 ml" or "2 dashes" and converts ml to oz when asked. Text like "optional" is left alone. */
export function formatAmount(amount: string, servings: number, unit: Unit, locale: Locale): string {
  const m = amount.trim().match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
  if (!m) return amount;
  const value = parseFloat(m[1]) * servings;
  const rest = m[2];
  if (/^(ml|มล\.)$/i.test(rest)) {
    if (unit === "oz") return `${ounces(value)} ${locale === "th" ? "ออนซ์" : "oz"}`;
    return `${Math.round(value)} ${locale === "th" ? "มล." : "ml"}`;
  }
  if (locale === "en" && value > 1) {
    const words = rest.split(" ");
    if (PLURALS[words[0]]) words[0] = PLURALS[words[0]];
    return `${round(value)} ${words.join(" ")}`.trim();
  }
  return `${round(value)}${rest ? " " + rest : ""}`;
}
