// Creates content/guides/<slug>/en.md from the template.
//   npm run new:guide -- sunset-at-sugarloaf
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const slug = process.argv[2];

if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: npm run new:guide -- <slug>   (lowercase words separated by hyphens)");
  process.exit(1);
}

const dir = `content/guides/${slug}`;
const file = `${dir}/en.md`;

if (existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}

await mkdir(dir, { recursive: true });
await copyFile("content/guides/_template.md", file);

const today = new Date().toISOString().slice(0, 10);
const text = (await readFile(file, "utf8")).replace("date: 2026-01-01", `date: ${today}`);
await writeFile(file, text);

console.log(`Created ${file} (status: draft).`);
console.log("Next: write the guide, then follow content/guides/README.md");
