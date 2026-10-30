import Link from "next/link";
import RecipeArtwork from "./RecipeArtwork";
import type { CardData } from "@/lib/view";
import type { Locale } from "@/lib/types";

export default function CocktailCard({ item, locale }: { item: CardData; locale: Locale }) {
  return (
    <Link href={`/${locale}/cocktails/${item.slug}`} className="card">
      <RecipeArtwork
        mode="card"
        slug={item.slug}
        name={item.name}
        category={item.category}
        glass={item.glass}
        color={item.color}
        garnishColor={item.garnishColor}
        garnish={item.garnish}
      />
      <span className="card-name">{item.name}</span>
      <span className="card-base">{item.baseLabel}</span>
    </Link>
  );
}
