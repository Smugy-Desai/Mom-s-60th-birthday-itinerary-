import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const readText = (relativePath) => readFile(path.join(root, relativePath), "utf8");
const readJson = async (relativePath) => JSON.parse(await readText(relativePath));

const escapeScriptEnd = (value) => value.replace(/<\/script/gi, "<\\/script");

const [template, css, js, site, itinerary, weather, photos, memoryPhotos, flights] = await Promise.all([
  readText("src/index.template.html"),
  readText("src/styles.css"),
  readText("src/app.js"),
  readJson("data/site.json"),
  readJson("data/itinerary.json"),
  readJson("data/weather.json"),
  readJson("data/photos.json"),
  readJson("data/memory-photos.json"),
  readJson("data/flights.json")
]);

const appData = {
  site,
  itinerary,
  weather,
  photos,
  memoryPhotos,
  flights
};

const html = template
  .replaceAll("{{APP_TITLE}}", site.title)
  .replace("{{CSS}}", css.trim())
  .replace("{{APP_DATA}}", escapeScriptEnd(JSON.stringify(appData, null, 2)))
  .replace("{{JS}}", js.trim());

await mkdir(path.join(root, "docs"), { recursive: true });
await mkdir(path.join(root, "publish"), { recursive: true });

await Promise.all([
  writeFile(path.join(root, "open-app.html"), html, "utf8"),
  writeFile(path.join(root, "index.html"), html, "utf8"),
  writeFile(path.join(root, "docs", "index.html"), html, "utf8"),
  writeFile(path.join(root, "publish", "index.html"), html, "utf8")
]);

console.log("Built open-app.html, index.html, docs/index.html, and publish/index.html");
