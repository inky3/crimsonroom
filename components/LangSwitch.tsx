"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/types";

const LOCALE_KEY = "crimsonroom-locale";
const HISTORY_KEY = "crimsonroom-history-navigation";

export default function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();
  const rest = pathname.split("/").slice(2).join("/");


  // Remember the visitor's chosen language across browser Back/Forward navigation.
  useEffect(() => {
    const markHistoryNavigation = () => {
      window.sessionStorage.setItem(HISTORY_KEY, "1");
    };
    window.addEventListener("popstate", markHistoryNavigation);
    return () => window.removeEventListener("popstate", markHistoryNavigation);
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem(HISTORY_KEY) !== "1") return;
    window.sessionStorage.removeItem(HISTORY_KEY);

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
