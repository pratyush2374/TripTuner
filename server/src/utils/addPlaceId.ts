import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import places from "./array.js";

// Resolve file path dynamically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "array.js");

// Function to add a new place if it does not exist
function addPlace(placeName: string) {
    // Normalize input (trim & convert to lowercase for consistency)
    const normalizedPlace = placeName.trim();

    // Check if the place already exists (case-insensitive check)
    const exists = places.some((p) => p.toLowerCase() === normalizedPlace.toLowerCase());

    if (!exists) {
        places.push(normalizedPlace);

        // Write updated places array back to array.js
        const updatedContent = `export default ${JSON.stringify(places, null, 2)};`;
        fs.writeFileSync(filePath, updatedContent, "utf8");

        console.log(`Added new place: ${normalizedPlace}`);
    } else {
        console.log(`Place "${normalizedPlace}" already exists.`);
    }
}

export default addPlace;
