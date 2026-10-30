import Link from "next/link";
import { notFound } from "next/navigation";
import CocktailCard from "@/components/CocktailCard";
import RecipeArtwork from "@/components/RecipeArtwork";
import { cocktails, getCocktail } from "@/data/cocktails";
import { spirits } from "@/data/reference";
import { isLocale, pick, ui } from "@/lib/i18n";
import { featuredSlugs } from "@/lib/site";
import { moreCocktails } from "@/data/more";
import { toCard } from "@/lib/view";

export const dynamic = "force-dynamic";

const halloweenSlugs = [
  "beetlejuice-margarita",
  "strawberry-diablo",
  "autumn-old-fashioned",
  "dragon-fruit-mojito",
  "candy-corn-martini",
  "spider-web-cosmopolitan",
  "black-grape-zombie-mojito",
  "witchs-web",
  "blood-injection-mimosa",
  "beetlejuice-potion",
  "halloween-old-fashioned",
  "spooky-pumpkin-margarita",
  "huckleberry-vampire-margarita",
  "frankenstein-elixir",
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = ui[locale];

  const hero = getCocktail("negroni")!;
  const featured = featuredSlugs.map((slug) => getCocktail(slug)!).map((c) => toCard(c, locale));
  const spy = cocktails.filter((c) => c.category === "spy-soju");
  const isHalloweenSeason = new Intl.DateTimeFormat("en-US", { month: "numeric", timeZone: "Asia/Bangkok" }).format(new Date()) === "10";
  const halloween = moreCocktails.filter((c) => halloweenSlugs.includes(c.slug)).map((c) => toCard(c, locale));

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>{s.heroTitle}</h1>
            <p className="lead">{s.heroSub}</p>
            <div className="actions">
              <Link href={`/${locale}/cocktails`} className="btn primary">
                {s.ctaBrowse}
              </Link>
              <Link href={`/${locale}/spy-soju`} className="btn">
                {s.ctaSpy}
              </Link>
            </div>
          </div>
          <Link href={`/${locale}/cocktails/${hero.slug}`} className="hero-glass" aria-label={pick(hero.name, locale)}>
            <RecipeArtwork mode="detail" slug={hero.slug} name={pick(hero.name, locale)} category={hero.category} glass={hero.glass} color={hero.color} garnishColor={hero.garnishColor} garnish={pick(hero.garnish, locale)} />
          </Link>
        </div>
      </section>

      <section className="container section">
        <h2>{s.featured}</h2>
        <div className="grid">
          {featured.map((item) => (
            <CocktailCard key={item.slug} item={item} locale={locale} />
          ))}
        </div>
      </section>

      <section className="container section alcohol-free-section" aria-labelledby="mocktails-heading">
        <p className="eyebrow">{locale === "th" ? "รสชาติและเทคนิค โดยไม่มีแอลกอฮอล์" : "All the craft, none of the alcohol"}</p>
        <h2 id="mocktails-heading">{locale === "th" ? "ม็อกเทล" : "Mocktails"}</h2>
        <p className="muted">{locale === "th" ? "สูตรม็อกเทลสำหรับฝึกทักษะบาร์เทนเดอร์และเพลิดเพลินได้ทุกเวลา" : "Explore zero-alcohol drinks built around flavour, balance and bartending technique."}</p>
        <div className="grid">
          {cocktails.filter((c) => c.category === "mocktail").slice(0, 5).map((c) => (
            <CocktailCard key={c.slug} item={toCard(c, locale)} locale={locale} />
          ))}
        </div>
        <div className="actions alcohol-free-action">
          <Link href={`/${locale}/mocktails`} className="btn primary">
            {locale === "th" ? "ดูสูตรม็อกเทลทั้งหมด" : "Explore all mocktails"} ↗
          </Link>
        </div>
      </section>

      {isHalloweenSeason && (
        <section className="container section halloween-section" aria-labelledby="halloween-heading">
          <p className="eyebrow">October special</p>
          <h2 id="halloween-heading">{locale === "th" ? "ฮาโลวีนค็อกเทล" : "Halloween cocktails"}</h2>
          <p className="muted">{locale === "th" ? "รวมสูตรค็อกเทลธีมฮาโลวีน มีเฉพาะช่วงเดือนตุลาคม" : "A seasonal collection of spooky cocktails, available throughout October."}</p>
          <div className="grid">
            {halloween.map((item) => (
              <CocktailCard key={item.slug} item={item} locale={locale} />
            ))}
          </div>
        </section>
      )}

      <section className="container section">
        <h2>{s.spyHeading}</h2>
        <p className="muted">{s.spyIntro}</p>
        <ul className="menu">
          {spy.map((c) => (
            <li key={c.slug}>
              <Link href={`/${locale}/cocktails/${c.slug}`} className="menu-row">
                <span className="menu-name">{pick(c.name, locale)}</span>
                <span className="leader" aria-hidden="true" />
                <span className="menu-base">{pick(spirits[c.base], locale)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
