import { db } from "@/db";
import { advocates, specialties, advocateSpecialties } from "@/db/schema";
import { eq, ilike, or, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Input sanitization and validation
    const search = searchParams.get('search')?.toLowerCase().trim() || '';
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 10));

    // Simple search condition
    const searchCondition = search ? 
      or(
        ilike(advocates.firstName, `%${search}%`),
        ilike(advocates.lastName, `%${search}%`),
        ilike(advocates.city, `%${search}%`),
        ilike(advocates.degree, `%${search}%`)
      ) : undefined;

    // Get total count
    const [{ count }] = await db
      .select({ 
        count: sql<number>`count(*)::int` 
      })
      .from(advocates)
      .where(searchCondition);

    // Get advocates with their specialties
    const data = await db
      .select({
        id: advocates.id,
        firstName: advocates.firstName,
        lastName: advocates.lastName,
        city: advocates.city,
        degree: advocates.degree,
        yearsOfExperience: advocates.yearsOfExperience,
        phoneNumber: advocates.phoneNumber,
        createdAt: advocates.createdAt,
        specialties: sql<string[]>`array_agg(distinct ${specialties.name})`
      })
      .from(advocates)
      .leftJoin(advocateSpecialties, eq(advocates.id, advocateSpecialties.advocateId))
      .leftJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id))
      .where(searchCondition)
      .groupBy(advocates.id)
      .limit(limit)
      .offset((page - 1) * limit);

    return Response.json({ 
      data,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    // Generic error message for clients
    console.error('Database error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
