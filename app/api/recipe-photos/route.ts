import { NextResponse } from "next/server";
import { cocktails } from "@/data/cocktails";
import type { Cocktail } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1";
const CACHE_SECONDS = 60 * 60 * 24 * 7;

// This recipe's available database photographs visibly conflict with its
// ginger-ale, grenadine and lime recipe, so always use the accurate vector art.
const VECTOR_ONLY_SLUGS = new Set(["virgin-mojito"]);

const STOP_WORDS = new Set([
  "a", "an", "and", "the", "with", "of", "for", "or", "drink", "cocktail",
  "classic", "public", "house", "everyday", "style", "table", "virgin",
  "mocktail", "non", "alcoholic", "zero", "proof", "free", "special",
  "spooky", "autumn", "halloween", "beetlejuice", "witchs", "web", "zombie",
  "blood", "injection", "vampire", "huckleberry", "frankenstein", "elixir",
  "candy", "corn", "spider", "witch", "potion",
]);

type ApiDrink = {
  strDrink?: string;
  strDrinkThumb?: string;
  strAlcoholic?: string;
  strGlass?: string;
  [key: string]: unknown;
};
type PhotoAsset = { src: string; alternatives: string[] };
type ApiResponse = { drinks?: ApiDrink[] | null };
type Assignment = { photos: Record<string, PhotoAsset> };

// Manually verified exact-match photograph for Shirley Temple: ginger ale,
// grenadine and lime, finished with a cherry (no mint). The source is credited
// in the site footer.
const curatedPhotoOverrides: Record<string, PhotoAsset> = {
  "shirley-temple": {
    src: "https://www.absolutdrinks.com/wp-content/uploads/recipe_shirley-temple_1x1_0ac67fd874d1a72a0a6f703d25e97d56.jpg",
    alternatives: [],
  },
};

let assignmentsPromise: Promise<Assignment> | null = null;

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
}

function words(value: string): string[] {
  return [...new Set(normalize(value).split(/\s+/).filter((word) => word.length > 2 && !STOP_WORDS.has(word)))];
}

function drinkIngredients(drink: ApiDrink): string {
  return Object.entries(drink)
    .filter(([key, value]) => /^strIngredient\d+$/.test(key) && typeof value === "string")
    .map(([, value]) => String(value))
    .join(" ");
}

function recipeText(recipe: Cocktail): string {
  return `${recipe.name.en} ${recipe.slug.replace(/-/g, " ")} ${recipe.ingredients.map((ingredient) => ingredient.name.en).join(" ")}`;
}

function hasCompatiblePhoto(recipe: Cocktail, candidate: ApiDrink): boolean {
  const recipeName = normalize(recipe.name.en);
  const candidateName = normalize(candidate.strDrink ?? "");
  if (recipeName && recipeName === candidateName) return true;

  // Never offer an alcoholic drink photo for a zero-alcohol recipe.
  if (recipe.category === "mocktail" && !/non.?alcoholic/i.test(String(candidate.strAlcoholic ?? ""))) {
    return false;
  }

  const recipeNameWords = words(recipe.name.en + " " + recipe.slug.replace(/-/g, " "));
  const candidateNameWords = words(candidate.strDrink ?? "");
  const recipeIngredientWords = new Set(
    words([...recipe.ingredients.map((ingredient) => ingredient.name.en), recipe.garnish.en].join(" ")),
  );
  const candidateIngredientWords = new Set(words(drinkIngredients(candidate)));
  const titleOverlap = recipeNameWords.filter((word) => candidateNameWords.includes(word)).length;
  const ingredientOverlap = [...recipeIngredientWords].filter((word) => candidateIngredientWords.has(word)).length;

  // Strong flavour markers should not appear in a substitute image when the
  // recipe doesn't contain them. This prevents, for example, a mint cocktail
  // from being used for a Shirley Temple.
  const distinctiveIngredients = [
    "mint", "basil", "rosemary", "thyme", "sage", "coffee", "cream",
    "coconut", "pineapple", "olive", "celery", "egg", "chocolate",
    "banana", "grapefruit", "cucumber", "jalapeno", "jalapeño",
    "orange", "apple", "tomato", "cranberry", "pomegranate",
    "blueberry", "raspberry", "peach", "pear", "watermelon",
    "mango", "passionfruit", "passion fruit", "lychee", "lemon",
  ];
  for (const ingredient of distinctiveIngredients) {
    if (candidateIngredientWords.has(ingredient) && !recipeIngredientWords.has(ingredient)) {
      return false;
    }
  }

  // Accept a related title only when the drink's ingredients support it, or
  // require at least two ingredient matches when titles differ.
  return (titleOverlap >= 1 && ingredientOverlap >= 1) || ingredientOverlap >= 2;
}

function scoreMatch(recipe: Cocktail, candidate: ApiDrink): number {
  const recipeName = words(recipe.name.en + " " + recipe.slug.replace(/-/g, " "));
  const candidateName = words(candidate.strDrink ?? "");
  const recipeIngredients = words(recipe.ingredients.map((ingredient) => ingredient.name.en).join(" "));
  const candidateIngredients = words(drinkIngredients(candidate));
  const candidateAll = new Set([...candidateName, ...candidateIngredients]);
  const recipeAll = new Set([...recipeName, ...recipeIngredients]);
  const titleOverlap = recipeName.filter((word) => candidateName.includes(word)).length;
  const ingredientOverlap = recipeIngredients.filter((word) => candidateAll.has(word)).length;
  const combinedOverlap = [...recipeAll].filter((word) => candidateAll.has(word)).length;
  let score = titleOverlap * 18 + ingredientOverlap * 2 + combinedOverlap;
  const normalizedRecipe = normalize(recipe.name.en);
  const normalizedCandidate = normalize(candidate.strDrink ?? "");
  if (normalizedCandidate && normalizedRecipe.includes(normalizedCandidate)) score += 12;
  if (recipe.category === "mocktail" && /non.?alcoholic/i.test(String(candidate.strAlcoholic ?? ""))) score += 12;
  if (recipe.category !== "mocktail" && /alcoholic/i.test(String(candidate.strAlcoholic ?? ""))) score += 1;
  return score;
}

async function fetchDrinks(url: string): Promise<ApiDrink[]> {
  try {
    const response = await fetch(url, { next: { revalidate: CACHE_SECONDS } });
    if (!response.ok) return [];
    const data = (await response.json()) as ApiResponse;
    return Array.isArray(data.drinks) ? data.drinks.filter((drink) => drink.strDrinkThumb && drink.strDrink) : [];
  } catch {
    return [];
  }
}

async function buildAssignments(): Promise<Assignment> {
  const recipeLetters = [...new Set(cocktails.map((recipe) => normalize(recipe.name.en)[0]).filter((letter) => /^[a-z]$/.test(letter)))];
  const initialResults = await Promise.all(recipeLetters.map((letter) => fetchDrinks(`${API_BASE}/search.php?f=${letter}`)));
  let pool = initialResults.flat();

  const dedupe = (items: ApiDrink[]) => {
    const seen = new Set<string>();
    return items.filter((item) => {
      const url = item.strDrinkThumb;
      if (!url || seen.has(url)) return false;
      seen.add(url);
      return true;
    });
  };
  pool = dedupe(pool);

  // Load the rest of the alphabet if the catalog needs more unique, real photographs.
  if (pool.length < cocktails.length * 3) {
    const missingLetters = "abcdefghijklmnopqrstuvwxyz".split("").filter((letter) => !recipeLetters.includes(letter));
    const extraResults = await Promise.all(missingLetters.map((letter) => fetchDrinks(`${API_BASE}/search.php?f=${letter}`)));
    pool = dedupe([...pool, ...extraResults.flat()]);
  }

  // Final safety net: common categories usually return thumbnails even when a letter search is empty.
  if (pool.length < cocktails.length * 2) {
    const categories = ["Cocktail", "Ordinary_Drink", "Coffee_/_Tea", "Punch_/_Party_Drink", "Soft_Drink"];
    const categoryResults = await Promise.all(categories.map((category) => fetchDrinks(`${API_BASE}/filter.php?c=${category}`)));
    pool = dedupe([...pool, ...categoryResults.flat()]);
  }

  const remaining = new Map(pool.map((candidate) => [candidate.strDrinkThumb!, candidate]));
  const assigned = new Map<string, ApiDrink>();
  const recipes = [...cocktails].sort((a, b) => a.slug.localeCompare(b.slug));

  // First pass: preserve exact-name photographs for recipes that have them.
  for (const recipe of recipes) {
    // Use vector art when available photographs visibly contradict the recipe.
    if (VECTOR_ONLY_SLUGS.has(recipe.slug)) continue;
    // A specific, manually verified image takes precedence over the general API pool.
    if (curatedPhotoOverrides[recipe.slug]) continue;
    const target = normalize(recipe.name.en);
    const exact = [...remaining.values()].find((candidate) => normalize(candidate.strDrink ?? "") === target);
    if (exact && exact.strDrinkThumb) {
      assigned.set(recipe.slug, exact);
      remaining.delete(exact.strDrinkThumb);
    }
  }

  // Second pass: choose the closest remaining real cocktail photo for custom recipes.
  const unresolved = recipes.filter((recipe) => !assigned.has(recipe.slug)).sort((a, b) => {
    const aSpecificity = words(recipeText(a)).length;
    const bSpecificity = words(recipeText(b)).length;
    return bSpecificity - aSpecificity || a.slug.localeCompare(b.slug);
  });
  for (const recipe of unresolved) {
    if (VECTOR_ONLY_SLUGS.has(recipe.slug)) continue;
    if (curatedPhotoOverrides[recipe.slug]) continue;
    const best = [...remaining.values()]
      .filter((candidate) => hasCompatiblePhoto(recipe, candidate))
      .sort((a, b) => scoreMatch(recipe, b) - scoreMatch(recipe, a))[0];
    if (best?.strDrinkThumb) {
      assigned.set(recipe.slug, best);
      remaining.delete(best.strDrinkThumb);
    }
  }

  // Keep the curated, verified photographs first. Unknown custom recipes are
  // left without a photo instead of being assigned a visibly wrong drink.
  const photos: Record<string, PhotoAsset> = { ...curatedPhotoOverrides };
  for (const recipe of recipes) {
    if (VECTOR_ONLY_SLUGS.has(recipe.slug)) continue;
    const primary = assigned.get(recipe.slug);
    const primaryUrl = primary?.strDrinkThumb;
    if (!primaryUrl) continue;
    const alternatives: string[] = [];
    for (let i = 0; i < 2 && remaining.size > 0; i += 1) {
      const bestAlt = [...remaining.values()]
        .filter((candidate) => hasCompatiblePhoto(recipe, candidate))
        .sort((a, b) => scoreMatch(recipe, b) - scoreMatch(recipe, a))[0];
      // A broken image should not be replaced with a different, unrelated drink.
      if (!bestAlt?.strDrinkThumb) break;
      alternatives.push(bestAlt.strDrinkThumb);
      remaining.delete(bestAlt.strDrinkThumb);
    }
    photos[recipe.slug] = { src: primaryUrl, alternatives };
  }
  return { photos };
}

async function getAssignments(): Promise<Assignment> {
  if (!assignmentsPromise) {
    assignmentsPromise = buildAssignments().catch((error) => {
      assignmentsPromise = null;
      throw error;
    });
  }
  return assignmentsPromise;
}

export async function GET() {
  try {
    const assignment = await getAssignments();
    return NextResponse.json(assignment, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Cocktail photos are temporarily unavailable." }, { status: 502 });
  }
}
