import Link from "next/link";
import LangSwitch from "./LangSwitch";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export default function Header({ locale }: { locale: Locale }) {
  const s = ui[locale];
  return (
    <header className="site-header">
      <div className="container bar">
        <Link href={`/${locale}`} className="brand">
          {s.siteName}
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href={`/${locale}/cocktails`}>{s.navCocktails}</Link>
          <Link href={`/${locale}/pantry`}>{s.navPantry}</Link>
          <Link href={`/${locale}/spy-soju`}>{s.navSpy}</Link>
        </nav>
        <LangSwitch locale={locale} label={s.language} />
      </div>
    </header>
  );
}
