import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("ui").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    email: varchar("email", { length: 256 }).unique().notNull(),
    username: varchar("username", { length: 256 }).unique().notNull(),
    hashedPassword: varchar("hashed_password").default("unset").notNull(),
});
