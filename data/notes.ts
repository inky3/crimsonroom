import { t } from "@/lib/i18n";
import type { Text } from "@/lib/types";

/** Short safety and practical notes shown under "Good to know" on a recipe page. */
export const notes: Record<string, Text[]> = {
  "whiskey-sour": [
    t("Raw egg white carries a small risk of food poisoning. Use pasteurised egg white, or leave it out.", "ไข่ขาวดิบมีความเสี่ยงเล็กน้อยต่ออาหารเป็นพิษ ควรใช้ไข่ขาวพาสเจอร์ไรซ์ หรือไม่ใส่ก็ได้"),
  ],
  "espresso-martini": [
    t("Caffeine can hide how drunk you are. Pace yourself, and skip it late at night if caffeine keeps you awake.", "คาเฟอีนอาจบดบังความรู้สึกว่าเมาแค่ไหน ดื่มช้า ๆ และหลีกเลี่ยงตอนดึกถ้าคาเฟอีนทำให้นอนไม่หลับ"),
  ],
  "irish-coffee": [
    t("Caffeine can hide how drunk you are, so keep count of your drinks.", "คาเฟอีนอาจบดบังความรู้สึกว่าเมาแค่ไหน จึงควรนับจำนวนแก้วที่ดื่ม"),
  ],
  "hot-toddy": [
    t("It will not cure a cold. If you are unwell or taking medicine, skip the whisky and have it as hot honey and lemon.", "ไม่ได้รักษาหวัด ถ้าไม่สบายหรือกินยาอยู่ ให้เว้นวิสกี้ แล้วดื่มเป็นน้ำผึ้งมะนาวร้อนแทน"),
  ],
  kamikaze: [
    t("Shots are strong and easy to take too fast. Make one round, sip, and have water in between.", "ช็อตแรงและดื่มเร็วเกินไปได้ง่าย ทำแค่หนึ่งรอบ ค่อย ๆ จิบ และดื่มน้ำเปล่าคั่น"),
  ],
  "yogurt-soju": [
    t("It tastes like a soft drink, which hides the alcohol. Pour small and count your glasses.", "รสชาติเหมือนน้ำอัดลมจึงบดบังแอลกอฮอล์ เทน้อย ๆ และนับจำนวนแก้ว"),
  ],
  "soju-peach-highball": [
    t("The fruit hides the alcohol. Pour small and count your glasses.", "รสผลไม้บดบังแอลกอฮอล์ เทน้อย ๆ และนับจำนวนแก้ว"),
  ],
  "sangsom-cola": [
    t("Do not mix alcohol with energy drinks. They can hide how drunk you are.", "อย่าผสมแอลกอฮอล์กับเครื่องดื่มชูกำลัง เพราะอาจบดบังความรู้สึกว่าเมาแค่ไหน"),
  ],
  "spy-sangria-jug": [
    t("Jug drinks are easy to over-pour. Work out how many glasses a jug makes, and share it out.", "เครื่องดื่มแบบเหยือกเทเกินได้ง่าย ลองคำนวณว่าเหยือกหนึ่งได้กี่แก้ว แล้วแบ่งกันดื่ม"),
  ],
  "moscow-mule": [
    t("Use a mug lined with stainless steel or nickel, or a tall glass. Acidic drinks can pull copper out of bare copper.", "ใช้แก้วมักที่เคลือบสเตนเลสหรือนิกเกิลด้านใน หรือใช้แก้วทรงสูงแทน เพราะเครื่องดื่มที่เป็นกรดอาจดึงทองแดงออกมาจากแก้วทองแดงเปล่า"),
  ],
  "mekhong-mule": [
    t("Use a mug lined with stainless steel or nickel, or a tall glass. Acidic drinks can pull copper out of bare copper.", "ใช้แก้วมักที่เคลือบสเตนเลสหรือนิกเกิลด้านใน หรือใช้แก้วทรงสูงแทน เพราะเครื่องดื่มที่เป็นกรดอาจดึงทองแดงออกมาจากแก้วทองแดงเปล่า"),
  ],
  "virgin-mule": [
    t("Use a mug lined with stainless steel or nickel, or a tall glass, rather than bare copper.", "ใช้แก้วมักที่เคลือบสเตนเลสหรือนิกเกิลด้านใน หรือใช้แก้วทรงสูงแทนแก้วทองแดงเปล่า"),
  ],
};

/** Links from an alcoholic recipe to a non-alcoholic version. */
export const nonAlcoholicVersion: Record<string, string> = {
  mojito: "virgin-mojito",
  "pina-colada": "virgin-colada",
  "moscow-mule": "virgin-mule",
  "mekhong-mule": "virgin-mule",
  "soju-lychee-cooler": "lychee-lime-fizz",
};
