"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";

export default function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.split("/").slice(2).join("/");
  const href = (l: Locale) => `/${l}${rest ? `/${rest}` : ""}`;

  return (
    <nav aria-label={label} className="lang">
      <Link href={href("en")} lang="en" aria-current={locale === "en" ? "true" : undefined}>
        English
      </Link>
      <Link href={href("th")} lang="th" aria-current={locale === "th" ? "true" : undefined}>
        ไทย
      </Link>
    </nav>
  );
}
