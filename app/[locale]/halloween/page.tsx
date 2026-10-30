import { notFound } from "next/navigation";
import CocktailCard from "@/components/CocktailCard";
import { cocktails } from "@/data/cocktails";
import { isLocale } from "@/lib/i18n";
import { toCard } from "@/lib/view";

export const dynamic = "force-dynamic";

const halloweenSlugs = [
  "beetlejuice-margarita", "strawberry-diablo", "autumn-old-fashioned",
  "dragon-fruit-mojito", "candy-corn-martini", "spider-web-cosmopolitan",
  "black-grape-zombie-mojito", "witchs-web", "blood-injection-mimosa",
  "beetlejuice-potion", "halloween-old-fashioned", "spooky-pumpkin-margarita",
  "huckleberry-vampire-margarita", "frankenstein-elixir",
];

export default async function HalloweenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const items = cocktails.filter((c) => halloweenSlugs.includes(c.slug)).map((c) => toCard(c, locale));

  return (
    <main className="halloween-page">
      <section className="container section">
        <p className="eyebrow">☾ October special · 31 October</p>
        <h1 className="page-title">{locale === "th" ? "ฮาโลวีนค็อกเทล" : "Halloween cocktails"}</h1>
        <p className="halloween-intro">{locale === "th" ? "รวมค็อกเทลธีมฮาโลวีนในที่เดียว พร้อมบรรยากาศสีม่วงดำและสีส้มประจำเทศกาล" : "A little dark, a little spooky. Explore the seasonal cocktail collection in our Halloween-themed room."}</p>
        <div className="grid">
          {items.map((item) => <CocktailCard key={item.slug} item={item} locale={locale} />)}
        </div>
      </section>
    </main>
  );
}
