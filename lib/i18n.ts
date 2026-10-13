import type { Locale, Text } from "./types";

export const locales: Locale[] = ["en", "th"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

/** Shorthand for writing text: t("Shaken") or t("Shaken", "เขย่า"). */
export const t = (en: string, th?: string): Text => ({ en, th });

/** Returns the Thai text when asked for Thai and it exists, otherwise English. */
export function pick(text: Text, locale: Locale): string {
  return (locale === "th" && text.th) || text.en;
}

type Strings = {
  siteName: string;
  tagline: string;
  navCocktails: string;
  navSpy: string;
  heroTitle: string;
  heroSub: string;
  ctaBrowse: string;
  ctaSpy: string;
  featured: string;
  spyHeading: string;
  spyIntro: string;
  allCocktails: string;
  searchLabel: string;
  searchPlaceholder: string;
  baseLabel: string;
  allBases: string;
  sortBy: string;
  sortName: string;
  sortSweet: string;
  sortSour: string;
  sortBitter: string;
  sortRough: string;
  sortStrength: string;
  drinks: string;
  noResults: string;
  clearFilters: string;
  tools: string;
  ingredients: string;
  method: string;
  garnish: string;
  glass: string;
  story: string;
  taste: string;
  moreWith: string;
  originTold: string;
  originHouse: string;
  tasteNote: string;
  responsibly: string;
  language: string;
  sweet: string;
  sour: string;
  bitter: string;
  rough: string;
  strength: string;
};

export const ui: Record<Locale, Strings> = {
  en: {
    siteName: "Crimson Room",
    tagline: "Cocktail recipes, tools and stories",
    navCocktails: "Cocktails",
    navSpy: "Spy and soju",
    heroTitle: "Recipes for the bar at home",
    heroSub:
      "Classic cocktails from around the world, plus Spy and soju mixes. Every recipe lists the tools, the exact measures, and how sweet, sour, bitter and strong it tastes.",
    ctaBrowse: "Browse all cocktails",
    ctaSpy: "Try a Spy or soju mix",
    featured: "Featured cocktails",
    spyHeading: "Spy, soju and Thai spirits",
    spyIntro: "Easy mixes using drinks found all over Thailand.",
    allCocktails: "All cocktails",
    searchLabel: "Search",
    searchPlaceholder: "Search by name",
    baseLabel: "Base",
    allBases: "All",
    sortBy: "Sort by",
    sortName: "Name",
    sortSweet: "Sweetest",
    sortSour: "Most sour",
    sortBitter: "Most bitter",
    sortRough: "Roughest",
    sortStrength: "Strongest",
    drinks: "drinks",
    noResults: "No drinks match. Try a different search or clear the filters.",
    clearFilters: "Clear filters",
    tools: "Tools",
    ingredients: "Ingredients",
    method: "Method",
    garnish: "Garnish",
    glass: "Glass",
    story: "The story",
    taste: "Taste",
    moreWith: "More with",
    originTold:
      "This is the popular origin story. Many drinks have disputed histories, so treat it as a good tale rather than settled fact.",
    originHouse:
      "This is our own mix. It has no documented history, just a good way to drink it.",
    tasteNote:
      "Ratings go from 0 to 5 and are our own judgement for one standard serve. Rough is the harsh bite of the alcohol. Strength is how quickly the drink gets you drunk.",
    responsibly: "Please drink responsibly. For adults of legal drinking age only.",
    language: "Language",
    sweet: "Sweet",
    sour: "Sour",
    bitter: "Bitter",
    rough: "Rough",
    strength: "Strength",
  },
  th: {
    siteName: "Crimson Room",
    tagline: "สูตรค็อกเทล อุปกรณ์ และเรื่องราว",
    navCocktails: "ค็อกเทล",
    navSpy: "สไปและโซจู",
    heroTitle: "สูตรค็อกเทลสำหรับบาร์ที่บ้าน",
    heroSub:
      "ค็อกเทลคลาสสิกจากทั่วโลก พร้อมเมนูผสม Spy และโซจู ทุกสูตรบอกอุปกรณ์ ปริมาณที่แน่นอน และระดับความหวาน เปรี้ยว ขม และความแรง",
    ctaBrowse: "ดูค็อกเทลทั้งหมด",
    ctaSpy: "ลองเมนู Spy หรือโซจู",
    featured: "ค็อกเทลแนะนำ",
    spyHeading: "สไป โซจู และเหล้าไทย",
    spyIntro: "สูตรผสมง่าย ๆ จากเครื่องดื่มที่หาได้ทั่วไทย",
    allCocktails: "ค็อกเทลทั้งหมด",
    searchLabel: "ค้นหา",
    searchPlaceholder: "ค้นหาจากชื่อ",
    baseLabel: "เบส",
    allBases: "ทั้งหมด",
    sortBy: "เรียงตาม",
    sortName: "ชื่อ",
    sortSweet: "หวานที่สุด",
    sortSour: "เปรี้ยวที่สุด",
    sortBitter: "ขมที่สุด",
    sortRough: "บาดคอที่สุด",
    sortStrength: "แรงที่สุด",
    drinks: "เมนู",
    noResults: "ไม่พบเมนูที่ตรงกัน ลองค้นหาใหม่หรือล้างตัวกรอง",
    clearFilters: "ล้างตัวกรอง",
    tools: "อุปกรณ์",
    ingredients: "ส่วนผสม",
    method: "วิธีทำ",
    garnish: "ของตกแต่ง",
    glass: "แก้ว",
    story: "เรื่องราว",
    taste: "รสชาติ",
    moreWith: "เมนูอื่นที่ใช้",
    originTold:
      "นี่คือเรื่องราวที่เล่าต่อกันมา หลายเมนูยังมีข้อถกเถียงเรื่องต้นกำเนิด จึงควรอ่านเป็นเรื่องเล่ามากกว่าข้อเท็จจริง",
    originHouse: "นี่คือสูตรผสมของเราเอง ไม่มีประวัติที่บันทึกไว้ เป็นเพียงวิธีดื่มที่เราแนะนำ",
    tasteNote:
      "คะแนน 0 ถึง 5 เป็นการประเมินของเราสำหรับเครื่องดื่มหนึ่งแก้วตามสูตร \"บาดคอ\" คือความร้อนแรงของแอลกอฮอล์ ส่วน \"ความแรง\" คือความเร็วที่ทำให้เมา",
    responsibly: "โปรดดื่มอย่างมีความรับผิดชอบ สำหรับผู้ที่มีอายุตามกฎหมายเท่านั้น",
    language: "ภาษา",
    sweet: "หวาน",
    sour: "เปรี้ยว",
    bitter: "ขม",
    rough: "บาดคอ",
    strength: "ความแรง",
  },
};
