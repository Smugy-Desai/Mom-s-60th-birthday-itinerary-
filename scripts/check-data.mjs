import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), "..");

const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), "utf8"));

const itinerary = await readJson("data/itinerary.json");
const weather = await readJson("data/weather.json");
await readJson("data/photos.json");
const memoryPhotos = await readJson("data/memory-photos.json");
const flights = await readJson("data/flights.json");
await readJson("data/site.json");

const errors = [];

for (const day of itinerary) {
  if (!day.id || !day.title || !day.date || !day.isoDate) {
    errors.push(`Missing required day fields in ${day.title || day.id || "unknown day"}`);
  }

  if (!Array.isArray(day.events) || day.events.length === 0) {
    errors.push(`${day.title || day.id} has no events`);
    continue;
  }

  for (const event of day.events) {
    if (!event.name || !event.time || !event.location) {
      errors.push(`Missing event field in ${day.title}: ${event.name || "unnamed event"}`);
    }
  }
}

if (!Array.isArray(memoryPhotos) || memoryPhotos.length !== 8) {
  errors.push("memory-photos.json should contain exactly 8 photo entries");
}

for (const photo of memoryPhotos) {
  if (!photo.label || !photo.src) {
    errors.push(`Missing photo field for ${photo.label || "unknown photo"}`);
  }
}

for (const flight of flights) {
  if (!flight.person || !flight.type || !flight.flightNumber || !flight.from || !flight.to || !flight.depart || !flight.arrive) {
    errors.push(`Missing flight field for ${flight.person || "unknown traveler"}`);
  }
}

for (const day of weather) {
  if (!day.label || !day.high || !day.low || !Array.isArray(day.periods)) {
    errors.push(`Missing weather fields in ${day.label || "unknown weather day"}`);
    continue;
  }

  for (const period of day.periods) {
    if (!period.label || !period.rain) {
      errors.push(`Missing weather period field in ${day.label}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Data OK");
