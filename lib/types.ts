export type Locale = "en" | "th";

/** A piece of text in English, with an optional Thai version. */
export type Text = { en: string; th?: string };

export const tasteKeys = ["sweet", "sour", "bitter", "rough", "strength"] as const;
export type TasteKey = (typeof tasteKeys)[number];
/** Each value is 0 to 5. */
export type Taste = Record<TasteKey, number>;

export type GlassKey = "coupe" | "martini" | "rocks" | "highball" | "mug" | "wine" | "beer" | "shot" | "cup";
export type MethodKey = "shake" | "stir" | "build" | "blend" | "muddle";
export type ToolKey =
  | "shaker"
  | "jigger"
  | "hawthorne"
  | "fine"
  | "mixingGlass"
  | "barSpoon"
  | "muddler"
  | "juicer"
  | "peeler"
  | "blender"
  | "knife";
export type SpiritKey =
  | "rum"
  | "gin"
  | "whisky"
  | "tequila"
  | "vodka"
  | "cachaca"
  | "wine"
  | "winecooler"
  | "soju"
  | "thai"
  | "none";
export type CategoryKey = "classic" | "spy-soju" | "mocktail";

export type Ingredient = { amount: Text; name: Text };

export type Cocktail = {
  slug: string;
  name: Text;
  category: CategoryKey;
  base: SpiritKey;
  glass: GlassKey;
  method: MethodKey;
  /** Liquid colour used for the drawn glass. */
  color: string;
  /** Colour of the garnish wheel on the drawn glass. */
  garnishColor?: string;
  /** Optional photo, e.g. "/images/negroni.jpg" (file goes in /public/images). */
  image?: string;
  /** "told" = the popular origin story. "house" = our own mix with no documented history. */
  origin: "told" | "house";
  story: Text;
  tools: ToolKey[];
  ingredients: Ingredient[];
  steps: Text[];
  garnish: Text;
  taste: Taste;
};
