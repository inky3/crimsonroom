import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Browse from "@/components/Browse";
import { cocktails } from "@/data/cocktails";
import { isLocale, ui } from "@/lib/i18n";
import { toCard } from "@/lib/view";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? ui[locale].spyHeading : undefined };
}

export default async function SpySojuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const items = cocktails.filter((c) => c.category === "spy-soju").map((c) => toCard(c, locale));

  return (
    <main className="container section">
      <h1 className="page-title">{ui[locale].spyHeading}</h1>
      <p className="muted intro">{ui[locale].spyIntro}</p>
      <Browse items={items} labels={ui[locale]} locale={locale} />
    </main>
  );
}
