import { pgEnum, pgTable, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "student",
  "teacher",
  "admin",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  email: varchar("email", { length: 256 }).unique().notNull(),
  username: varchar("username", { length: 256 }).unique().notNull(),
  hashedPassword: varchar("hashed_password").default("unset").notNull(),
  role: userRoleEnum().notNull().default("student")
});

export const courses = pgTable("courses", 
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "cascade" }).notNull(),
    teacherId: uuid("teacher_id").references(() => users.id, { onDelete: "set null" }),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 256 }).notNull(),
  },
  (t) => ([unique("teacher_title_pair").on(t.teacherId, t.title)])
);
