"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/types";

const LOCALE_KEY = "crimsonroom-locale";

export default function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();
  const rest = pathname.split("/").slice(2).join("/");
  const historyNavigation = useRef(false);

  // Remember the visitor's chosen language across browser Back/Forward navigation.
  useEffect(() => {
    const markHistoryNavigation = () => {
      historyNavigation.current = true;
    };
    window.addEventListener("popstate", markHistoryNavigation);
    return () => window.removeEventListener("popstate", markHistoryNavigation);
  }, []);

  useEffect(() => {
    if (!historyNavigation.current) return;
    historyNavigation.current = false;

    const preferred = window.localStorage.getItem(LOCALE_KEY);
    if (preferred !== "en" && preferred !== "th") return;

    const pathLocale = window.location.pathname.split("/")[1];
    if (pathLocale !== preferred) {
      const nextPath = `/${preferred}${window.location.pathname.split("/").slice(2).join("/") ? `/${window.location.pathname.split("/").slice(2).join("/")}` : ""}`;
      router.replace(`${nextPath}${window.location.search}${window.location.hash}`, { scroll: false });
    }
  }, [pathname, router]);

  const href = (nextLocale: Locale) => {
    const path = `/${nextLocale}${rest ? `/${rest}` : ""}`;
    return `${path}${typeof window !== "undefined" ? window.location.search : ""}`;
  };

  const switchTo = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    window.localStorage.setItem(LOCALE_KEY, nextLocale);
    router.replace(href(nextLocale), { scroll: false });
  };

  return (
    <nav aria-label={label} className="lang">
      <button type="button" lang="en" aria-current={locale === "en" ? "true" : undefined} onClick={() => switchTo("en")}>
        English
      </button>
      <button type="button" lang="th" aria-current={locale === "th" ? "true" : undefined} onClick={() => switchTo("th")}>
        ไทย
      </button>
    </nav>
  );
}
