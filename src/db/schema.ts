import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const testTable = pgTable("test_table", {
    id: serial("id").primaryKey(),
    col1: varchar("col_1", { length: 255 }),
    col2: integer("col_2"),
    col3: boolean("col_3"),
    createdAt: timestamp("created_at").defaultNow()
});