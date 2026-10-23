"use client";

import type { Locale, Taste } from "@/lib/types";

type Profile = { headline: string; journey: string; finish: string; cues: string[] };

const profiles: Record<string, Record<Locale, Profile>> = {
  daiquiri: {
    en: { headline: "Bright, crisp, and rum-forward", journey: "Fresh lime arrives first, followed by clean sugar sweetness and the light, grassy character of white rum.", finish: "A clean, zesty finish. It should feel lively, not harshly sour or syrupy.", cues: ["Fresh citrus", "Light sweetness", "Clean rum"] },
    th: { headline: "สดชื่น เปรี้ยวชัด และมีกลิ่นรัม", journey: "เริ่มด้วยมะนาวสด ตามด้วยความหวานบาง ๆ และกลิ่นรัมขาวที่สะอาด", finish: "จบด้วยความสดชื่นของซิตรัส ไม่ควรเปรี้ยวแหลมหรือหวานเหนียวเกินไป", cues: ["ซิตรัสสด", "หวานเล็กน้อย", "กลิ่นรัมสะอาด"] },
  },
  margarita: {
    en: { headline: "Tangy citrus with a rounded tequila core", journey: "Lime gives the first sharp, fresh hit; orange liqueur rounds it out while tequila stays present underneath.", finish: "A dry, citrusy finish. Salt should sharpen the flavours, not make the drink taste salty.", cues: ["Lime-forward", "Orange aroma", "Agave spirit"] },
    th: { headline: "ซิตรัสเปรี้ยวสดกับเตกีล่าที่กลมกล่อม", journey: "มะนาวให้รสเปรี้ยวสดก่อน ตามด้วยกลิ่นส้มจากลิเคียวร์และรสเตกีล่าที่อยู่ด้านหลัง", finish: "จบแบบแห้งและสดชื่น เกลือควรช่วยขับรส ไม่ใช่ทำให้เค็ม", cues: ["มะนาวเด่น", "กลิ่นส้ม", "เตกีล่า"] },
  },
  "old-fashioned": {
    en: { headline: "Rich, aromatic, and spirit-led", journey: "Whisky leads with warm oak and grain notes; sugar softens the edges while bitters add spice.", finish: "Long and warming, with orange oils lifting the aroma. It should not taste like straight whisky with undissolved sugar.", cues: ["Warm whisky", "Baking spice", "Orange oils"] },
    th: { headline: "เข้มข้น หอมเครื่องเทศ และเน้นวิสกี้", journey: "วิสกี้นำด้วยกลิ่นไม้โอ๊กและธัญพืช น้ำตาลช่วยให้รสนุ่มขึ้น ส่วนบิตเตอร์เพิ่มกลิ่นเครื่องเทศ", finish: "ทิ้งรสอุ่นยาวนาน พร้อมกลิ่นน้ำมันจากเปลือกส้ม ไม่ควรเหมือนดื่มวิสกี้เปล่าที่มีน้ำตาลละลายไม่หมด", cues: ["วิสกี้อุ่น ๆ", "เครื่องเทศ", "น้ำมันเปลือกส้ม"] },
  },
  mojito: {
    en: { headline: "Cool mint, bright lime, and light sweetness", journey: "Mint aroma and lime freshness lead, with rum underneath and soda lifting the whole drink.", finish: "Light, crisp, and refreshing. Mint should smell fresh, not grassy or bitter from over-muddling.", cues: ["Fresh mint", "Lime", "Bubbly finish"] },
    th: { headline: "สะระแหน่หอม มะนาวสด และหวานบาง ๆ", journey: "กลิ่นสะระแหน่และมะนาวมาก่อน ตามด้วยรัมและโซดาที่ช่วยให้เครื่องดื่มเบาสบาย", finish: "ควรสดชื่นและดื่มง่าย กลิ่นสะระแหน่ควรหอมสด ไม่เขียวหรือขมจากการบดแรงเกินไป", cues: ["สะระแหน่สด", "มะนาว", "ซ่าปลายลิ้น"] },
  },
  negroni: {
    en: { headline: "Bittersweet, herbal, and boldly aromatic", journey: "Bitter orange and herbal aperitif notes meet sweet vermouth and a firm gin backbone.", finish: "A long, bittersweet finish is the point. It should be balanced, not simply sugary or aggressively bitter.", cues: ["Bitter orange", "Herbal notes", "Gin-led"] },
    th: { headline: "ขมหวาน หอมสมุนไพร และชัดเจน", journey: "กลิ่นส้มขมและสมุนไพรจากอะเพอริทีฟผสานกับสวีทเวอร์มุทและจิน", finish: "รสขมหวานควรค้างอยู่พอสมควร นี่คือเอกลักษณ์ของ Negroni แต่ไม่ควรหวานหรือขมโดดด้านเดียว", cues: ["ส้มขม", "สมุนไพร", "จินเด่น"] },
  },
  "dry-martini": {
    en: { headline: "Dry, botanical, and clean", journey: "Gin's juniper and botanical aromas lead, while a small amount of dry vermouth adds subtle herbal and wine notes.", finish: "Crisp and dry, not sweet. Chilling and dilution are essential to keep the alcohol from feeling rough.", cues: ["Juniper", "Subtle herbs", "Dry finish"] },
    th: { headline: "แห้ง หอมพฤกษชาติ และสะอาด", journey: "กลิ่นจูนิเปอร์และพฤกษชาติจากจินนำ ตามด้วยกลิ่นสมุนไพรและไวน์บาง ๆ จากดรายเวอร์มุท", finish: "จบแบบแห้ง ไม่หวาน การแช่เย็นและการเจือจางที่พอดีช่วยไม่ให้แอลกอฮอล์บาดคอ", cues: ["จูนิเปอร์", "สมุนไพรบาง ๆ", "จบแบบแห้ง"] },
  },
  "whiskey-sour": {
    en: { headline: "Citrus brightness against warm whisky", journey: "Lemon brings a clear tartness, syrup rounds the acidity, and whisky gives the drink its warm, woody base.", finish: "Balanced sweet-and-sour with a whisky finish. If using egg white, expect a silky texture and soft foam.", cues: ["Fresh lemon", "Sweet-sour balance", "Warm whisky"] },
    th: { headline: "เลมอนสดตัดกับวิสกี้ที่อบอุ่น", journey: "เลมอนให้ความเปรี้ยวชัด ไซรัปช่วยกลมกล่อม และวิสกี้ให้รสฐานที่อุ่นและมีมิติ", finish: "ควรสมดุลระหว่างหวานกับเปรี้ยว พร้อมรสวิสกี้ตอนท้าย หากใส่ไข่ขาว เนื้อสัมผัสจะนุ่มและมีฟองละเอียด", cues: ["เลมอนสด", "หวานเปรี้ยวสมดุล", "วิสกี้อุ่น"] },
  },
  "moscow-mule": {
    en: { headline: "Zingy ginger with a sharp lime lift", journey: "Ginger beer brings spice and bubbles; lime cuts through with freshness while vodka stays relatively neutral.", finish: "Effervescent and spicy-citrus. The ginger should be lively without drowning out the lime.", cues: ["Ginger spice", "Lime", "Bubbles"] },
    th: { headline: "ขิงซ่า ๆ พร้อมมะนาวที่สดชื่น", journey: "จินเจอร์เบียร์ให้ความเผ็ดซ่าและฟอง ส่วนมะนาวช่วยเพิ่มความสดชื่น ขณะที่วอดก้ามีรสค่อนข้างเป็นกลาง", finish: "ควรซ่าและหอมขิงผสมซิตรัส โดยขิงไม่ควรกลบรสมะนาวทั้งหมด", cues: ["ขิงซ่า", "มะนาว", "ฟองซ่า"] },
  },
  "espresso-martini": {
    en: { headline: "Roasty coffee with a smooth, bittersweet body", journey: "Coffee aroma leads, followed by roasted bitterness, coffee liqueur sweetness, and vodka underneath.", finish: "A velvety foam and lingering coffee finish. It should be coffee-forward, not merely taste of alcohol or syrup.", cues: ["Roasted coffee", "Bittersweet", "Velvety foam"] },
    th: { headline: "กาแฟคั่วหอม เข้มข้น และขมหวาน", journey: "กลิ่นกาแฟนำ ตามด้วยความขมจากกาแฟคั่ว ความหวานของเหล้ากาแฟ และวอดก้าที่อยู่ด้านหลัง", finish: "ควรมีฟองเนียนและทิ้งกลิ่นกาแฟ ไม่ใช่มีแต่รสแอลกอฮอล์หรือน้ำเชื่อม", cues: ["กาแฟคั่ว", "ขมหวาน", "ฟองเนียน"] },
  },
  "pina-colada": {
    en: { headline: "Creamy tropical fruit with gentle rum", journey: "Pineapple gives sweet-tart fruitiness, coconut adds a rich creamy texture, and rum ties it together.", finish: "Smooth and tropical. It should not feel cloying; a little pineapple acidity keeps the coconut richness in check.", cues: ["Pineapple", "Creamy coconut", "Soft rum"] },
    th: { headline: "ผลไม้เมืองร้อน เนื้อสัมผัสครีมมี่ และรัมบาง ๆ", journey: "สับปะรดให้รสหวานอมเปรี้ยว มะพร้าวเพิ่มความมันนุ่ม และรัมช่วยเชื่อมรสเข้าด้วยกัน", finish: "ควรนุ่มและหอมแบบทรอปิคอล ไม่หวานเลี่ยน โดยความเปรี้ยวของสับปะรดช่วยตัดความมันของมะพร้าว", cues: ["สับปะรด", "มะพร้าวครีมมี่", "รัมละมุน"] },
  },
};

const labels = {
  en: { title: "Taste profile", expected: "What you should taste", finish: "The finish", note: "Taste is personal and ingredients vary. Use this as a guide, not a strict pass/fail test." },
  th: { title: "โปรไฟล์รสชาติ", expected: "รสชาติที่ควรสัมผัส", finish: "รสชาติหลังกลืน", note: "การรับรสเป็นเรื่องส่วนบุคคลและวัตถุดิบแตกต่างกันได้ ใช้คำอธิบายนี้เป็นแนวทาง ไม่ใช่เกณฑ์ตัดสินตายตัว" },
};

export default function TasteProfile({ slug, locale, taste, ingredients }: { slug: string; locale: Locale; taste: Taste; ingredients: string[] }) {
  const t = labels[locale];
  const profile = profiles[slug]?.[locale] ?? (() => {
    const level = (value: number, low: string, medium: string, high: string) => value <= 1 ? low : value <= 3 ? medium : high;
    const descriptors = locale === "en"
      ? {
          sweet: level(taste.sweet, "very dry", "gently sweet", "sweet-forward"),
          sour: level(taste.sour, "low in acidity", "brightly balanced", "tart and citrus-led"),
          bitter: level(taste.bitter, "little bitterness", "a touch of bitterness", "distinctly bitter"),
          strength: level(taste.strength, "light in alcohol character", "noticeably spirit-led", "bold and spirit-forward"),
          journey: `Expect ${level(taste.sweet, "little sweetness", "some sweetness", "pronounced sweetness")}, ${level(taste.sour, "gentle acidity", "a fresh acidic lift", "a pronounced tart edge")}, and ${level(taste.bitter, "minimal bitterness", "some bitter complexity", "a strong bitter note")}.`,
          finish: `The overall impression should be ${level(taste.strength, "light and easy-going", "balanced with a clear spirit character", "intense and spirit-forward")}. Adjust to your preference after tasting.`,
          note: "General profile inferred from the recipe's taste ratings; a more specific tasting note has not been written for this cocktail yet."
        }
      : {
          sweet: level(taste.sweet, "หวานน้อยมาก", "หวานพอดี", "เน้นความหวาน"),
          sour: level(taste.sour, "มีความเปรี้ยวน้อย", "เปรี้ยวสดชื่นอย่างสมดุล", "เปรี้ยวชัด"),
          bitter: level(taste.bitter, "แทบไม่มีรสขม", "มีรสขมเล็กน้อย", "มีรสขมเด่น"),
          strength: level(taste.strength, "สัมผัสแอลกอฮอล์เบา", "รับรู้รสสุราได้ชัด", "เน้นรสสุราอย่างเข้มข้น"),
          journey: `คาดว่าจะได้ความ${level(taste.sweet, "หวานน้อย", "หวานพอดี", "หวานเด่น")} ความ${level(taste.sour, "เปรี้ยวน้อย", "เปรี้ยวสดชื่น", "เปรี้ยวชัด")} และ${level(taste.bitter, "ขมน้อย", "ขมเล็กน้อย", "ขมเด่น")}.`,
          finish: `ภาพรวมควรให้สัมผัสแบบ${level(taste.strength, "เบาและดื่มง่าย", "สมดุลแต่ยังรับรู้รสสุรา", "เข้มข้นและเน้นรสสุรา")} ปรับตามความชอบหลังจากชิม`,
          note: "คำอธิบายนี้ประเมินจากคะแนนรสชาติของสูตร ยังไม่มีบันทึกการชิมเฉพาะสำหรับค็อกเทลแก้วนี้"
        };
    return {
      headline: locale === "en" ? `A ${descriptors.sweet}, ${descriptors.sour} cocktail` : `ค็อกเทลที่${descriptors.sweet}และ${descriptors.sour}`,
      journey: descriptors.journey,
      finish: descriptors.finish,
      cues: ingredients.slice(0, 3),
      _note: descriptors.note,
    };
  })();

  return (
    <section className="taste-profile" aria-labelledby="taste-profile-title">
      <div className="taste-profile-heading">
        <span className="taste-profile-eyebrow">{t.title}</span>
        <h3 id="taste-profile-title">{profile.headline}</h3>
      </div>
      <div className="taste-profile-grid">
        <div>
          <h4>{t.expected}</h4>
          <p>{profile.journey}</p>
        </div>
        <div>
          <h4>{t.finish}</h4>
          <p>{profile.finish}</p>
        </div>
      </div>
      <ul className="taste-profile-cues">
        {profile.cues.map((cue) => <li key={cue}>{cue}</li>)}
      </ul>
      <p className="taste-profile-note">{"_note" in profile ? profile._note : t.note}</p>
    </section>
  );
}
