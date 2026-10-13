import { t } from "@/lib/i18n";
import type { Cocktail, Ingredient } from "@/lib/types";
import { th } from "./th";

const ing = (amount: string, en: string): Ingredient => ({ amount: t(amount), name: t(en) });

/*
 * HOW TO ADD A RECIPE
 * Copy one entry, change the fields, and save. Then add its Thai text in
 * data/th.ts under the same slug. Until you do, the site shows English in
 * Thai mode, so nothing breaks.
 *
 * Taste values run from 0 to 5.
 * Measures are standard bar measures: 30 ml is about one shot.
 */
const base: Cocktail[] = [
  // ───────────── Classics ─────────────
  {
    slug: "old-fashioned",
    name: t("Old Fashioned"),
    category: "classic",
    base: "whisky",
    glass: "rocks",
    method: "build",
    color: "#b8651b",
    garnishColor: "#f28c28",
    origin: "told",
    story: t(
      "Before it had a name, this was simply the original cocktail: a spirit, sugar, water and bitters. As bars piled on liqueurs and syrups in the late 1800s, some drinkers began asking for their drink made the old-fashioned way, and the name stuck. A Kentucky gentlemen's club often gets the credit for inventing it, but that claim is disputed."
    ),
    tools: ["jigger", "muddler", "barSpoon", "peeler"],
    ingredients: [
      ing("45 ml", "Bourbon or rye whisky"),
      ing("1", "Sugar cube (or 5 ml simple syrup)"),
      ing("2 dashes", "Angostura bitters"),
      ing("few drops", "Water"),
    ],
    steps: [
      t("Put the sugar cube in a rocks glass. Add the bitters and a few drops of water, and muddle until the sugar dissolves."),
      t("Add the whisky and one large ice cube."),
      t("Stir for about 20 seconds until the glass feels cold."),
      t("Squeeze a strip of orange peel over the glass to release its oils, then drop it in."),
    ],
    garnish: t("Orange peel"),
    taste: { sweet: 2, sour: 0, bitter: 3, rough: 4, strength: 4 },
  },
  {
    slug: "margarita",
    name: t("Margarita"),
    category: "classic",
    base: "tequila",
    glass: "coupe",
    method: "shake",
    color: "#d6e3a0",
    garnishColor: "#8fbf3a",
    origin: "told",
    story: t(
      "Stories place its birth in Mexico or the American Southwest in the 1930s or 40s, and several bartenders claim it. What is clear is the recipe: it is a sour, built from spirit, citrus and a sweetener, and a close relative of the older Daisy cocktail. Margarita is the Spanish word for daisy."
    ),
    tools: ["shaker", "jigger", "juicer", "hawthorne"],
    ingredients: [
      ing("50 ml", "Tequila blanco"),
      ing("20 ml", "Triple sec or Cointreau"),
      ing("15 ml", "Fresh lime juice"),
      ing("optional", "Salt for the rim"),
    ],
    steps: [
      t("If you want a salt rim, rub a lime wedge around half of the rim and dip it in salt."),
      t("Add everything to a shaker with plenty of ice."),
      t("Shake hard for 10 to 12 seconds."),
      t("Strain into a chilled coupe."),
    ],
    garnish: t("Lime wheel"),
    taste: { sweet: 2, sour: 4, bitter: 0, rough: 2, strength: 3 },
  },
  {
    slug: "daiquiri",
    name: t("Daiquiri"),
    category: "classic",
    base: "rum",
    glass: "coupe",
    method: "shake",
    color: "#e6efc6",
    garnishColor: "#8fbf3a",
    origin: "told",
    story: t(
      "It is said to be named after a mining town and beach near Santiago de Cuba, around 1900, where the American engineer Jennings Cox is often credited with mixing rum, lime and sugar for his guests. Sailors had long drunk rum with lime and sugar. The Daiquiri is the polished, shaken version of that."
    ),
    tools: ["shaker", "jigger", "juicer", "hawthorne", "fine"],
    ingredients: [
      ing("45 ml", "White rum"),
      ing("25 ml", "Fresh lime juice"),
      ing("10 ml", "Simple syrup (equal parts sugar and water)"),
    ],
    steps: [
      t("Chill a coupe in the freezer, or fill it with ice water while you work."),
      t("Add everything to a shaker with ice and shake hard for 12 seconds."),
      t("Double strain into the coupe so no ice chips get through."),
    ],
    garnish: t("Lime wheel"),
    taste: { sweet: 2, sour: 4, bitter: 0, rough: 2, strength: 3 },
  },
  {
    slug: "mojito",
    name: t("Mojito"),
    category: "classic",
    base: "rum",
    glass: "highball",
    method: "muddle",
    color: "#cfe8bd",
    garnishColor: "#3a9d5a",
    origin: "told",
    story: t(
      "A popular story links it to El Draque, a 16th-century drink that sailors with Francis Drake are said to have used as medicine, though that link is far from proven. The rum-and-mint Mojito we know grew up in Havana, and it spread around the world as the drink that makes a hot day bearable."
    ),
    tools: ["muddler", "jigger", "barSpoon", "juicer"],
    ingredients: [
      ing("40 ml", "White rum"),
      ing("30 ml", "Fresh lime juice"),
      ing("2 tsp", "Sugar"),
      ing("6", "Mint leaves, plus a sprig to finish"),
      ing("top up", "Soda water"),
    ],
    steps: [
      t("Put the mint, sugar and lime juice in a highball glass. Press the mint gently, because shredding it makes the drink bitter."),
      t("Add the rum and stir until the sugar dissolves."),
      t("Fill the glass with crushed ice and stir from the bottom."),
      t("Top up with soda water and add a little more ice on top."),
    ],
    garnish: t("Mint sprig"),
    taste: { sweet: 3, sour: 3, bitter: 0, rough: 1, strength: 2 },
  },
  {
    slug: "negroni",
    name: t("Negroni"),
    category: "classic",
    base: "gin",
    glass: "rocks",
    method: "stir",
    color: "#b3122c",
    garnishColor: "#f28c28",
    origin: "told",
    story: t(
      "As the story goes, Count Camillo Negroni asked a bartender in Florence around 1919 to strengthen his Americano by swapping the soda water for gin. The bartender added an orange peel instead of the usual orange slice, and a new drink was born. It is bitter, sweet and strong in equal parts, and it divides people, which is part of its charm."
    ),
    tools: ["jigger", "barSpoon", "peeler"],
    ingredients: [
      ing("30 ml", "Gin"),
      ing("30 ml", "Campari"),
      ing("30 ml", "Sweet vermouth"),
    ],
    steps: [
      t("Fill a rocks glass with ice, preferably one large cube."),
      t("Pour in all three ingredients."),
      t("Stir for 15 to 20 seconds."),
      t("Squeeze an orange peel over the glass and drop it in."),
    ],
    garnish: t("Orange peel"),
    taste: { sweet: 2, sour: 0, bitter: 5, rough: 4, strength: 4 },
  },
  {
    slug: "manhattan",
    name: t("Manhattan"),
    category: "classic",
    base: "whisky",
    glass: "coupe",
    method: "stir",
    color: "#7a1f1f",
    garnishColor: "#8b0a1e",
    origin: "told",
    story: t(
      "It is often traced to the Manhattan Club in New York in the 1870s, though that story is disputed. Whatever its birthplace, it set the template for stirred drinks built on a spirit and vermouth, and many later cocktails owe it something."
    ),
    tools: ["mixingGlass", "barSpoon", "jigger", "hawthorne"],
    ingredients: [
      ing("50 ml", "Rye whisky"),
      ing("20 ml", "Sweet vermouth"),
      ing("2 dashes", "Angostura bitters"),
    ],
    steps: [
      t("Add everything to a mixing glass filled with ice."),
      t("Stir for 25 to 30 seconds."),
      t("Strain into a chilled coupe."),
      t("Drop in a cocktail cherry."),
    ],
    garnish: t("Cocktail cherry"),
    taste: { sweet: 3, sour: 0, bitter: 2, rough: 4, strength: 4 },
  },
  {
    slug: "dry-martini",
    name: t("Dry Martini"),
    category: "classic",
    base: "gin",
    glass: "martini",
    method: "stir",
    color: "#e4edef",
    garnishColor: "#f0d94a",
    origin: "told",
    story: t(
      "Its family tree is tangled. The Martinez, a gin and sweet vermouth drink from 19th-century California, is a likely ancestor, and New York bartenders have claims of their own. Through the 20th century it grew drier and more gin-heavy until it became the most iconic order in any bar."
    ),
    tools: ["mixingGlass", "barSpoon", "jigger", "hawthorne", "peeler"],
    ingredients: [
      ing("60 ml", "Gin"),
      ing("10 ml", "Dry vermouth"),
    ],
    steps: [
      t("Chill a martini glass in the freezer."),
      t("Stir the gin and vermouth with ice for about 30 seconds."),
      t("Strain into the glass."),
      t("Squeeze a lemon peel over the top, or add an olive."),
    ],
    garnish: t("Lemon twist or olive"),
    taste: { sweet: 0, sour: 0, bitter: 1, rough: 5, strength: 5 },
  },
  {
    slug: "cosmopolitan",
    name: t("Cosmopolitan"),
    category: "classic",
    base: "vodka",
    glass: "martini",
    method: "shake",
    color: "#e0446a",
    garnishColor: "#f28c28",
    origin: "told",
    story: t(
      "Several bartenders claim the modern Cosmopolitan, in Miami and New York in the 1980s. Its fame grew through the 1990s, helped by a television series about four friends in New York who ordered it constantly. Cranberry gave it the pink colour, and lime keeps it from being too sweet."
    ),
    tools: ["shaker", "jigger", "juicer", "hawthorne"],
    ingredients: [
      ing("40 ml", "Citrus vodka"),
      ing("15 ml", "Triple sec or Cointreau"),
      ing("30 ml", "Cranberry juice"),
      ing("15 ml", "Fresh lime juice"),
    ],
    steps: [
      t("Add everything to a shaker with ice."),
      t("Shake for 12 seconds."),
      t("Strain into a chilled martini glass."),
    ],
    garnish: t("Orange peel"),
    taste: { sweet: 3, sour: 3, bitter: 0, rough: 2, strength: 3 },
  },
  {
    slug: "whiskey-sour",
    name: t("Whiskey Sour"),
    category: "classic",
    base: "whisky",
    glass: "rocks",
    method: "shake",
    color: "#e5b84b",
    garnishColor: "#8b0a1e",
    origin: "told",
    story: t(
      "Sours, meaning spirit, citrus and sugar, were already a staple of 19th-century American bars. A popular tale says sailors drank citrus drinks to ward off scurvy, though the real birth of the sour is murky. Egg white is an old addition that gives the drink its silky foam."
    ),
    tools: ["shaker", "jigger", "juicer", "hawthorne", "fine"],
    ingredients: [
      ing("45 ml", "Bourbon"),
      ing("25 ml", "Fresh lemon juice"),
      ing("20 ml", "Simple syrup"),
      ing("optional", "1 egg white (about 20 ml)"),
    ],
    steps: [
      t("If you use egg white, shake everything first without ice for 10 seconds. Use pasteurised egg white if raw egg worries you."),
      t("Add ice and shake hard for another 12 seconds."),
      t("Strain into a rocks glass filled with fresh ice."),
    ],
    garnish: t("Cocktail cherry and orange slice"),
    taste: { sweet: 3, sour: 4, bitter: 0, rough: 2, strength: 3 },
  },
  {
    slug: "moscow-mule",
    name: t("Moscow Mule"),
    category: "classic",
    base: "vodka",
    glass: "mug",
    method: "build",
    color: "#e8d9a0",
    garnishColor: "#8fbf3a",
    origin: "told",
    story: t(
      "It is usually dated to 1941 in the United States. A tale says a vodka distributor, a bar owner with too much ginger beer to sell, and a maker of copper mugs joined forces on a drink that helped introduce vodka to American drinkers. The cold copper mug has been its trademark ever since."
    ),
    tools: ["jigger", "barSpoon", "juicer"],
    ingredients: [
      ing("45 ml", "Vodka"),
      ing("15 ml", "Fresh lime juice"),
      ing("120 ml", "Ginger beer"),
    ],
    steps: [
      t("Fill a copper mug with ice."),
      t("Add the vodka and lime juice."),
      t("Top up with ginger beer and stir gently once."),
    ],
    garnish: t("Lime wedge and mint"),
    taste: { sweet: 2, sour: 2, bitter: 0, rough: 1, strength: 2 },
  },
  {
    slug: "espresso-martini",
    name: t("Espresso Martini"),
    category: "classic",
    base: "vodka",
    glass: "martini",
    method: "shake",
    color: "#2b1b14",
    garnishColor: "#3b2318",
    origin: "told",
    story: t(
      "Created in London in the 1980s by the bartender Dick Bradsell, who said a customer asked for a drink that would wake her up. He combined vodka, coffee liqueur and fresh espresso, and the creamy foam on top became its signature."
    ),
    tools: ["shaker", "jigger", "hawthorne", "fine"],
    ingredients: [
      ing("50 ml", "Vodka"),
      ing("10 ml", "Coffee liqueur"),
      ing("30 ml", "Fresh espresso, slightly cooled"),
      ing("10 ml", "Simple syrup"),
    ],
    steps: [
      t("Chill a martini glass."),
      t("Add everything to a shaker with plenty of ice."),
      t("Shake very hard for 15 seconds. This is what makes the foam."),
      t("Double strain into the glass and top with three coffee beans."),
    ],
    garnish: t("Three coffee beans"),
    taste: { sweet: 3, sour: 0, bitter: 3, rough: 2, strength: 3 },
  },
  {
    slug: "pina-colada",
    name: t("Piña Colada"),
    category: "classic",
    base: "rum",
    glass: "highball",
    method: "blend",
    color: "#f4e8c1",
    garnishColor: "#f2c94c",
    origin: "told",
    story: t(
      "Puerto Rico claims it. Bartenders at the Caribe Hilton in San Juan in 1954 and at a bar called Barrachina in the 1960s both have a claim to the first one. It became the official drink of Puerto Rico in 1978, which settled nothing about the argument."
    ),
    tools: ["blender", "jigger"],
    ingredients: [
      ing("50 ml", "White rum"),
      ing("30 ml", "Coconut cream"),
      ing("50 ml", "Pineapple juice"),
      ing("1 cup", "Ice"),
    ],
    steps: [
      t("Add everything to a blender."),
      t("Blend until smooth and thick."),
      t("Pour into a tall glass."),
    ],
    garnish: t("Pineapple wedge and cherry"),
    taste: { sweet: 5, sour: 1, bitter: 0, rough: 0, strength: 2 },
  },
  {
    slug: "aperol-spritz",
    name: t("Aperol Spritz"),
    category: "classic",
    base: "wine",
    glass: "wine",
    method: "build",
    color: "#ff6a2b",
    garnishColor: "#f28c28",
    origin: "told",
    story: t(
      "The spritz began in the Veneto, where soldiers and traders in the Austro-Hungarian era are said to have watered down local wines. The word comes from the German for spray. Aperol, created in Padua in 1919, joined the formula later, and a big marketing push in the 2000s sent the bright orange glass around the world."
    ),
    tools: ["jigger", "barSpoon"],
    ingredients: [
      ing("60 ml", "Prosecco"),
      ing("40 ml", "Aperol"),
      ing("20 ml", "Soda water"),
    ],
    steps: [
      t("Fill a wine glass with ice."),
      t("Pour in the prosecco first, then the Aperol."),
      t("Add a splash of soda water and stir once."),
    ],
    garnish: t("Orange slice"),
    taste: { sweet: 3, sour: 1, bitter: 3, rough: 0, strength: 1 },
  },
  {
    slug: "mai-tai",
    name: t("Mai Tai"),
    category: "classic",
    base: "rum",
    glass: "rocks",
    method: "shake",
    color: "#d9822b",
    garnishColor: "#8fbf3a",
    origin: "told",
    story: t(
      "Trader Vic Bergeron said he invented it in Oakland, California, in 1944 for friends from Tahiti, who tasted it and said it was out of this world. Fans of Don the Beachcomber say he made it first. Either way, it became the signature drink of tiki bars. This is a common home version of the recipe."
    ),
    tools: ["shaker", "jigger", "juicer", "hawthorne"],
    ingredients: [
      ing("45 ml", "Aged rum"),
      ing("15 ml", "Orange curaçao"),
      ing("15 ml", "Orgeat (almond syrup)"),
      ing("25 ml", "Fresh lime juice"),
    ],
    steps: [
      t("Add everything to a shaker with ice and shake for 12 seconds."),
      t("Strain into a rocks glass filled with crushed ice."),
      t("Garnish with a mint sprig and a squeezed lime half."),
    ],
    garnish: t("Mint sprig and lime shell"),
    taste: { sweet: 3, sour: 3, bitter: 0, rough: 2, strength: 4 },
  },
  {
    slug: "caipirinha",
    name: t("Caipirinha"),
    category: "classic",
    base: "cachaca",
    glass: "rocks",
    method: "muddle",
    color: "#d8e6a0",
    garnishColor: "#8fbf3a",
    origin: "told",
    story: t(
      "Brazil's national cocktail. One story says it began in the early 1900s as a folk remedy of lime, garlic and honey with cachaça. Later the garlic and honey dropped out and sugar went in. Cachaça is made from fresh sugarcane juice, which is why it tastes grassier than most rum."
    ),
    tools: ["muddler", "knife", "jigger", "barSpoon"],
    ingredients: [
      ing("50 ml", "Cachaça"),
      ing("1", "Lime, cut into 4 wedges"),
      ing("2 tsp", "Sugar"),
    ],
    steps: [
      t("Put the lime wedges and sugar in a rocks glass."),
      t("Muddle firmly to release the juice and the oils from the peel."),
      t("Add the cachaça and fill the glass with crushed ice."),
      t("Stir from the bottom to mix."),
    ],
    garnish: t("Lime wedge"),
    taste: { sweet: 3, sour: 4, bitter: 0, rough: 3, strength: 3 },
  },
  {
    slug: "paloma",
    name: t("Paloma"),
    category: "classic",
    base: "tequila",
    glass: "highball",
    method: "build",
    color: "#f29a8c",
    garnishColor: "#f08a7b",
    origin: "told",
    story: t(
      "Mexico's everyday tequila drink, and in Mexico it is probably more popular than the Margarita. Some credit the bartender Don Javier Delgado Corona of La Capilla in Tequila, Jalisco. The name may nod to the folk song La Paloma. As with most classics, the history is disputed."
    ),
    tools: ["jigger", "barSpoon", "juicer"],
    ingredients: [
      ing("50 ml", "Tequila blanco"),
      ing("15 ml", "Fresh lime juice"),
      ing("1 pinch", "Salt"),
      ing("100 ml", "Grapefruit soda, to top"),
    ],
    steps: [
      t("Fill a highball glass with ice."),
      t("Add the tequila, lime juice and salt."),
      t("Top up with grapefruit soda and stir gently."),
    ],
    garnish: t("Grapefruit wedge"),
    taste: { sweet: 3, sour: 3, bitter: 1, rough: 1, strength: 2 },
  },
  {
    slug: "gin-and-tonic",
    name: t("Gin and Tonic"),
    category: "classic",
    base: "gin",
    glass: "highball",
    method: "build",
    color: "#e4f1f2",
    garnishColor: "#8fbf3a",
    origin: "told",
    story: t(
      "Quinine, from cinchona bark, was used to prevent malaria, and tonic water carried it. The tale says British officers in India mixed it with gin to make it easier to drink. A good gin, plenty of ice and cold tonic are all it needs today."
    ),
    tools: ["jigger", "barSpoon"],
    ingredients: [
      ing("50 ml", "Gin"),
      ing("150 ml", "Tonic water, well chilled"),
    ],
    steps: [
      t("Fill a tall glass to the top with ice. More ice keeps the drink cold and stops it going watery."),
      t("Pour in the gin."),
      t("Add the tonic slowly down the side of the glass, then stir once."),
    ],
    garnish: t("Lime wedge"),
    taste: { sweet: 1, sour: 1, bitter: 3, rough: 2, strength: 2 },
  },

  // ───────────── Spy, soju and Thai spirits ─────────────
  {
    slug: "spy-spritz",
    name: t("Spy Spritz"),
    category: "spy-soju",
    base: "winecooler",
    glass: "wine",
    method: "build",
    color: "#a31235",
    garnishColor: "#f0d94a",
    origin: "house",
    story: t(
      "Spy is a sweet, fruity wine cooler, which makes it easy to drink and easy to find. A little soda water and fresh lime make it taste lighter and more like a spritz. This one is our own suggestion."
    ),
    tools: ["jigger", "juicer", "barSpoon"],
    ingredients: [
      ing("100 ml", "Spy Classic, well chilled"),
      ing("40 ml", "Soda water"),
      ing("10 ml", "Fresh lime juice"),
    ],
    steps: [
      t("Fill a wine glass with ice."),
      t("Pour in the Spy and the lime juice."),
      t("Top up with soda water and stir once."),
    ],
    garnish: t("Lemon or lime wheel"),
    taste: { sweet: 4, sour: 2, bitter: 0, rough: 0, strength: 1 },
  },
  {
    slug: "spy-boost",
    name: t("Spy Boost"),
    category: "spy-soju",
    base: "winecooler",
    glass: "highball",
    method: "build",
    color: "#8e1432",
    garnishColor: "#f28c28",
    origin: "house",
    story: t(
      "For nights when a bottle of Spy on its own feels too light. A small shot of white rum or vodka adds strength, and orange juice keeps the fruit flavour front and centre. This one is our own suggestion."
    ),
    tools: ["jigger", "barSpoon"],
    ingredients: [
      ing("150 ml", "Spy Classic, well chilled"),
      ing("30 ml", "White rum or vodka"),
      ing("40 ml", "Orange juice"),
    ],
    steps: [
      t("Fill a highball glass with ice."),
      t("Add the rum or vodka and the orange juice."),
      t("Top up with Spy and stir gently."),
    ],
    garnish: t("Orange slice"),
    taste: { sweet: 4, sour: 1, bitter: 0, rough: 1, strength: 2 },
  },
  {
    slug: "somaek",
    name: t("Somaek"),
    category: "spy-soju",
    base: "soju",
    glass: "beer",
    method: "build",
    color: "#e3b341",
    origin: "told",
    story: t(
      "Somaek is a staple of Korean drinking culture. The name joins so from soju and maek from maekju, the Korean word for beer. Many people say it spread through group dinners, where it is mixed to taste at the table, but its exact origin is unclear."
    ),
    tools: ["jigger", "barSpoon"],
    ingredients: [
      ing("50 ml", "Soju"),
      ing("150 ml", "Cold lager beer"),
    ],
    steps: [
      t("Pour the beer into a glass until it is about three quarters full."),
      t("Add the soju."),
      t("Stir gently with a spoon and drink while it is cold and fizzy."),
    ],
    garnish: t("None"),
    taste: { sweet: 1, sour: 0, bitter: 2, rough: 2, strength: 2 },
  },
  {
    slug: "yogurt-soju",
    name: t("Yogurt Soju"),
    category: "spy-soju",
    base: "soju",
    glass: "highball",
    method: "build",
    color: "#f3efe0",
    garnishColor: "#f0d94a",
    origin: "house",
    story: t(
      "A Korean-style party mix. Soju is clean and neutral, so a sweet yogurt drink and lemon-lime soda make it taste like a soft drink. That is exactly why it is easy to drink too fast, so pace yourself. Its origin is not documented."
    ),
    tools: ["jigger", "barSpoon"],
    ingredients: [
      ing("60 ml", "Soju"),
      ing("60 ml", "Yogurt drink (such as Yakult)"),
      ing("90 ml", "Lemon-lime soda"),
    ],
    steps: [
      t("Fill a tall glass with ice."),
      t("Add the soju and the yogurt drink."),
      t("Pour the soda in slowly, because it foams, and stir once."),
    ],
    garnish: t("Lemon slice"),
    taste: { sweet: 4, sour: 2, bitter: 0, rough: 1, strength: 2 },
  },
  {
    slug: "soju-lychee-cooler",
    name: t("Soju Lychee Cooler"),
    category: "spy-soju",
    base: "soju",
    glass: "highball",
    method: "build",
    color: "#f1d9de",
    garnishColor: "#f4e4e0",
    origin: "house",
    story: t(
      "Lychee is a favourite flavour across Thailand and Korea, and it suits soju's clean taste. Lime stops it from turning too sweet, and soda makes it long and light. This one is our own suggestion."
    ),
    tools: ["jigger", "juicer", "barSpoon"],
    ingredients: [
      ing("60 ml", "Soju"),
      ing("60 ml", "Lychee juice (or the syrup from canned lychees)"),
      ing("10 ml", "Fresh lime juice"),
      ing("60 ml", "Soda water"),
    ],
    steps: [
      t("Fill a highball glass with ice."),
      t("Add the soju, lychee juice and lime juice, and stir."),
      t("Top up with soda water."),
    ],
    garnish: t("A lychee on a pick"),
    taste: { sweet: 4, sour: 2, bitter: 0, rough: 1, strength: 2 },
  },
  {
    slug: "mekhong-mule",
    name: t("Mekhong Mule"),
    category: "spy-soju",
    base: "thai",
    glass: "mug",
    method: "build",
    color: "#e0b060",
    garnishColor: "#8fbf3a",
    origin: "house",
    story: t(
      "Mekhong is a Thai spirit with a spiced, slightly sweet flavour, often described as Thai rum, and Thai bartenders have been using it in cocktails. Ginger beer and lime bring out its spice in the same way they do in a Moscow Mule. This one is our own suggestion."
    ),
    tools: ["jigger", "juicer", "barSpoon"],
    ingredients: [
      ing("45 ml", "Mekhong"),
      ing("15 ml", "Fresh lime juice"),
      ing("100 ml", "Ginger beer"),
    ],
    steps: [
      t("Fill a mug or tall glass with ice."),
      t("Add the Mekhong and the lime juice."),
      t("Top up with ginger beer and stir gently once."),
    ],
    garnish: t("Lime wedge and mint"),
    taste: { sweet: 3, sour: 3, bitter: 0, rough: 2, strength: 3 },
  },
];

/** Adds the Thai text from data/th.ts to a recipe. Recipes without Thai stay English. */
function withThai(c: Cocktail): Cocktail {
  const tr = th[c.slug];
  if (!tr) return c;
  if (tr.ingredients.length !== c.ingredients.length || tr.steps.length !== c.steps.length) {
    throw new Error(`Thai text for "${c.slug}" must have the same number of ingredients and steps as the English recipe.`);
  }
  return {
    ...c,
    name: { en: c.name.en, th: tr.name },
    story: { en: c.story.en, th: tr.story },
    garnish: { en: c.garnish.en, th: tr.garnish },
    ingredients: c.ingredients.map((i, idx) => ({
      amount: { en: i.amount.en, th: tr.ingredients[idx][0] },
      name: { en: i.name.en, th: tr.ingredients[idx][1] },
    })),
    steps: c.steps.map((step, idx) => ({ en: step.en, th: tr.steps[idx] })),
  };
}

export const cocktails: Cocktail[] = base.map(withThai);

export const getCocktail = (slug: string) => cocktails.find((c) => c.slug === slug);
