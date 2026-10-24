"use client";

import { useState } from "react";
import type { Locale } from "@/lib/types";

type Issue = "sweet" | "sour" | "strong" | "watery" | "weak" | "bitter" | "unsure";

const copy = {
  en: {
    title: "How does yours taste?",
    intro: "Compare your drink with the intended flavour, then make one small change at a time. Taste again before adding more.",
    issues: [
      ["sweet", "Too sweet"],
      ["sour", "Too sour"],
      ["strong", "Too alcoholic"],
      ["watery", "Too watery"],
      ["weak", "Not enough flavour"],
      ["bitter", "Too bitter"],
      ["unsure", "Not sure / unbalanced"],
    ] as [Issue, string][],
    advice: {
      sweet: { title: "Check the balance", text: "First check that you measured the sweetener correctly. If the recipe includes citrus, add 2.5 ml (½ tsp) of fresh juice, stir or shake as appropriate, then taste again. This may not suit spirit-forward or bitter cocktails." },
      sour: { title: "Soften the acidity", text: "Check the citrus measurement and whether your fruit is unusually sharp. If the recipe contains syrup or sugar, add 2.5 ml (½ tsp) syrup, mix, and taste again. Repeat only if needed." },
      strong: { title: "Check dilution first", text: "Make sure you used the measured spirit amount. For a shaken or stirred drink, use fresh ice and the recipe's full mixing time. If it is still too intense, add 5 ml (1 tsp) of the drink's non-alcoholic mixer or a little water when appropriate, then taste again." },
      watery: { title: "Check ice and timing", text: "Use plenty of solid ice and measure the recipe before mixing. Shake or stir for the specified time, strain promptly, and avoid leaving the drink sitting on melting ice. Adding more spirit is not the first fix." },
      weak: { title: "Find what's missing", text: "Check that every ingredient was measured and added, especially citrus, bitters, herbs, or aromatic garnish. Express fresh citrus peel over the drink if the recipe calls for it. Avoid adding more alcohol until you have checked the recipe and dilution." },
      bitter: { title: "Find the source of bitterness", text: "Check the amount of bitters, bitter liqueur, citrus pith, or over-muddled herbs. Don't remove a defining bitter ingredient from a Negroni-style drink; adjust only in small increments on your next attempt." },
      unsure: { title: "Change one thing at a time", text: "Compare the drink with the recipe's flavour profile. Check your measurements, ingredient brands, syrup strength, citrus freshness, temperature, and dilution. Make one small measured change, record it, and taste again." },
    } as Record<Issue, { title: string; text: string }>,
    note: "These are starting points, not universal fixes. Some cocktails are intentionally bitter, spirit-forward, or sharply sour. Keep the original recipe separate from your personal preference.",
  },
  th: {
    title: "รสชาติที่ได้เป็นอย่างไร?",
    intro: "ลองเทียบรสชาติที่ได้กับรสชาติที่สูตรตั้งใจไว้ แล้วปรับทีละอย่างในปริมาณน้อย ชิมอีกครั้งก่อนเติมเพิ่ม",
    issues: [
      ["sweet", "หวานเกินไป"],
      ["sour", "เปรี้ยวเกินไป"],
      ["strong", "กลิ่นหรือรสแอลกอฮอล์แรงเกินไป"],
      ["watery", "จืดหรือเจือจางเกินไป"],
      ["weak", "รสชาติไม่ชัด"],
      ["bitter", "ขมเกินไป"],
      ["unsure", "ไม่แน่ใจ / รสชาติไม่สมดุล"],
    ] as [Issue, string][],
    advice: {
      sweet: { title: "ตรวจสอบความสมดุล", text: "ตรวจว่าตวงสารให้ความหวานถูกต้องหรือไม่ หากสูตรมีน้ำส้ม น้ำมะนาว หรือน้ำเลมอน ให้ลองเพิ่มน้ำผลไม้สด 2.5 มล. (½ ช้อนชา) ผสมแล้วชิมอีกครั้ง วิธีนี้อาจไม่เหมาะกับค็อกเทลที่เน้นรสสุราหรือรสขม" },
      sour: { title: "ลดความเปรี้ยวให้สมดุล", text: "ตรวจปริมาณน้ำผลไม้และดูว่าผลไม้เปรี้ยวกว่าปกติหรือไม่ หากสูตรมีไซรัปหรือน้ำตาล ให้ลองเพิ่มไซรัป 2.5 มล. (½ ช้อนชา) ผสมแล้วชิมก่อนเติมเพิ่ม" },
      strong: { title: "ตรวจสอบการเจือจางก่อน", text: "ตรวจว่าตวงสุราตามสูตรหรือไม่ สำหรับเครื่องดื่มที่เขย่าหรือคน ให้ใช้น้ำแข็งใหม่และทำตามเวลาที่ระบุ หากยังเข้มเกินไป อาจเติมมิกเซอร์ไม่มีแอลกอฮอล์ที่อยู่ในสูตร 5 มล. (1 ช้อนชา) หรือน้ำเล็กน้อยเมื่อเหมาะสม แล้วชิมอีกครั้ง" },
      watery: { title: "ตรวจสอบน้ำแข็งและเวลา", text: "ใช้น้ำแข็งที่แข็งและมีปริมาณเพียงพอ ตวงส่วนผสมก่อนเริ่ม และเขย่าหรือคนตามเวลาที่ระบุ จากนั้นกรองเสิร์ฟทันที อย่าปล่อยเครื่องดื่มทิ้งไว้บนน้ำแข็งที่กำลังละลาย การเติมสุราเพิ่มไม่ใช่วิธีแก้แรก" },
      weak: { title: "หาว่ารสชาติส่วนไหนขาดไป", text: "ตรวจว่าส่วนผสมทุกอย่างถูกตวงและใส่ครบ โดยเฉพาะน้ำผลไม้สด บิตเทอร์ สมุนไพร หรือเปลือกผลไม้สำหรับเพิ่มกลิ่น หากสูตรระบุให้ใช้เปลือกผลไม้ ให้บิดเปลือกเหนือแก้วเพื่อปล่อยน้ำมันหอมระเหย ตรวจสูตรและการเจือจางก่อนคิดเติมแอลกอฮอล์" },
      bitter: { title: "หาที่มาของรสขม", text: "ตรวจปริมาณบิตเทอร์ เหล้ารสขม ส่วนสีขาวของเปลือกส้ม หรือสมุนไพรที่ถูกขยี้แรงเกินไป อย่าตัดส่วนผสมที่เป็นเอกลักษณ์ของค็อกเทลอย่าง Negroni ออกทันที หากจะปรับ ให้ปรับทีละน้อยในครั้งต่อไป" },
      unsure: { title: "ปรับทีละอย่าง", text: "เทียบรสชาติกับคำอธิบายของสูตร ตรวจปริมาณที่ตวง ยี่ห้อของส่วนผสม ความเข้มข้นของไซรัป ความสดของผลไม้ อุณหภูมิ และการเจือจาง จากนั้นปรับเพียงอย่างเดียวในปริมาณน้อย จดผลและชิมอีกครั้ง" },
    } as Record<Issue, { title: string; text: string }>,
    note: "คำแนะนำเหล่านี้เป็นจุดเริ่มต้น ไม่ใช่วิธีแก้ที่ใช้ได้กับทุกสูตร ค็อกเทลบางชนิดตั้งใจให้ขม เข้ม หรือเปรี้ยวชัดเจน ควรเก็บสูตรดั้งเดิมแยกจากการปรับตามความชอบส่วนตัว",
  },
} as const;

export default function TasteCoach({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<Issue | null>(null);
  const text = copy[locale];
  const advice = selected ? text.advice[selected] : null;

  return (
    <section className="taste-coach" aria-labelledby="taste-coach-title">
      <h2 id="taste-coach-title">{text.title}</h2>
      <p className="taste-coach-intro">{text.intro}</p>
      <div className="taste-coach-options" role="group" aria-label={text.title}>
        {text.issues.map(([value, label]) => (
          <button
            className="taste-coach-option"
            type="button"
            key={value}
            aria-pressed={selected === value}
            onClick={() => setSelected(selected === value ? null : value)}
          >
            {label}
          </button>
        ))}
      </div>
      {advice && (
        <div className="taste-coach-advice" aria-live="polite">
          <h3>{advice.title}</h3>
          <p>{advice.text}</p>
        </div>
      )}
      <p className="taste-coach-note">{text.note}</p>
    </section>
  );
}
