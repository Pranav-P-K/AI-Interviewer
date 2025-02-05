import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Interview = pgTable('interview', {
    id: serial('id'),
    jsonResp: text('jsonResp').notNull(),
    jsonPos: varchar('jsonPos').notNull(),
    jsonDes: varchar('jsonDes').notNull(),
    jsonExp: varchar('jsonExp').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    mockId: varchar('mockId').notNull()
})