const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "database.db");
const db = new Database(dbPath, { verbose: console.log });

const products = [
  {
    name: "Mysiga body",
    price: "449 KR",
    description:
      "En mjuk och bekväm babybody i ekologisk bomull, perfekt för känslig hud. Designad för att ge maximal komfort och rörelsefrihet, med praktiska tryckknappar för enkel av- och påklädning. Det hållbara materialet är skonsamt mot huden och tål tvätt efter tvätt utan att tappa sin mjukhet.",
    image: "body1.jpg",
    hoverImage: "body2.jpg",
    SKU: "NBO201",
    gender: "pojke",
    published_date: "2025-09-13",
    categories: ["Bodies"],
    url_slug: "mysig-body",
  },
  {
    name: "Långärmad body",
    price: "659 KR",
    description:
      "En stilren och skön långärmad babybody som håller din bebis varm och bekväm hela dagen. Tillverkad av 100% ekologisk bomull och designad för att vara både funktionell och snygg. Tryckknappar vid axeln och grenen gör det enkelt att byta blöja utan krångel.",
    image: "body3.jpg",
    hoverImage: "body4.jpg",
    SKU: "NBO202",
    gender: "pojke",
    published_date: "2025-09-15",
    categories: ["Bodies"],
    url_slug: "langarmad-body",
  },
  {
    name: "Ribbad body",
    price: "169 KR",
    description:
      "En underbart söt ribbad body med stilren design och extra mjukt material. Perfekt för både lek och vila, med stretchigt tyg som anpassar sig efter barnets rörelser. Tryckknapparna i grenen förenklar blöjbyten, medan den hållbara bomullen säkerställer långvarig komfort.",
    image: "body5.jpg",
    hoverImage: "body6.jpg",
    SKU: "NBO203",
    gender: "flicka",
    published_date: "2025-09-19",
    categories: ["Bodies"],
    url_slug: "ribbad-body",
  },
  {
    name: "Starterkit nyfödd",
    price: "349 KR",
    description:
      "Ett komplett startpaket för nyfödda, innehållande en mjuk body, bekväma byxor, en söt mössa och en skön body. Alla plagg är tillverkade av ekologisk bomull för att skydda ditt barns känsliga hud. Perfekt som present till nyblivna föräldrar eller som ett första set för din bebis.",
    image: "starter1.jpg",
    hoverImage: "starter2.jpg",
    SKU: "NBO301",
    gender: "pojke",
    published_date: "2025-08-17",
    categories: ["Starter Kits"],
    url_slug: "starterkit-nyfodd-björn",
  },
  {
    name: "Starterkit nyfödd",
    price: "649 KR",
    description:
      "Ett praktiskt och stilrent set med allt en nyfödd behöver: två bodys, byxor, mössa och strumpor i mjuka, andningsbara material. Det här kitet ger ditt barn en mysig start i livet, och det är perfekt för både vardagsbruk och speciella tillfällen.",
    image: "starter3.jpg",
    hoverImage: "starter4.jpg",
    SKU: "NBO302",
    gender: "flicka",
    published_date: "2025-09-20",
    categories: ["Starter Kits"],
    url_slug: "starterkit-nyfodd-igelkott",
  },
  {
    name: "Baby Kostym",
    price: "499 KR",
    description:
      "En elegant liten kostym för speciella tillfällen! Setet innehåller en vit skjorta, en snygg väst och matchande byxor i svart tyg. Perfekt för dop, födelsedagar eller festliga tillställningar. Tillverkad av mjukt material som känns skönt mot huden, samtidigt som det ger en stilren look.",
    image: "kostym1.jpg",
    hoverImage: "kostym2.jpg",
    SKU: "NBO401",
    gender: "pojke",
    published_date: "2025-08-21",
    categories: ["Kostymer"],
    url_slug: "baby-kostym",
  },
  {
    name: "Söt rosa klänning",
    price: "299 KR",
    description:
      "En ljuvlig rosa klänning, perfekt för sommarens utflykter och kalas. Klänningen har ett mjukt innerfoder och en luftig passform som ger barnet rörelsefrihet. Det fina tyget är både bekvämt och hållbart, samtidigt som det skapar en bedårande look för din lilla ängel.",
    image: "dress1.jpg",
    hoverImage: "dress2.jpg",
    SKU: "NBO501",
    gender: "flicka",
    published_date: "2025-08-18",
    categories: ["Klänningar"],
    url_slug: "sot-rosa-klanning",
  },
  {
    name: "Elegant vit klänning",
    price: "329 KR",
    description:
      "En vacker vit klänning med spetsdetaljer, perfekt för dop och fest. Klänningen har en mjuk insida och en elegant design som gör den bekväm att bära hela dagen. Det klassiska snittet gör denna klänning till ett tidlöst plagg i barnets garderob.",
    image: "dress3.jpg",
    hoverImage: "dress4.jpg",
    SKU: "NBO502",
    gender: "flicka",
    published_date: "2025-09-16",
    categories: ["Klänningar"],
    url_slug: "elegant-vit-klanning",
  },
  {
    name: "Mysig björn jumpsuit",
    price: "279 KR",
    description:
      "En varm och skön jumpsuit med knappar, perfekt för lek och vila. Det stretchiga och mjuka materialet gör att barnet kan röra sig fritt och bekvämt. Den stilrena designen passar lika bra till vardags som vid mer avslappnade tillfällen.",
    image: "jumpsuit1.jpg",
    hoverImage: "jumpsuit2.jpg",
    SKU: "NBO601",
    gender: "pojke",
    published_date: "2025-08-22",
    categories: ["Jumpsuits"],
    url_slug: "mysig-bjorn-jumpsuit",
  },
  {
    name: "Grå jumpsuit",
    price: "289 KR",
    description:
      "En mjuk och stretchig jumpsuit, tillverkad i skonsamt material som andas. Den praktiska dragkedjan gör påklädning enkel och bekväm. Perfekt att ha på sig under kalla dagar eller som ett extra lager vid utomhusaktiviteter.",
    image: "jumpsuit3.jpg",
    hoverImage: "jumpsuit4.jpg",
    SKU: "NBO602",
    gender: "pojke",
    published_date: "2025-08-29",
    categories: ["Jumpsuits"],
    url_slug: "gra-jumpsuit",
  },
  {
    name: "Ribbad ljusrosa jumpsuit",
    price: "299 KR",
    description:
      "En ribbad jumpsuit med knappar framtill, perfekt för varma dagar. Den mjuka stickade kvaliteten håller ditt barn varmt och bekvämt, samtidigt som den klassiska designen ger en charmig och tidlös look. Lätt att matcha med andra babykläder för en komplett outfit.",
    image: "jumpsuit5.jpg",
    hoverImage: "jumpsuit6.jpg",
    SKU: "NBO603",
    gender: "flicka",
    published_date: "2025-08-29",
    categories: ["Jumpsuits"],
    url_slug: "stickad-jumpsuit-ljusrosa",
  },
  {
    name: "Lejon jumpsuit",
    price: "299 KR",
    description:
      "Förvandla din lilla äventyrare till ett gulligt lejon med denna mysiga och varma jumpsuit! Tillverkad i mjukt och skonsamt material som känns behagligt mot barnets hud. Perfekt för lek, mys och maskerad. Den har praktiska tryckknappar för enkel på- och avklädning samt en huva med söta lejonöron och en liten svans. En fantastisk present till alla små djurälskare!",
    image: "jumpsuit7.jpg",
    hoverImage: "jumpsuit8.jpg",
    SKU: "JMP001",
    gender: "pojke",
    published_date: "2025-09-16",
    categories: ["Jumpsuits"],
    url_slug: "lejon-jumpsuit",
  },
  {
    name: "Grå body",
    price: "129 KR",
    description:
      "En stilren och mjuk grå body i 100% ekologisk bomull, perfekt för din lilla älskling. Designad för att vara skonsam mot känslig hud och ge maximal komfort hela dagen. Tryckknappar i grenen gör blöjbyten enkla och smidiga.",
    image: "body7.jpg",
    hoverImage: "body8.jpg",
    SKU: "BOD001",
    gender: "pojke",
    published_date: "2025-08-14",
    categories: ["Bodies"],
    url_slug: "gra-body",
  },
  {
    name: "Starterkit bees",
    price: "399 KR",
    description:
      "Ett underbart startpaket med bi tema, innehållande en mjuk body, bekväma byxor och en matchande mössa. Tillverkat av ekologisk bomull och perfekt för att hålla din bebis varm och gosig. Ett perfekt val för både vardag och speciella tillfällen!",
    image: "starter9.jpg",
    hoverImage: "starter10.jpg",
    SKU: "KIT001",
    gender: "flicka",
    published_date: "2025-09-16",
    categories: ["Starter Kits"],
    url_slug: "starterkit-bees",
  },
  {
    name: "Starterkit grön sommaroutfit",
    price: "449 KR",
    description:
      "En fräsch och luftig sommaroutfit i härligt grön nyans, perfekt för varma dagar. Setet inkluderar en mjuk body, bekväma shorts och en matchande solhatt för extra skydd mot solen. Tillverkat av andningsbar bomull som håller din bebis sval och bekväm hela dagen.",
    image: "starter7.jpg",
    hoverImage: "starter8.jpg",
    SKU: "KIT002",
    gender: "pojke",
    published_date: "2025-08-17",
    categories: ["Starter Kits"],
    url_slug: "starterkit-gron-sommaroutfit",
  },
  {
    name: "Starterkit söta björnar",
    price: "479 KR",
    description:
      "Ett mysigt startpaket med gulliga björnmotiv, perfekt för nyfödda. Setet innehåller en långärmad body, mjuka byxor och en charmig mössa  allt i ekologisk bomull. En fantastisk presentidé till de allra minsta!",
    image: "starter5.jpg",
    hoverImage: "starter6.jpg",
    SKU: "KIT003",
    gender: "flicka",
    published_date: "2025-08-16",
    categories: ["Starter Kits"],
    url_slug: "starterkit-sota-bjornar",
  },
  {
    name: "Napp med nallar",
    price: "69 KR",
    description:
      "En söt och ergonomiskt utformad napp med gulliga nallebjörnar. Tillverkad av BPA-fri silikon, skonsam mot barnets mun och utformad för att efterlikna den naturliga sugreflexen. Perfekt för en lugn och nöjd bebis!",
    image: "napp7.jpg",
    hoverImage: "napp8.jpg",
    SKU: "NAP001",
    gender: "unisex",
    published_date: "2025-08-10",
    categories: ["Nappar"],
    url_slug: "napp-med-nallar",
  },
  {
    name: "Vit filt med stjärnor",
    price: "199 KR",
    description:
      "En mjuk och mysig vit filt med vackert stjärnmönster, perfekt för både barnvagnen och spjälsängen. Tillverkad av högkvalitativ bomull som ger en ombonad känsla och håller din bebis varm under alla årstider.",
    image: "blanket1.jpg",
    hoverImage: "blanket2.jpg",
    SKU: "BLK001",
    gender: "unisex",
    published_date: "2025-09-25",
    categories: ["Filtar"],
    url_slug: "vit-filt-med-stjarnor",
  },
  {
    name: "Snuttefilt med söta djur",
    price: "149 KR",
    description:
      "En otroligt mjuk och trygg snuttefilt med gulliga djurmotiv. Perfekt för att skapa en känsla av trygghet och närhet, oavsett om det är dags för vila eller mys. En underbar följeslagare för din bebis!",
    image: "blanket9.jpg",
    hoverImage: "blanket10.jpg",
    SKU: "SNT001",
    gender: "unisex",
    published_date: "2025-09-01",
    categories: ["Snuttefiltar"],
    url_slug: "snuttefilt-sota-djur",
  },
  {
    name: "Snuttefilt med vilda djur",
    price: "159 KR",
    description:
      "Ge ditt barn en trygg och mysig vän att hålla i! Denna härliga snuttefilt med vilda djur-motiv är tillverkad av mjukt och skonsamt material som ger bebisen en känsla av trygghet. Perfekt att ha i vagnen, sängen eller som tröst vid läggdags.",
    image: "blanket11.jpg",
    hoverImage: "blanket12.jpg",
    SKU: "SNT002",
    gender: "unisex",
    published_date: "2025-08-28",
    categories: ["Snuttefiltar"],
    url_slug: "snuttefilt-vilda-djur",
  },
  {
    name: "Filt med djurmönster",
    price: "219 KR",
    description:
      "Låt din lilla upptäckare omfamnas av mjukhet och lekfulla djurmönster! Den här färgglada filten är perfekt för mysiga stunder och ger både värme och trygghet. Tillverkad i högkvalitativt material som är skonsamt mot känslig babyhud.",
    image: "blanket3.jpg",
    hoverImage: "blanket4.jpg",
    SKU: "BLK002",
    gender: "unisex",
    published_date: "2025-08-24",
    categories: ["Filtar"],
    url_slug: "filt-med-djurmonster",
  },
  {
    name: "Filt med olika mönster",
    price: "229 KR",
    description:
      "Ge barnrummet en stilfull touch med denna mjuka filt i unika och lekfulla mönster! Perfekt för både sovstunden och lekstunden, och den passar lika bra i vagnen som i spjälsängen. Tillverkad i en skön och luftig bomullsblandning för bästa komfort.",
    image: "blanket5.jpg",
    hoverImage: "blanket6.jpg",
    SKU: "BLK003",
    gender: "unisex",
    published_date: "2025-08-23",
    categories: ["Filtar"],
    url_slug: "filt-med-olika-monster",
  },
  {
    name: "Filt i neutrala färger",
    price: "189 KR",
    description:
      "En stilren och tidlös filt i mjuka, neutrala färger som passar alla bebisar! Perfekt för att hålla din lilla varm under kyliga dagar eller som en extra mjuk plats att ligga på. Lättskött och tillverkad i högkvalitativt material som känns behagligt mot huden.",
    image: "blanket7.jpg",
    hoverImage: "blanket8.jpg",
    SKU: "BLK004",
    gender: "unisex",
    published_date: "2025-08-22",
    categories: ["Filtar"],
    url_slug: "filt-i-neutrala-farger",
  },
  {
    name: "Blomformad napp",
    price: "75 KR",
    description:
      "Denna vackra napp i blomdesign är både stilren och funktionell! Med en anatomiskt utformad sugdel som är skonsam mot barnets gom och tänder, blir den snabbt en favorit. Perfekt för de små som älskar både komfort och en snygg design.",
    image: "napp5.jpg",
    hoverImage: "napp6.jpg",
    SKU: "NAP002",
    gender: "flicka",
    published_date: "2025-09-29",
    categories: ["Nappar"],
    url_slug: "blomformad-napp",
  },
  {
    name: "Klassisk napp",
    price: "59 KR",
    description:
      "En enkel och tidlös napp som aldrig går ur stil! Designad för att ge optimal komfort och en naturlig sugkänsla, vilket hjälper ditt barn att känna sig tryggt och nöjt. Tillverkad av BPA-fritt material för en säker och bekväm användning.",
    image: "napp3.jpg",
    hoverImage: "napp4.jpg",
    SKU: "NAP003",
    gender: "unisex",
    published_date: "2025-08-28",
    categories: ["Nappar"],
    url_slug: "klassisk-napp",
  },
  {
    name: "Napp med panda",
    price: "79 KR",
    description:
      "En bedårande napp med ett gulligt panda-motiv som snabbt blir en favorit hos djurälskande små! Designad för att vara skonsam mot tandköttet och enkel att greppa för små händer. Gjord av säkra, BPA-fria material.",
    image: "napp1.jpg",
    hoverImage: "napp2.jpg",
    SKU: "NAP004",
    gender: "pojke",
    published_date: "2025-09-27",
    categories: ["Nappar"],
    url_slug: "napp-med-panda",
  },
  {
    name: "Napp med snöre",
    price: "89 KR",
    description:
      "Aldrig mer en napp som försvinner! Denna praktiska napp kommer med ett smart snöre som gör att den alltid finns nära till hands. Perfekt för aktiva bebisar och stressade föräldrar. Designad för att ge maximal komfort och trygghet.",
    image: "napp9.jpg",
    hoverImage: "napp10.jpg",
    SKU: "NAP005",
    gender: "pojke",
    published_date: "2025-08-26",
    categories: ["Nappar"],
    url_slug: "napp-med-snore",
  },
];

const insertProduct = db.prepare(`
  INSERT INTO products 
  (name, price, description, image, hoverImage, SKU, gender, categories, published_date, url_slug)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

try {
  products.forEach((product) => {
    insertProduct.run(
      product.name,
      product.price,
      product.description,
      product.image,
      product.hoverImage,
      product.SKU,
      product.gender,
      JSON.stringify(product.categories),
      product.published_date,
      product.url_slug
    );
    console.log(`Inserted ${product.name} into products table`);
  });
} catch (error) {
  console.error("Error inserting products:", error);
}

db.close();
