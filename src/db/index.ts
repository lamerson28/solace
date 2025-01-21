import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { advocates, specialties, advocateSpecialties } from './schema';
import { advocateData } from './seed/advocates';
import { specialtiesData } from './seed/specialties';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const db = drizzle(process.env.DATABASE_URL);

async function main() {
  try {
    // Clear existing data in correct order (respecting foreign key constraints)
    console.log("Clearing existing data");
    await db.delete(advocateSpecialties);  // Delete junction table data first
    await db.delete(advocates);            // Then delete advocates
    await db.delete(specialties);          // Finally delete specialties

    // Insert data in correct order
    console.log("Inserting specialties");
    const insertedSpecialties = await db.insert(specialties)
      .values(specialtiesData)
      .returning({ id: specialties.id, name: specialties.name });

    console.log("Inserting advocates");
    const insertedAdvocates = await db.insert(advocates)
      .values(advocateData)
      .returning({ id: advocates.id });

    // Generate advocate-specialty relationships
    console.log("Inserting advocate-specialty relationships");
    const advocateSpecialtiesData = insertedAdvocates.flatMap(advocate => {
      // Randomly select two unique specialties for each advocate
      const shuffled = [...insertedSpecialties].sort(() => 0.5 - Math.random());
      const selectedSpecialties = shuffled.slice(0, 2);
      
      return selectedSpecialties.map(specialty => ({
        advocateId: advocate.id,
        specialtyId: specialty.id,
      }));
    });

    await db.insert(advocateSpecialties).values(advocateSpecialtiesData);

    console.log('Successfully seeded database');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

  main().catch((err) => {
    console.error('Failed to seed database:', err);
    process.exit(1);
  });



