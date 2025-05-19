import { db } from '@/db';

// Function to load and parse the CSV data
export async function seedAnimalCSVData(csvFilePath: string) {
    const response = await fetch(csvFilePath);
    const csvText = await response.text();
    const lines = csvText.split('\n').map(line => line.trim());
    const animalNames = lines.slice(1); // Skip the header line

    // Store the animal names in the IndexedDB
    await db.animals.bulkAdd(animalNames.map(name => ({ name })));
    console.log('CSV data loaded into IndexedDB');
}
