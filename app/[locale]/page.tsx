import Link from "next/link";
import { notFound } from "next/navigation";
import CocktailCard from "@/components/CocktailCard";
import GlassArt from "@/components/GlassArt";
import { cocktails, getCocktail } from "@/data/cocktails";
import { spirits } from "@/data/reference";
import { isLocale, pick, ui } from "@/lib/i18n";
import { featuredSlugs } from "@/lib/site";
import { toCard } from "@/lib/view";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = ui[locale];

  const hero = getCocktail("negroni")!;
  const featured = featuredSlugs.map((slug) => getCocktail(slug)!).map((c) => toCard(c, locale));
  const spy = cocktails.filter((c) => c.category === "spy-soju");

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
            <GlassArt glass={hero.glass} color={hero.color} garnish={hero.garnishColor} id="hero" />
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
