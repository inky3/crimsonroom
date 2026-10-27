"use client";

import Link from "next/link";
import { useState } from "react";
import LangSwitch from "./LangSwitch";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export default function Header({ locale }: { locale: Locale }) {
  const s = ui[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container bar">
        <Link href={`/${locale}`} className="brand" onClick={closeMenu}>
          {s.siteName}
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span><span></span><span></span>
        </button>
        <nav id="primary-navigation" className={`nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main">
          <Link href={`/${locale}/cocktails`} onClick={closeMenu}>{s.navCocktails}</Link>
          <Link href={`/${locale}/halloween`} className="halloween-nav" onClick={closeMenu}>🎃 Halloween</Link>
          <Link href={`/${locale}/pantry`} onClick={closeMenu}>{s.navPantry}</Link>
          <Link href={`/${locale}/spy-soju`} onClick={closeMenu}>{s.navSpy}</Link>
        </nav>
        <div className="header-language"><LangSwitch locale={locale} label={s.language} /></div>
      </div>
    </header>
  );
}
