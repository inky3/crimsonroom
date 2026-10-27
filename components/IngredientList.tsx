"use client";

import { useState } from "react";
import { pick } from "@/lib/i18n";
import type { Ingredient, Locale } from "@/lib/types";

const substitutions: Record<string, string> = {
  "White rum": "Light rum",
  "Aged or dark rum": "Dark rum",
  "Bourbon or rye whisky": "Either bourbon or rye whisky",
  "Triple sec or Cointreau": "Any orange liqueur (Cointreau, Curaçao or triple sec)",
  "Fresh lime juice": "Fresh lemon juice (brighter, slightly different flavour)",
  "Fresh lemon juice": "Fresh lime juice (more aromatic and tropical)",
  "Simple syrup (equal parts sugar and water)": "Dissolved superfine sugar or agave syrup",
  "Simple syrup": "Agave syrup or dissolved superfine sugar",
  "Soda water": "Sparkling water",
  "Prosecco or sparkling wine": "Champagne or another dry sparkling wine",
  "Orange juice": "Freshly squeezed or good-quality bottled orange juice",
  "Pineapple juice": "Mango juice (sweeter and less acidic)",
  "Cointreau": "Triple sec or another orange liqueur",
  "Tequila blanco": "Reposado tequila (rounder, oakier flavour)",
  "Gin": "London dry gin, or a softer contemporary gin",
};

function amountInOz(amount: string): string {
  if (/\boz\b/i.test(amount) || !/ml/i.test(amount)) return amount;
  return amount.replace(/(\d+(?:\.\d+)?)\s*ml/gi, (_match, raw) => {
    const oz = Number(raw) / 29.5735;
    const rounded = Math.round(oz * 4) / 4;
    const label = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(/\.25$/, "¼").replace(/\.5$/, "½").replace(/\.75$/, "¾");
    return label + " oz";
  });
}

export default function IngredientList({ ingredients, locale }: { ingredients: Ingredient[]; locale: Locale }) {
  const [units, setUnits] = useState<"ml" | "oz">("ml");
  const [showAlternatives, setShowAlternatives] = useState(false);

  return (
    <div className="ingredient-list-wrap">
      <div className="ingredient-options" aria-label="Ingredient display options">
        <div className="unit-switch" aria-label="Measurement units">
          <button type="button" aria-pressed={units === "ml"} onClick={() => setUnits("ml")}>ml</button>
          <button type="button" aria-pressed={units === "oz"} onClick={() => setUnits("oz")}>US fl oz</button>
        </div>
        <button className="link-btn" type="button" aria-expanded={showAlternatives} onClick={() => setShowAlternatives((value) => !value)}>
          {showAlternatives ? (locale === "th" ? "ซ่อนวัตถุดิบทดแทน" : "Hide alternatives") : (locale === "th" ? "ตัวเลือกวัตถุดิบทดแทน" : "Ingredient alternatives")}
        </button>
      </div>
      <ul className="ingredients">
        {ingredients.map((ingredient, index) => {
          const name = pick(ingredient.name, locale);
          const alternative = substitutions[ingredient.name.en];
          return (
            <li key={index} className="ingredient-row">
              <span className="amount">{units === "oz" ? amountInOz(pick(ingredient.amount, locale)) : pick(ingredient.amount, locale)}</span>
              <span className="ingredient-copy">
                <span>{name}</span>
                {showAlternatives && alternative && <small className="ingredient-alternative">{locale === "th" ? "ใช้แทนได้: " : "Alternative: "}{alternative}</small>}
              </span>
            </li>
          );
        })}
      </ul>
      {units === "oz" && <p className="note">{locale === "th" ? "แปลงจากมิลลิลิตรเป็น US fl oz โดยประมาณ ปัดเป็น ¼ ออนซ์ที่ใกล้ที่สุด" : "Millilitres are converted to US fluid ounces and rounded to the nearest ¼ oz. Small quantities such as dashes and teaspoons stay unchanged."}</p>}
    </div>
  );
}
