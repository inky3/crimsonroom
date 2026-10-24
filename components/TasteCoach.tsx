"use client";

import { useState } from "react";
import type { Locale, MethodKey } from "@/lib/types";

type Issue = "sweet" | "sour" | "strong" | "watery" | "weak" | "bitter" | "unsure";

const labels = {
  en: {
    title: "How does yours taste?",
    intro: "Choose what you notice. The advice below uses this cocktail's actual ingredients and method.",
    issues: [["sweet", "Too sweet"], ["sour", "Too sour"], ["strong", "Too alcoholic"], ["watery", "Too watery"], ["weak", "Not enough flavour"], ["bitter", "Too bitter"], ["unsure", "Not sure / unbalanced"]] as [Issue, string][],
    note: "Make one small change at a time and taste again. These suggestions help diagnose the recipe; they don't mean you did something wrong.",
    measured: "Try reducing this ingredient by 2.5 ml (½ tsp) next time, then taste again.",
  },
  th: {
    title: "รสชาติที่ได้เป็นอย่างไร?",
    intro: "เลือกอาการที่เจอ คำแนะนำจะอิงจากส่วนผสมและวิธีทำของค็อกเทลแก้วนี้โดยตรง",
    issues: [["sweet", "หวานเกินไป"], ["sour", "เปรี้ยวเกินไป"], ["strong", "รสแอลกอฮอล์แรงเกินไป"], ["watery", "จืดหรือเจือจางเกินไป"], ["weak", "รสชาติไม่ชัด"], ["bitter", "ขมเกินไป"], ["unsure", "ไม่แน่ใจ / รสชาติไม่สมดุล"]] as [Issue, string][],
    note: "ปรับทีละอย่างในปริมาณน้อยแล้วชิมใหม่ คำแนะนำนี้ช่วยหาสาเหตุ ไม่ได้หมายความว่าคุณทำผิด",
    measured: "ครั้งถัดไปลองลดส่วนผสมนี้ลง 2.5 มล. (½ ช้อนชา) แล้วชิมอีกครั้ง",
  },
} as const;

function buildAdvice(locale: Locale, issue: Issue, ingredients: string[], method: MethodKey) {
  const th = locale === "th";
  const find = (...words: string[]) => ingredients.find((ingredient) => words.some((word) => ingredient.toLowerCase().includes(word)));
  const citrus = find("lime", "lemon", "grapefruit", "orange juice", "น้ำมะนาว", "เลมอน", "เกรปฟรุต");
  const sweetener = find("syrup", "sugar", "honey", "grenadine", "น้ำเชื่อม", "น้ำตาล", "น้ำผึ้ง");
  const bitter = find("bitters", "campari", "amaro", "fernet", "vermouth", "บิตเทอร์", "คัมพารี", "เวอร์มุท");
  const mixer = find("soda", "tonic", "juice", "ginger beer", "cola", "น้ำ", "โซดา", "น้ำผลไม้");
  const spirit = find("gin", "rum", "vodka", "whisky", "whiskey", "tequila", "cachaça", "soju", "brandy", "จิน", "รัม", "วอดก้า");
  const title = (en: string, thai: string) => th ? thai : en;
  const text = (en: string, thai: string) => th ? thai : en;
  switch (issue) {
    case "sweet":
      if (citrus) return { title: title("Balance the sweetness", "ปรับสมดุลความหวาน"), text: text(`This recipe includes ${citrus}. Next time, add 2.5 ml (½ tsp) less ${sweetener ?? "sweetener"} first. If it is still too sweet, add only 2.5 ml of ${citrus} and taste again.`, `สูตรนี้มี${citrus} ครั้งถัดไปให้ลด${sweetener ?? "ส่วนผสมให้ความหวาน"}ลง 2.5 มล. ก่อน หากยังหวานเกินไป ค่อยเพิ่ม${citrus}อีก 2.5 มล. แล้วชิมใหม่`) };
      if (sweetener) return { title: title("Reduce the sweetener", "ลดส่วนผสมที่ให้ความหวาน"), text: text(`There is no citrus in this recipe to balance the sweetness. Reduce ${sweetener} by 2.5 ml (½ tsp) next time, keeping the other amounts unchanged.`, `สูตรนี้ไม่มีส่วนผสมรสเปรี้ยวสำหรับตัดหวาน ครั้งถัดไปให้ลด${sweetener}ลง 2.5 มล. โดยคงส่วนผสมอื่นเท่าเดิม`) };
      return { title: title("Check the measured ingredients", "ตรวจปริมาณส่วนผสม"), text: text(`This recipe has no obvious sweetener to adjust. Recheck the amounts you poured, especially any juice or liqueur listed in the recipe, and change only one measured amount next time.`, `สูตรนี้ไม่มีส่วนผสมให้ความหวานที่ชัดเจนให้ลดได้ ลองตรวจปริมาณน้ำผลไม้หรือเหล้าหวานที่ระบุในสูตร แล้วปรับเพียงปริมาณเดียวในครั้งถัดไป`) };
    case "sour":
      if (sweetener && citrus) return { title: title("Ease the citrus", "ลดความเปรี้ยวจากน้ำผลไม้"), text: text(`The recipe uses ${citrus} and ${sweetener}. Next time, reduce ${citrus} by 2.5 ml (½ tsp) first; keep the sweetener unchanged so you can tell whether that fixes the sharpness.`, `สูตรนี้ใช้${citrus}และ${sweetener} ครั้งถัดไปให้ลด${citrus}ลง 2.5 มล. ก่อน โดยยังไม่เปลี่ยนปริมาณความหวาน จะได้รู้ว่าความเปรี้ยวลดลงหรือไม่`) };
      if (citrus) return { title: title("Reduce the citrus slightly", "ลดน้ำผลไม้รสเปรี้ยวเล็กน้อย"), text: text(`The recipe's citrus is ${citrus}. Reduce it by 2.5 ml (½ tsp) next time and keep the other ingredients unchanged.`, `น้ำผลไม้รสเปรี้ยวในสูตรคือ${citrus} ครั้งถัดไปให้ลดลง 2.5 มล. และคงส่วนผสมอื่นเท่าเดิม`) };
      return { title: title("Check the ingredient balance", "ตรวจสมดุลส่วนผสม"), text: text(`This recipe doesn't list lemon or lime. Don't add citrus to fix it. Recheck the listed amounts and taste the drink after it reaches the recipe's intended dilution.`, `สูตรนี้ไม่มีเลมอนหรือมะนาว จึงไม่ควรเติมน้ำเปรี้ยวเพื่อแก้รส ลองตรวจปริมาณตามสูตรและชิมเมื่อเครื่องดื่มเจือจางตามวิธีที่ระบุแล้ว`) };
    case "strong":
      return { title: title("Soften the alcohol intensity", "ลดความแรงของรสแอลกอฮอล์"), text: spirit ? text(`The main spirit here is ${spirit}. First confirm you measured it correctly. ${method === "shake" ? "Shake with plenty of fresh ice for the full recipe time, then strain." : method === "stir" ? "Stir with ice for the full recipe time before straining." : "Build it over a full glass of ice and stir as directed."} If it still tastes too intense, add 5 ml of ${mixer ?? "cold water"} and taste before adding more.`, `สุราหลักของสูตรนี้คือ${spirit} ตรวจว่าตวงถูกต้องก่อน ${method === "shake" ? "เขย่ากับน้ำแข็งใหม่ให้ครบเวลาตามสูตรแล้วกรอง" : method === "stir" ? "คนกับน้ำแข็งให้ครบเวลาตามสูตรแล้วกรอง" : "ใส่น้ำแข็งให้เต็มแก้วและคนตามขั้นตอน"} หากยังแรงเกินไป ให้เติม${mixer ?? "น้ำเย็น"} 5 มล. แล้วชิมก่อนเติมอีก`) : text("Recheck each measured amount and follow the recipe's ice and mixing time. If it still tastes intense, add 5 ml cold water and taste again.", "ตรวจปริมาณที่ตวงและทำตามเวลาใช้น้ำแข็งและผสมของสูตร หากยังแรงเกินไปให้เติมน้ำเย็น 5 มล. แล้วชิมใหม่") };
    case "watery":
      return { title: title("Control dilution", "ควบคุมการเจือจาง"), text: text(`${method === "shake" ? "Shake hard for the recipe's stated time, then strain immediately." : method === "stir" ? "Stir with solid ice for the stated time, then strain immediately." : "Use fresh, solid ice and follow the recipe's build order."} Avoid leaving the finished drink sitting on melting ice. Don't add more spirit until you check the method.`, `${method === "shake" ? "เขย่าแรงตามเวลาที่สูตรระบุแล้วกรองทันที" : method === "stir" ? "คนกับน้ำแข็งก้อนแข็งตามเวลาที่ระบุแล้วกรองทันที" : "ใช้น้ำแข็งใหม่ที่แข็งและเรียงขั้นตอนตามสูตร"} อย่าปล่อยเครื่องดื่มที่เสร็จแล้วแช่น้ำแข็งละลายนาน ๆ ตรวจวิธีทำก่อนคิดเติมสุรา`) };
    case "weak":
      return { title: title("Identify the missing flavour", "หาว่ารสชาติส่วนไหนขาด"), text: text(`Check that you added every listed ingredient: ${ingredients.join(", ")}. If all are present, check the recipe's garnish and mixing time; those can affect aroma and balance. Don't add extra spirit as the first fix.`, `ตรวจว่าใส่ส่วนผสมตามสูตรครบหรือไม่: ${ingredients.join(", ")} หากครบแล้ว ให้ตรวจเครื่องตกแต่งและเวลาผสม เพราะมีผลต่อกลิ่นและความสมดุล อย่าเพิ่งเติมสุราเพิ่มเป็นอย่างแรก`) };
    case "bitter":
      if (bitter) return { title: title("Adjust the bitter ingredient", "ปรับส่วนผสมที่ให้รสขม"), text: text(`This recipe includes ${bitter}. Check that you measured it accurately. Next time, reduce ${bitter} slightly (for bitters, try one fewer dash) while keeping everything else the same. If it is a defining ingredient, adjust rather than omit it.`, `สูตรนี้มี${bitter} ตรวจว่าตวงถูกต้อง ครั้งถัดไปให้ลด${bitter}เล็กน้อย (ถ้าเป็นบิตเทอร์ให้ลดหนึ่งแดช) โดยคงส่วนผสมอื่นเท่าเดิม หากเป็นส่วนสำคัญของสูตรให้ลดปริมาณแทนการตัดออก`) };
      return { title: title("Check technique before changing ingredients", "ตรวจวิธีทำก่อนเปลี่ยนส่วนผสม"), text: text(`This recipe doesn't list a bitter liqueur or cocktail bitters. Don't remove ingredients that aren't there. Check whether any herbs were pressed too hard or the drink sat on melting ice; if neither applies, recheck measurements and ingredient freshness.`, `สูตรนี้ไม่มีเหล้ารสขมหรือบิตเทอร์ จึงไม่ต้องตัดส่วนผสมเหล่านั้นออก ลองตรวจว่าขยี้สมุนไพรแรงเกินไปหรือปล่อยเครื่องดื่มแช่น้ำแข็งละลายนานหรือไม่ หากไม่ใช่ ให้ตรวจปริมาณและความสดของส่วนผสม`) };
    case "unsure":
      return { title: title("Run one small test", "ทดลองปรับทีละจุด"), text: text(`For this recipe, start by rechecking the amounts of: ${ingredients.join(", ")}. Keep the recipe's method (${method}) consistent, then change only the ingredient that seems out of balance by 2.5 ml (½ tsp) where practical.`, `สำหรับสูตรนี้ ให้เริ่มจากตรวจปริมาณของ: ${ingredients.join(", ")} ทำตามวิธี${method}ให้เหมือนเดิม แล้วปรับเฉพาะส่วนผสมที่รู้สึกว่าไม่สมดุลทีละอย่าง ครั้งละ 2.5 มล. เมื่อเหมาะสม`) };
  }
}

export default function TasteCoach({ locale, ingredients, method }: { locale: Locale; ingredients: string[]; method: MethodKey }) {
  const [selected, setSelected] = useState<Issue | null>(null);
  const text = labels[locale];
  const advice = selected ? buildAdvice(locale, selected, ingredients, method) : null;

  return (
    <section className="taste-coach" aria-labelledby="taste-coach-title">
      <h2 id="taste-coach-title">{text.title}</h2>
      <p className="taste-coach-intro">{text.intro}</p>
      <div className="taste-coach-options" role="group" aria-label={text.title}>
        {text.issues.map(([value, label]) => (
          <button className="taste-coach-option" type="button" key={value} aria-pressed={selected === value} onClick={() => setSelected(selected === value ? null : value)}>
            {label}
          </button>
        ))}
      </div>
      {advice && <div className="taste-coach-advice" aria-live="polite"><h3>{advice.title}</h3><p>{advice.text}</p></div>}
      <p className="taste-coach-note">{text.note}</p>
    </section>
  );
}
