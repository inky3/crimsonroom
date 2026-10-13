import Link from "next/link";
import GlassArt from "./GlassArt";
import type { CardData } from "@/lib/view";
import type { Locale } from "@/lib/types";

export default function CocktailCard({ item, locale }: { item: CardData; locale: Locale }) {
  return (
    <Link href={`/${locale}/cocktails/${item.slug}`} className="card">
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt="" className="card-art" loading="lazy" />
      ) : (
        <GlassArt glass={item.glass} color={item.color} garnish={item.garnishColor} id={`card-${item.slug}`} className="card-art" />
      )}
      <span className="card-name">{item.name}</span>
      <span className="card-base">{item.baseLabel}</span>
    </Link>
  );
}
