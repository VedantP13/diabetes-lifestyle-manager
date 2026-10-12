import fs from 'fs';
import { dishes } from './dishes';

// This reads your TypeScript array and converts it to strict JSON
const jsonData = JSON.stringify(dishes, null, 2);

// This saves it as a new JSON file
fs.writeFileSync('dishes_data.json', jsonData);

console.log("Successfully converted to dishes_data.json!");