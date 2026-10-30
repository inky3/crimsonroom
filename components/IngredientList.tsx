import { pick } from "@/lib/i18n";
import type { Ingredient, Locale } from "@/lib/types";

function amountWithBothUnits(amount: string): string {
  if (/\b(?:us\s*)?fl?\.?\s*oz\b|\boz\b/i.test(amount)) return amount;
  return amount.replace(/(\d+(?:\.\d+)?)\s*ml\b/gi, (_match, raw) => {
    const ml = Number(raw);
    const oz = ml / 29.5735;
    const rounded = Math.round(oz * 4) / 4;
    const label = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(/\.25$/, "¼").replace(/\.5$/, "½").replace(/\.75$/, "¾");
    return `${ml} ml (${label} oz)`;
  });
}

export default function IngredientList({ ingredients, locale }: { ingredients: Ingredient[]; locale: Locale }) {
  return (
    <ul className="ingredients">
      {ingredients.map((ingredient, index) => (
        <li key={index} className="ingredient-row">
          <span className="amount">{amountWithBothUnits(pick(ingredient.amount, locale))}</span>
          <span>{pick(ingredient.name, locale)}</span>
        </li>
      ))}
    </ul>
  );
}
