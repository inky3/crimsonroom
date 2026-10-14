import { t } from "@/lib/i18n";
import type { Text, ToolKey } from "@/lib/types";

export const toolGuide: Record<ToolKey, { what: Text; swap: Text }> = {
  shaker: {
    what: t("A metal tin, or a cup with a lid. Used to chill and dilute drinks that contain juice, cream or egg.", "กระบอกโลหะหรือแก้วพร้อมฝาปิด ใช้เขย่าให้เย็นและเจือจางพอดีสำหรับเครื่องดื่มที่มีน้ำผลไม้ ครีม หรือไข่"),
    swap: t("A clean jar with a tight lid.", "ขวดโหลสะอาดที่ปิดฝาแน่น"),
  },
  jigger: {
    what: t("Measures spirits accurately. Usually 30 ml on one side and 45 or 60 ml on the other.", "ตวงเหล้าให้แม่นยำ ปกติด้านหนึ่ง 30 มล. อีกด้านหนึ่ง 45 หรือ 60 มล."),
    swap: t("A small measuring cup or a shot glass. Check how much it holds first.", "ถ้วยตวงเล็กหรือแก้วช็อต ควรเช็กก่อนว่าจุได้กี่มล."),
  },
  hawthorne: {
    what: t("A flat strainer with a spring that sits on top of the shaker and holds the ice back as you pour.", "ที่กรองแบนมีสปริง วางบนเชคเกอร์เพื่อกั้นน้ำแข็งตอนเท"),
    swap: t("A tea strainer.", "ที่กรองชา"),
  },
  fine: {
    what: t("A small mesh strainer used together with the Hawthorne (double straining) to stop ice chips and fruit pulp.", "ที่กรองตาข่ายละเอียด ใช้คู่กับฮอว์ธอร์น (กรองสองชั้น) เพื่อกันเศษน้ำแข็งและเนื้อผลไม้"),
    swap: t("A small tea strainer.", "กระชอนชาเล็ก ๆ"),
  },
  mixingGlass: {
    what: t("A sturdy tall glass for stirring drinks that contain only spirits and liqueurs.", "แก้วสูงหนาสำหรับคนเครื่องดื่มที่มีแต่เหล้าและลิเคียร์"),
    swap: t("A pint glass or a large jar.", "แก้วไพนต์หรือโหลแก้วใบใหญ่"),
  },
  barSpoon: {
    what: t("A long spoon for stirring, and for floating cream or spirits on top.", "ช้อนด้ามยาว ใช้คน และใช้เทครีมหรือเหล้าให้ลอยด้านบน"),
    swap: t("Any long-handled teaspoon.", "ช้อนชาด้ามยาว"),
  },
  muddler: {
    what: t("Presses mint, fruit and sugar to release their flavour.", "แท่งกดสำหรับบดสะระแหน่ ผลไม้ และน้ำตาลให้ได้รสและกลิ่น"),
    swap: t("The end of a wooden spoon.", "ด้านปลายของช้อนไม้"),
  },
  juicer: {
    what: t("Squeezes citrus. Fresh juice makes a bigger difference than any other upgrade.", "ที่คั้นน้ำส้มและมะนาว น้ำสดคั้นใหม่ช่วยให้เครื่องดื่มดีขึ้นมากกว่าการอัปเกรดอย่างอื่น"),
    swap: t("Squeeze by hand over a small strainer.", "บีบด้วยมือเหนือกระชอนเล็ก ๆ"),
  },
  peeler: {
    what: t("Takes wide strips of citrus peel for garnish and aroma.", "ปอกเปลือกส้มและมะนาวเป็นแถบยาว ใช้ตกแต่งและให้กลิ่นหอม"),
    swap: t("A small paring knife. Avoid the white part, which is bitter.", "มีดปอกผลไม้เล็ก ๆ หลีกเลี่ยงส่วนสีขาวเพราะขม"),
  },
  blender: {
    what: t("For frozen and blended drinks such as the Piña Colada.", "ใช้ปั่นเครื่องดื่มแบบฟรอสต์ เช่น ปีญา โคลาดา"),
    swap: t("A stick blender in a tall jug can work.", "เครื่องปั่นมือถือในเหยือกสูงพอใช้ได้"),
  },
  knife: {
    what: t("A small, sharp knife for wedges, wheels and slices.", "มีดเล็กคมสำหรับหั่นเป็นซีก เป็นแว่น และชิ้นตกแต่ง"),
    swap: t("Any small, sharp kitchen knife.", "มีดครัวเล็กที่คม"),
  },
};

export const techniques: { id: string; title: Text; body: Text }[] = [
  {
    id: "shaking",
    title: t("Shaking", "การเขย่า"),
    body: t("Use it for drinks with juice, cream or egg. Fill the shaker two thirds with ice, close it firmly, and shake hard for 10 to 15 seconds, until the outside is frosty.", "ใช้กับเครื่องดื่มที่มีน้ำผลไม้ ครีม หรือไข่ ใส่น้ำแข็งสองในสามของเชคเกอร์ ปิดให้แน่น แล้วเขย่าแรง ๆ 10 ถึง 15 วินาที จนด้านนอกเป็นฝ้าเย็น"),
  },
  {
    id: "stirring",
    title: t("Stirring", "การคน"),
    body: t("Use it for drinks made only of spirits and liqueurs. Stir with ice for 20 to 30 seconds. It chills the drink without making it cloudy.", "ใช้กับเครื่องดื่มที่มีแต่เหล้าและลิเคียร์ คนกับน้ำแข็ง 20 ถึง 30 วินาที ทำให้เย็นโดยไม่ทำให้ขุ่น"),
  },
  {
    id: "building",
    title: t("Building", "การผสมในแก้ว"),
    body: t("Pour straight into the serving glass over ice. Add the fizzy ingredient last and stir once, gently, to keep the bubbles.", "เทลงแก้วที่เสิร์ฟโดยตรงบนน้ำแข็ง ใส่ส่วนผสมที่มีฟองเป็นอย่างสุดท้าย แล้วคนเบา ๆ แค่ครั้งเดียวเพื่อรักษาฟอง"),
  },
  {
    id: "muddling",
    title: t("Muddling", "การบด"),
    body: t("Press, do not smash. Mint needs only a gentle press, or it turns bitter. Citrus and sugar can take firm pressure.", "กด อย่าทุบ สะระแหน่ต้องการแค่กดเบา ๆ ไม่อย่างนั้นจะขม ส่วนมะนาวและน้ำตาลกดแรงได้"),
  },
  {
    id: "double-straining",
    title: t("Double straining", "การกรองสองชั้น"),
    body: t("Pour through the Hawthorne and the fine strainer together, so ice chips and pulp stay out. Good for drinks served without ice.", "เทผ่านที่กรองฮอว์ธอร์นและที่กรองละเอียดพร้อมกัน เพื่อกันเศษน้ำแข็งและเนื้อผลไม้ เหมาะกับเครื่องดื่มที่เสิร์ฟโดยไม่ใส่น้ำแข็ง"),
  },
  {
    id: "dry-shake",
    title: t("Dry shaking", "การเขย่าแบบไม่ใส่น้ำแข็ง"),
    body: t("For egg white: shake without ice for 10 seconds, then again with ice. It builds a thick, silky foam.", "สำหรับไข่ขาว ให้เขย่าโดยไม่ใส่น้ำแข็ง 10 วินาที แล้วเขย่าอีกครั้งพร้อมน้ำแข็ง จะได้ฟองข้นเนียน"),
  },
  {
    id: "peel",
    title: t("Expressing a peel", "การบีบเปลือกส้ม"),
    body: t("Squeeze a strip of citrus peel, skin side toward the drink, over the glass. A fine spray of oil lands on top and adds aroma.", "บีบแถบเปลือกส้มหรือมะนาวโดยให้ด้านผิวหันเข้าหาเครื่องดื่มเหนือแก้ว น้ำมันหอมระเหยจะพรมลงด้านบนและเพิ่มกลิ่น"),
  },
  {
    id: "ice",
    title: t("Ice", "น้ำแข็ง"),
    body: t("More ice keeps a drink colder and less watery. Use big, solid cubes where you can, and put fresh ice in the serving glass rather than the ice you shook with.", "น้ำแข็งเยอะช่วยให้เย็นนานและไม่เจือจางเร็ว ใช้ก้อนใหญ่และแน่นเมื่อทำได้ และใช้น้ำแข็งใหม่ในแก้วที่เสิร์ฟ ไม่ใช่น้ำแข็งที่ใช้เขย่า"),
  },
  {
    id: "chilling",
    title: t("Chilling glasses", "การแช่แก้วให้เย็น"),
    body: t("Put glasses in the freezer for 15 minutes, or fill them with ice water while you work. Drinks served without ice need this.", "แช่แก้วในช่องแช่แข็ง 15 นาที หรือเติมน้ำแข็งกับน้ำไว้ระหว่างทำ เครื่องดื่มที่เสิร์ฟโดยไม่ใส่น้ำแข็งต้องทำขั้นตอนนี้"),
  },
  {
    id: "syrup",
    title: t("Simple syrup", "น้ำเชื่อม"),
    body: t("Dissolve equal parts sugar and hot water, let it cool, and keep it in a bottle in the fridge for about two weeks.", "ละลายน้ำตาลกับน้ำร้อนอย่างละเท่ากัน ทิ้งให้เย็น แล้วเก็บในขวดในตู้เย็นได้ประมาณสองสัปดาห์"),
  },
];

export const starter = {
  bottlesTitle: t("Start with six bottles", "เริ่มต้นด้วยเหล้าหกขวด"),
  bottles: [
    t("Gin", "จิน"),
    t("White rum", "รัมขาว"),
    t("Bourbon or whisky", "เบอร์เบินหรือวิสกี้"),
    t("Vodka", "วอดก้า"),
    t("Tequila blanco", "เตกีล่าบลังโก"),
    t("Triple sec or Cointreau", "ทริปเปิลเซกหรือคอยน์โทร"),
  ],
  nextTitle: t("Add these next", "เพิ่มสิ่งเหล่านี้ต่อมา"),
  next: t(
    "Sweet vermouth, dry vermouth, Campari and Angostura bitters. With these you can make the Negroni, Manhattan, Martini and Old Fashioned.",
    "สวีทเวอร์มุท ดรายเวอร์มุท แคมปารี และแองโกสทูร่าบิตเตอร์ส ด้วยสิ่งเหล่านี้จะทำเนโกรนี แมนฮัตตัน มาร์ตินี และโอลด์ แฟชั่นด์ได้"
  ),
  alwaysTitle: t("Always have", "ควรมีติดบ้านเสมอ"),
  always: t(
    "Limes and lemons, sugar for syrup, soda water, tonic water and plenty of ice.",
    "มะนาวและเลมอน น้ำตาลสำหรับทำน้ำเชื่อม โซดา โทนิกวอเตอร์ และน้ำแข็งเยอะ ๆ"
  ),
  toolsTitle: t("Start with three tools", "เริ่มต้นด้วยอุปกรณ์สามอย่าง"),
  tools: t(
    "A shaker, a jigger and a strainer. Everything else can be swapped for something from your kitchen.",
    "เชคเกอร์ จิ๊กเกอร์ และที่กรอง อย่างอื่นใช้ของในครัวแทนได้"
  ),
};
