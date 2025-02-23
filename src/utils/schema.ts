import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Interview = pgTable('interview', {
    id: serial('id').primaryKey(),
    mockId: varchar('mockId', { length: 255 }).notNull(),
    jsonResp: text('jsonResp').notNull(),
    jsonPos: varchar('jsonPos', { length: 255 }).notNull(),
    jsonDes: varchar('jsonDes', { length: 255 }).notNull(),
    jsonExp: varchar('jsonExp', { length: 255 }).notNull(),
    createdBy: varchar('createdBy', { length: 255 }).notNull(),
    createdAt: varchar('createdAt', { length: 255 }).notNull(),
});

export const UserAnwer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    question: varchar('question').notNull(),
    corrctAns: text('correctAns').notNull(),
    userAns: text('userAnswer').notNull(),
    feedback: text('feedback').notNull(),
    rating: varchar('rating').notNull(),
    userEmail: varchar('userEmail').notNull(),
    createdAt: varchar('createdAt', { length: 255 }).notNull(),
})
