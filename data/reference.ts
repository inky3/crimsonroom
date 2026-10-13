import { t } from "@/lib/i18n";
import type { CategoryKey, GlassKey, MethodKey, SpiritKey, Text, ToolKey } from "@/lib/types";

export const spirits: Record<SpiritKey, Text> = {
  rum: t("Rum", "รัม"),
  gin: t("Gin", "จิน"),
  whisky: t("Whisky", "วิสกี้"),
  tequila: t("Tequila", "เตกีล่า"),
  vodka: t("Vodka", "วอดก้า"),
  cachaca: t("Cachaça", "คาชาซา"),
  wine: t("Wine and aperitif", "ไวน์และอะเพอริทีฟ"),
  winecooler: t("Wine cooler (Spy)", "ไวน์คูลเลอร์ (Spy)"),
  soju: t("Soju", "โซจู"),
  thai: t("Thai spirits", "เหล้าไทย"),
};

export const categories: Record<CategoryKey, Text> = {
  classic: t("Classic", "คลาสสิก"),
  "spy-soju": t("Spy and soju", "สไปและโซจู"),
};

export const glasses: Record<GlassKey, Text> = {
  coupe: t("Coupe", "แก้วคูป"),
  martini: t("Martini glass", "แก้วมาร์ตินี่"),
  rocks: t("Rocks glass", "แก้วร็อกส์"),
  highball: t("Highball glass", "แก้วไฮบอล"),
  mug: t("Copper mug", "แก้วมักทองแดง"),
  wine: t("Wine glass", "แก้วไวน์"),
  beer: t("Beer glass", "แก้วเบียร์"),
};

export const methods: Record<MethodKey, Text> = {
  shake: t("Shaken", "เขย่า"),
  stir: t("Stirred", "คน"),
  build: t("Built in the glass", "ผสมในแก้ว"),
  blend: t("Blended", "ปั่น"),
  muddle: t("Muddled", "บดแล้วผสม"),
};

export const tools: Record<ToolKey, Text> = {
  shaker: t("Cocktail shaker", "เชคเกอร์"),
  jigger: t("Jigger", "จิ๊กเกอร์"),
  hawthorne: t("Hawthorne strainer", "ที่กรองฮอว์ธอร์น"),
  fine: t("Fine strainer", "ที่กรองละเอียด"),
  mixingGlass: t("Mixing glass", "แก้วผสม"),
  barSpoon: t("Bar spoon", "ช้อนบาร์"),
  muddler: t("Muddler", "ไม้บดมัดเดลอร์"),
  juicer: t("Citrus juicer", "ที่คั้นน้ำมะนาวและส้ม"),
  peeler: t("Peeler", "ที่ปอกเปลือก"),
  blender: t("Blender", "เครื่องปั่น"),
  knife: t("Small knife", "มีดเล็ก"),
};
