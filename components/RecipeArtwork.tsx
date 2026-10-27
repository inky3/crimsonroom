"use client";

import { useState } from "react";
import GlassArt from "./GlassArt";
import { recipePhotoUrl } from "@/lib/recipe-image";
import type { CategoryKey, GlassKey } from "@/lib/types";

type Props = {
  mode: "card" | "detail";
  slug: string;
  name: string;
  category: CategoryKey;
  glass: GlassKey;
  color: string;
  garnishColor?: string;
  image?: string;
};

/**
 * All recipes use photo-first artwork. Curated editorial photos are chosen
 * deterministically by recipe type. If a remote photo fails, the drawn glass
 * remains as the no-network fallback.
 */
export default function RecipeArtwork({
  mode,
  slug,
  name,
  category,
  glass,
  color,
  garnishColor,
  image,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <GlassArt
        glass={glass}
        color={color}
        garnish={garnishColor}
        id={`fallback-${mode}-${slug}`}
        label={mode === "detail" ? name : undefined}
        className={mode === "card" ? "card-art" : "recipe-artwork-fallback"}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image || recipePhotoUrl(slug, category)}
      alt={name}
      className={mode === "card" ? "card-art photo" : "recipe-photo"}
      loading={mode === "card" ? "lazy" : "eager"}
      onError={() => setFailed(true)}
    />
  );
}
