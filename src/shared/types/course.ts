import { courses } from "../db";

export type Course = typeof courses.$inferSelect;
export type NewCoursePayload = Omit<typeof courses.$inferInsert, "id" | "createdAt" | "updatedAt">;
export type CourseUpdatePayload = Partial<NewCoursePayload>;
