import { notFound } from "next/navigation";
import PantryFinder from "@/components/PantryFinder";
import { isLocale } from "@/lib/i18n";

export default async function PantryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PantryFinder locale={locale} />;
}
