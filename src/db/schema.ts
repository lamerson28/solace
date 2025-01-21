import { sql } from "drizzle-orm";
import { pgTable, serial, text, jsonb, integer, timestamp, bigint, primaryKey, varchar, index } from "drizzle-orm/pg-core";
import { type Specialty } from "./seed/specialties";
import { relations } from "drizzle-orm";

export const specialties = pgTable("specialties", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
}, (table) => ({
  nameIdx: index("specialty_name_idx").on(table.name),
}));

export const advocateSpecialties = pgTable("advocate_specialties", {
  id: serial("id").primaryKey(),
  advocateId: integer("advocate_id").notNull().references(() => advocates.id),
  specialtyId: integer("specialty_id").notNull().references(() => specialties.id),
}, (table) => ({
  advocateIdIdx: index("advocate_id_idx").on(table.advocateId),
  specialtyIdIdx: index("specialty_id_idx").on(table.specialtyId),
}));

export const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  degree: varchar("degree", { length: 100 }).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  firstNameIdx: index("first_name_idx").on(table.firstName),
  lastNameIdx: index("last_name_idx").on(table.lastName),
  cityIdx: index("city_idx").on(table.city),
  degreeIdx: index("degree_idx").on(table.degree),
}));

// Define relationships
export const advocatesRelations = relations(advocates, ({ many }) => ({
  advocateSpecialties: many(advocateSpecialties),
}));

export const specialtiesRelations = relations(specialties, ({ many }) => ({
  advocateSpecialties: many(advocateSpecialties),
}));

export const advocateSpecialtiesRelations = relations(advocateSpecialties, ({ one }) => ({
  advocate: one(advocates, {
    fields: [advocateSpecialties.advocateId],
    references: [advocates.id],
  }),
  specialty: one(specialties, {
    fields: [advocateSpecialties.specialtyId],
    references: [specialties.id],
  }),
}));





