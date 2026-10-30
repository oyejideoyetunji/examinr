import type { Course, CourseUpdatePayload, NewCoursePayload } from "../../../shared/types";

export interface CourseRepository {
    create(payload: NewCoursePayload): Promise<Course | undefined>;
    getAll(): Promise<Course[]>;
    findById(id: string): Promise<Course | undefined>;
    update(id: string, payload: CourseUpdatePayload): Promise<Course | undefined>;
}
