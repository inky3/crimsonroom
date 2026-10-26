"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/types";

export default function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();
  const rest = pathname.split("/").slice(2).join("/");
  const href = (nextLocale: Locale) => {
    const path = `/${nextLocale}${rest ? `/${rest}` : ""}`;
    return `${path}${typeof window !== "undefined" ? window.location.search : ""}`;
  };
  const switchTo = (nextLocale: Locale) => {
    if (nextLocale !== locale) router.replace(href(nextLocale), { scroll: false });
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
