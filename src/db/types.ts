import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { advocates } from './schema';
import { type Specialty } from './seed/specialties';

// Base type for selecting advocates (reading)
type AdvocateBase = InferSelectModel<typeof advocates>;

// Extended type that includes the specialties array from the API
export interface Advocate extends Omit<AdvocateBase, 'specialties'> {
  specialties: string[];
}

// Type for inserting advocates (creating)
export type NewAdvocate = InferInsertModel<typeof advocates>;

export { Specialty };