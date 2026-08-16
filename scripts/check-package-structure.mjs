import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const packages = JSON.parse(
  await readFile(new URL("../src/content/packages.json", import.meta.url), "utf8"),
);

const expected = {
  "essencial-pt": { duration: "2 horas", entertainers: 2, workshops: 1, activities: 1 },
  "completo-pt": { duration: "3 horas", entertainers: 2, workshops: 1, activities: 2 },
  "premium-pt": { duration: "4 horas", entertainers: 2, workshops: 2, activities: 3 },
  "essential-en": { duration: "2 hours", entertainers: 2, workshops: 1, activities: 1 },
  "complete-en": { duration: "3 hours", entertainers: 2, workshops: 1, activities: 2 },
  "premium-en": { duration: "4 hours", entertainers: 2, workshops: 2, activities: 3 },
};

for (const item of packages) {
  assert.deepEqual(
    {
      duration: item.duration,
      entertainers: item.entertainers,
      workshops: item.workshops,
      activities: item.activities,
    },
    expected[item.id],
    `Estrutura incorreta no pacote ${item.id}`,
  );
  assert.equal(item.price, null, `O pacote ${item.id} não pode mostrar preço`);
  assert.doesNotMatch(
    JSON.stringify(item),
    /(?:€|\b220\b|\b280\b|\b320\b|100\s*\/\s*(?:h|hour))/i,
    `O pacote ${item.id} contém um preço público`,
  );
}

console.log("Package structure check passed.");
