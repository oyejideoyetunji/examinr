import { courses } from "../db";

export type Course = typeof courses.$inferSelect;
export type NewCoursePayload = typeof courses.$inferInsert;
