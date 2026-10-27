import type { CategoryKey } from "@/lib/types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=82`;

/*
 * Curated Unsplash photo pool. A recipe slug chooses the same photo every time
 * from a visual family. Some house recipes do not have an exact-name photo yet,
 * so they use a style-matched cocktail image until bespoke photos are available.
 */
const photos = {
  general: [
    photo("photo-1697029237968-aff8846b2d8d"),
    photo("photo-1681579289891-e9a7b1b0559c"),
    photo("photo-1619385006774-942adfe8dd6f"),
    photo("photo-1681579289899-188bd52d51f4"),
    photo("photo-1681579289862-42080bf4509a"),
    photo("photo-1684146342869-65e8f24d5654"),
    photo("photo-1571995666993-efb4b686cc85"),
    photo("photo-1618799805265-4f27cb61ede9"),
  ],
  green: [
    photo("photo-1681579289891-e9a7b1b0559c"),
    photo("photo-1618799805265-4f27cb61ede9"),
    "https://unsplash.com/photos/SPeWOme775E/download?force=true",
    "https://unsplash.com/photos/MzsWrM8DSCU/download?force=true",
    "https://unsplash.com/photos/1Di03LTniYE/download?force=true",
  ],
  tropical: [
    "https://unsplash.com/photos/ywS7HzUNjuM/download?force=true",
    "https://unsplash.com/photos/lD1Yqc0b3kc/download?force=true",
    "https://unsplash.com/photos/SedC4MvVBmE/download?force=true",
    photo("photo-1697029237968-aff8846b2d8d"),
    photo("photo-1571995666993-efb4b686cc85"),
  ],
  coffee: [
    "https://unsplash.com/photos/IhqDpFz7I8Q/download?force=true",
    "https://unsplash.com/photos/sui13fYo_NM/download?force=true",
    "https://unsplash.com/photos/EXUGMR5gvc0/download?force=true",
    "https://unsplash.com/photos/Jg8qNgt71OI/download?force=true",
    "https://unsplash.com/photos/D5ue4eUdCiA/download?force=true",
    "https://unsplash.com/photos/6fTdGLSaIlU/download?force=true",
    "https://unsplash.com/photos/qEnbyjYSDtU/download?force=true",
  ],
  bright: [
    "https://unsplash.com/photos/1Di03LTniYE/download?force=true",
    "https://unsplash.com/photos/R4zSXgDZLEU/download?force=true",
    "https://unsplash.com/photos/Exun_gFJH2E/download?force=true",
    "https://unsplash.com/photos/sSnCZlEWN5E/download?force=true",
    photo("photo-1619385006774-942adfe8dd6f"),
    photo("photo-1681579289899-188bd52d51f4"),
  ],
};

function stableIndex(slug: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(hash) % length;
}

export function recipePhotoUrl(slug: string, category: CategoryKey): string {
  const key = slug.toLowerCase();
  let family: keyof typeof photos = "general";

  if (/espresso|coffee|irish-coffee|white-russian|black-russian/.test(key)) {
    family = "coffee";
  } else if (/colada|pina|pineapple|mango|banana|tropical|lychee|dragonfruit|dragon-fruit/.test(key)) {
    family = "tropical";
  } else if (/mojito|mint|mule|lime-crush|gimlet|fizz|tonic|spritz|paloma/.test(key)) {
    family = "green";
  } else if (/margarita|cosmopolitan|cranberry|strawberry|berry|grape|blood|halloween|candy-corn|diablo|sunrise|shirley|pink|vampire/.test(key)) {
    family = "bright";
  } else if (category === "mocktail") {
    family = "bright";
  }

  return photos[family][stableIndex(slug, photos[family].length)];
}
