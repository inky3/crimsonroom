import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CocktailCard from "@/components/CocktailCard";
import GlassArt from "@/components/GlassArt";
import TasteGauges from "@/components/TasteGauges";
import TasteCoach from "@/components/TasteCoach";
import TasteProfile from "@/components/TasteProfile";
import { cocktails, getCocktail } from "@/data/cocktails";
import { glasses, methods, spirits, tools } from "@/data/reference";
import { isLocale, locales, pick, ui } from "@/lib/i18n";
import { tasteLabels, toCard } from "@/lib/view";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => cocktails.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getCocktail(slug);
  if (!c || !isLocale(locale)) return {};
  return { title: pick(c.name, locale), description: pick(c.story, locale).slice(0, 155) };
}

export default async function CocktailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCocktail(slug);
  if (!c) notFound();

  const s = ui[locale];
  const name = pick(c.name, locale);
  const baseLabel = pick(spirits[c.base], locale);
  const related = cocktails
    .filter((o) => o.base === c.base && o.slug !== c.slug)
    .slice(0, 4)
    .map((o) => toCard(o, locale));

  return (
    <main className="container section">
      <p className="crumb">
        <Link href={`/${locale}/cocktails`}>{s.allCocktails}</Link>
      </p>

      <article className="recipe">
        <header className="recipe-head">
          <div className="recipe-art">
            {c.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.image} alt={name} />
            ) : (
              <GlassArt glass={c.glass} color={c.color} garnish={c.garnishColor} id="detail" label={name} />
            )}
          </div>
          <div className="recipe-intro">
            <h1>{name}</h1>
            <p className="meta">
              <span>{baseLabel}</span>
              <span>{pick(methods[c.method], locale)}</span>
              <span>
                {s.glass}: {pick(glasses[c.glass], locale)}
              </span>
            </p>
            <h2 className="small">{s.story}</h2>
            <p className="story">{pick(c.story, locale)}</p>
            <p className="note">{c.origin === "told" ? s.originTold : s.originHouse}</p>
          </div>
        </header>

        <div className="recipe-body">
          <section>
            <h2>{s.ingredients}</h2>
            <ul className="ingredients">
              {c.ingredients.map((i, idx) => (
                <li key={idx}>
                  <span className="amount">{pick(i.amount, locale)}</span>
                  <span>{pick(i.name, locale)}</span>
                </li>
              ))}
            </ul>

            <h2>{s.tools}</h2>
            <ul className="tools">
              {c.tools.map((tool) => (
                <li key={tool}>{pick(tools[tool], locale)}</li>
              ))}
            </ul>

            <h2>{s.garnish}</h2>
            <p>{pick(c.garnish, locale)}</p>
          </section>

          <section>
            <h2>{s.taste}</h2>
            <TasteProfile slug={c.slug} locale={locale} taste={c.taste} ingredients={c.ingredients.map((i) => pick(i.name, locale))} />
            <TasteGauges taste={c.taste} labels={tasteLabels(locale)} />
            <p className="note">{s.tasteNote}</p>
            <TasteCoach locale={locale} />

            <h2>{s.method}</h2>
            <ol className="steps">
              {c.steps.map((step, idx) => (
                <li key={idx}>{pick(step, locale)}</li>
              ))}
            </ol>
          </section>
        </div>
      </article>

      {related.length > 0 && (
        <section className="related">
          <h2>
            {s.moreWith} {baseLabel}
          </h2>
          <div className="grid">
            {related.map((item) => (
              <CocktailCard key={item.slug} item={item} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
