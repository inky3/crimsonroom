import { t } from "@/lib/i18n";
import type { Text } from "@/lib/types";

/*
 * What you can tick on the "What can I make?" page, and what each recipe needs.
 * Always assumed at home, so never listed: ice, sugar, simple syrup, water and salt.
 */
export type PantryKey =
  | "whisky" | "rum-white" | "rum-aged" | "gin" | "vodka" | "tequila" | "cachaca" | "soju" | "spy" | "thai-spirit"
  | "triple-sec" | "campari" | "aperol" | "coffee-liqueur" | "vermouth-sweet" | "vermouth-dry" | "curacao" | "orgeat"
  | "prosecco" | "beer" | "bitters"
  | "soda" | "tonic" | "ginger-beer" | "ginger-ale" | "cola" | "lemon-lime-soda" | "grapefruit-soda"
  | "coconut-cream" | "cream" | "grenadine" | "honey" | "yogurt-drink" | "coffee"
  | "lime" | "lemon" | "orange-juice" | "pineapple-juice" | "cranberry-juice" | "lychee-juice" | "peach-juice" | "mint";

/** One ingredient, or a list where any one of them will do. */
export type Need = PantryKey | PantryKey[];

export const pantryGroups: { key: string; title: Text; items: { key: PantryKey; label: Text }[] }[] = [
  {
    key: "spirits",
    title: t("Spirits and Thai drinks", "เหล้าและเครื่องดื่มไทย"),
    items: [
      { key: "whisky", label: t("Whisky or bourbon", "วิสกี้หรือเบอร์เบิน") },
      { key: "rum-white", label: t("White rum", "รัมขาว") },
      { key: "rum-aged", label: t("Aged or dark rum", "รัมบ่มหรือรัมดำ") },
      { key: "gin", label: t("Gin", "จิน") },
      { key: "vodka", label: t("Vodka", "วอดก้า") },
      { key: "tequila", label: t("Tequila", "เตกีล่า") },
      { key: "cachaca", label: t("Cachaça", "คาชาซา") },
      { key: "soju", label: t("Soju", "โซจู") },
      { key: "spy", label: t("Spy wine cooler", "ไวน์คูลเลอร์ Spy") },
      { key: "thai-spirit", label: t("Thai spirit (Mekhong, Sangsom)", "สุราไทย (แม่โขง แสงโสม)") },
    ],
  },
  {
    key: "liqueurs",
    title: t("Liqueurs, wine and beer", "ลิเคียร์ ไวน์ และเบียร์"),
    items: [
      { key: "triple-sec", label: t("Triple sec or Cointreau", "ทริปเปิลเซกหรือคอยน์โทร") },
      { key: "campari", label: t("Campari", "แคมปารี") },
      { key: "aperol", label: t("Aperol", "อเพอรอล") },
      { key: "coffee-liqueur", label: t("Coffee liqueur", "เหล้ากาแฟ") },
      { key: "vermouth-sweet", label: t("Sweet vermouth", "สวีทเวอร์มุท") },
      { key: "vermouth-dry", label: t("Dry vermouth", "ดรายเวอร์มุท") },
      { key: "curacao", label: t("Orange curaçao", "ออเรนจ์คูราโซ") },
      { key: "orgeat", label: t("Orgeat (almond syrup)", "ออร์เจต์ (น้ำเชื่อมอัลมอนด์)") },
      { key: "prosecco", label: t("Prosecco or sparkling wine", "พรอสเซกโกหรือไวน์สปาร์กลิง") },
      { key: "beer", label: t("Lager beer", "เบียร์ลาเกอร์") },
      { key: "bitters", label: t("Angostura bitters", "แองโกสทูร่าบิตเตอร์ส") },
    ],
  },
  {
    key: "mixers",
    title: t("Mixers and extras", "น้ำอัดลมและของผสม"),
    items: [
      { key: "soda", label: t("Soda water", "โซดา") },
      { key: "tonic", label: t("Tonic water", "โทนิกวอเตอร์") },
      { key: "ginger-beer", label: t("Ginger beer", "จินเจอร์เบียร์") },
      { key: "ginger-ale", label: t("Ginger ale", "จินเจอร์เอล") },
      { key: "cola", label: t("Cola", "โคล่า") },
      { key: "lemon-lime-soda", label: t("Lemon-lime soda", "โซดารสเลมอนไลม์") },
      { key: "grapefruit-soda", label: t("Grapefruit soda", "โซดารสเกรปฟรุต") },
      { key: "coconut-cream", label: t("Coconut cream", "ครีมมะพร้าว") },
      { key: "cream", label: t("Fresh cream", "ครีมสด") },
      { key: "grenadine", label: t("Grenadine", "เกรนาดีน") },
      { key: "honey", label: t("Honey", "น้ำผึ้ง") },
      { key: "yogurt-drink", label: t("Yogurt drink (like Yakult)", "เครื่องดื่มโยเกิร์ต (เช่น ยาคูลท์)") },
      { key: "coffee", label: t("Coffee or espresso", "กาแฟหรือเอสเปรสโซ่") },
    ],
  },
  {
    key: "fresh",
    title: t("Juices and fresh", "น้ำผลไม้และของสด"),
    items: [
      { key: "lime", label: t("Limes", "มะนาว") },
      { key: "lemon", label: t("Lemons", "เลมอน") },
      { key: "orange-juice", label: t("Orange juice", "น้ำส้ม") },
      { key: "pineapple-juice", label: t("Pineapple juice", "น้ำสับปะรด") },
      { key: "cranberry-juice", label: t("Cranberry juice", "น้ำแครนเบอร์รี") },
      { key: "lychee-juice", label: t("Lychee juice", "น้ำลิ้นจี่") },
      { key: "peach-juice", label: t("Peach juice", "น้ำพีช") },
      { key: "mint", label: t("Fresh mint", "สะระแหน่สด") },
    ],
  },
];

/** What every recipe needs, by slug. The build stops if a recipe is missing here. */
export const pantryNeeds: Record<string, Need[]> = {
  "old-fashioned": ["whisky", "bitters"],
  margarita: ["tequila", "triple-sec", "lime"],
  daiquiri: ["rum-white", "lime"],
  mojito: ["rum-white", "lime", "mint", "soda"],
  negroni: ["gin", "campari", "vermouth-sweet"],
  manhattan: ["whisky", "vermouth-sweet", "bitters"],
  "dry-martini": ["gin", "vermouth-dry"],
  cosmopolitan: ["vodka", "triple-sec", "cranberry-juice", "lime"],
  "whiskey-sour": ["whisky", "lemon"],
  "moscow-mule": ["vodka", "lime", "ginger-beer"],
  "espresso-martini": ["vodka", "coffee-liqueur", "coffee"],
  "pina-colada": ["rum-white", "coconut-cream", "pineapple-juice"],
  "aperol-spritz": ["prosecco", "aperol", "soda"],
  "mai-tai": ["rum-aged", "curacao", "orgeat", "lime"],
  caipirinha: ["cachaca", "lime"],
  paloma: ["tequila", "lime", "grapefruit-soda"],
  "gin-and-tonic": ["gin", "tonic"],
  "spy-spritz": ["spy", "soda", "lime"],
  "spy-boost": ["spy", "orange-juice", ["rum-white", "vodka"]],
  somaek: ["soju", "beer"],
  "yogurt-soju": ["soju", "yogurt-drink", "lemon-lime-soda"],
  "soju-lychee-cooler": ["soju", "lychee-juice", "lime", "soda"],
  "mekhong-mule": ["thai-spirit", "lime", "ginger-beer"],
  "cuba-libre": ["rum-white", "cola", "lime"],
  "dark-n-stormy": ["rum-aged", "lime", "ginger-beer"],
  "tequila-sunrise": ["tequila", "orange-juice", "grenadine"],
  gimlet: ["gin", "lime"],
  "tom-collins": ["gin", "lemon", "soda"],
  "french-75": ["gin", "lemon", "prosecco"],
  "white-russian": ["vodka", "coffee-liqueur", "cream"],
  americano: ["campari", "vermouth-sweet", "soda"],
  mimosa: ["prosecco", "orange-juice"],
  "irish-coffee": ["whisky", "coffee", "cream"],
  "hot-toddy": ["whisky", "honey", "lemon"],
  kamikaze: ["vodka", "triple-sec", "lime"],
  "thai-whisky-soda": ["whisky", "soda", "lime"],
  "sangsom-cola": ["thai-spirit", "cola", "lime"],
  "spy-sangria-jug": ["spy", "orange-juice", "rum-white"],
  "soju-tonic": ["soju", "tonic", "lime"],
  "soju-peach-highball": ["soju", "peach-juice", "lemon", "soda"],
  "virgin-mojito": ["lime", "mint", "soda"],
  "virgin-colada": ["coconut-cream", "pineapple-juice"],
  "virgin-mule": ["lime", "ginger-beer"],
  "lychee-lime-fizz": ["lychee-juice", "lime", "soda"],
  "shirley-temple": ["ginger-ale", "grenadine", "lime"],
  "bees-knees": ["gin", "lemon", "honey"],
  "gin-fizz": ["gin", "lemon", "soda"],
  "rum-punch": [["rum-white", "rum-aged"], "orange-juice", "pineapple-juice", "lime"],
  "sea-breeze": ["vodka", "cranberry-juice", "grapefruit-soda"],
  screwdriver: ["vodka", "orange-juice"],
  "vodka-soda": ["vodka", "soda", "lime"],

  "beetlejuice-margarita": ["tequila", "triple-sec", "lime"],
  "strawberry-diablo": ["tequila", "lime", "grenadine", "ginger-beer"],
  "autumn-old-fashioned": ["whisky", "bitters"],
  "dragon-fruit-mojito": ["rum-white", "lime", "mint", "soda"],

};
