import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Browse from "@/components/Browse";
import { cocktails } from "@/data/cocktails";
import { isLocale, ui } from "@/lib/i18n";
import { toCard } from "@/lib/view";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: locale === "th" ? "ม็อกเทล | Crimson Room" : "Mocktails | Crimson Room" };
}

export default async function MocktailsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const items = cocktails
    .filter((recipe) => recipe.category === "mocktail")
    .map((recipe) => toCard(recipe, locale));

  return (
    <main className="container section alcohol-free-page">
      <p className="eyebrow">{locale === "th" ? "รสชาติและเทคนิค แบบไม่มีแอลกอฮอล์" : "All the craft, none of the alcohol"}</p>
      <h1 className="page-title">{locale === "th" ? "ม็อกเทล" : "Mocktails"}</h1>
      <p className="muted alcohol-free-intro">
        {locale === "th"
          ? "รวมสูตรม็อกเทลที่ไม่มีส่วนผสมแอลกอฮอล์ พร้อมเทคนิคการผสม เขย่า และตกแต่งแก้ว สำหรับฝึกบาร์เทนเดอร์ได้ทุกเวลา"
          : "A collection of mocktails with the balance, technique and presentation of great bar drinks. Practise shaking, muddling, building and garnishing without spirits."}
      </p>
      <Browse items={items} labels={ui[locale]} locale={locale} />
      <p className="note alcohol-free-note">
        {locale === "th"
          ? "หมายเหตุ: ตรวจสอบฉลากของไซรัป มิกเซอร์ และผลิตภัณฑ์สำเร็จรูปทุกครั้ง หากต้องการหลีกเลี่ยงแอลกอฮอล์อย่างเคร่งครัด"
          : "Tip: check labels on syrups, mixers and prepared ingredients if you need to avoid alcohol strictly."}
      </p>
    </main>
  );
}
