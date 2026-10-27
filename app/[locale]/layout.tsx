import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import { isLocale, locales, ui } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: { default: `${ui[locale].siteName}`, template: `%s | ${ui[locale].siteName}` },
    description: ui[locale].tagline,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;700&family=Noto+Sans+Thai:wght@400;500;700&family=Noto+Serif+Thai:wght@500;700&display=swap"
        />
      </head>
      <body>
        <Header locale={locale} />
        {children}
        <footer className="site-footer">
          <div className="container">
            <p>{ui[locale].responsibly}</p>

          </div>
        </footer>
      </body>
    </html>
  );
}
