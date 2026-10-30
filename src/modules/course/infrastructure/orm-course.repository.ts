import { eq } from "drizzle-orm";
import { courses, db } from "../../../shared/db";
import { BadRequest } from "../../../shared/error";
import type { CourseUpdatePayload, NewCoursePayload } from "../../../shared/types";
import type { CourseRepository } from "../domain";

export class OrmCourseRepository implements CourseRepository {
    async create(payload: NewCoursePayload) {
        try {
            const [ result ] = await db
            .insert(courses)
            .values(payload)
            .returning();

            return result;
        } catch (e: any) {
            const err = e?.cause ?? e; // newer Drizzle wraps driver errors in `cause`
            if (err.code === '23505' && err.constraint_name === 'teacher_title_pair') {
                throw new BadRequest(`Course with title '${payload.title}' already assigned to teacher`);
            }

            throw e;
        }
    }

    async getAll() {
        const results = await db
            .select()
            .from(courses);
            
        return results;
    }

    async findById(id: string) {
        const [ result ] = await db
            .select()
            .from(courses)
            .where(eq(courses.id, id));

        return result;
    }

    async update(id: string, payload: CourseUpdatePayload) {
        const [ result ] = await db
            .update(courses)
            .set(payload)
            .where(eq(courses.id, id))
            .returning();

        return result;
    }
}
