import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Browse from "@/components/Browse";
import { cocktails } from "@/data/cocktails";
import { isLocale, ui } from "@/lib/i18n";
import { toCard } from "@/lib/view";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? ui[locale].allCocktails : undefined };
}

export default async function CocktailsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const items = cocktails.map((c) => toCard(c, locale));

  return (
    <main className="container section">
      <h1 className="page-title">{ui[locale].allCocktails}</h1>
      <Browse items={items} labels={ui[locale]} locale={locale} />
    </main>
  );
}
