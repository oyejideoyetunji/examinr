import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("ui").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    email: varchar("email", { length: 256 }).unique().notNull(),
    hashedPassword: varchar("hashed_password").default("unset").notNull(),
    isChirpyRed: boolean("is_chirpy_red").default(false).notNull(),
});
export type User = typeof users.$inferSelect;
export type CreateUserParams = typeof users.$inferInsert;
export type UserResponse = Omit<User, "hashedPassword">;
