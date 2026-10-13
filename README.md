# Crimson Room

A bartender-themed cocktail recipe site built with Next.js (App Router) and TypeScript.
English by default, with Thai ready to fill in. Dark, crimson and black.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en)
npm run build    # production build, every page is pre-rendered
```

## Where things live

| What | Where |
| --- | --- |
| Recipes (stories, tools, ingredients, steps, taste scores) | `data/cocktails.ts` |
| Thai text for each recipe | `data/th.ts` |
| Names of tools, glasses, methods, base spirits (EN and TH) | `data/reference.ts` |
| Interface text (EN and TH) | `lib/i18n.ts` |
| Colours and fonts | `app/globals.css` (`:root` at the top) |
| Featured drinks on the home page | `lib/site.ts` |

## Add a recipe

Copy any entry in `data/cocktails.ts`, change the fields, and save. Taste values run from 0 to 5.
The drawn glass picks up the drink's `color` and `garnishColor`.

## Thai

All Thai text for the recipes is in `data/th.ts`, one entry per recipe slug: name, story, ingredients (amount and name), steps and garnish.
When you add a recipe in `data/cocktails.ts`, add its Thai in `data/th.ts` too. The build stops with a clear message if the Thai has a different number of ingredients or steps.
A recipe with no Thai entry shows English in Thai mode, so nothing breaks.
Interface text is in `lib/i18n.ts`, and the names of tools, glasses and spirits are in `data/reference.ts`.
Search works with English or Thai names in either language.

## Add photos

Put a file in `public/images/` (for example `negroni.jpg`) and set `image: "/images/negroni.jpg"` on that recipe.
Without an image, the site shows a drawn glass in the drink's colour.
Only use photos you took, photos you have a licence for, or free-to-use stock photos.

## Taste scores

`sweet`, `sour`, `bitter`, `rough` (the harsh bite of the alcohol) and `strength` (how quickly it gets you drunk).
These are judgement calls for one standard serve. Change them freely.

## Recipe notes

- Origin stories are the popular versions and many are disputed. Entries marked `origin: "house"` are our own mixes with no documented history.
- Spy, soju and Mekhong measures are suggestions. Check the label for the strength of the bottle you buy.
