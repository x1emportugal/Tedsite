import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const reviews = JSON.parse(readFileSync(new URL("../src/content/reviews.json", import.meta.url)));
const expected = [
  "aquashow-curiosity45801477248",
  "aquashow-pedro-f",
  "aquashow-scenic67313094783",
  "aquashow-catarina-sousa",
  "aquashow-grandtour32286900320",
  "aquashow-jose-antonio-h",
  "aquashow-carlos-s",
  "aquashow-stevem987654321",
  "aquashow-yelhernandez",
  "aquashow-luis-p",
  "aquashow-freedom30528419692",
  "aquashow-goncalo-s",
  "aquashow-sharon-o",
];

for (const id of expected) {
  const review = reviews.find((item) => item.id === id);
  assert.ok(review, `Falta a avaliação ${id}`);
  assert.equal(review.rating, 5, `${id} deve ter as 5 estrelas confirmadas pelo Ted`);
}

const content = readFileSync(new URL("../src/lib/content.ts", import.meta.url), "utf8");
const component = readFileSync(new URL("../src/components/Reviews.astro", import.meta.url), "utf8");
assert.match(content, /rating: z\.number\(\)\.min\(1\)\.max\(5\)\.optional\(\)/);
assert.match(component, /typeof r\.rating === "number"/);

console.log("Avaliações reais e estrelas validadas.");
