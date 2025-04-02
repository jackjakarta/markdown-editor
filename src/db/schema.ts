import { boolean, pgSchema, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const appSchema = pgSchema('app');

export const userTable = appSchema.table('user_entity', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  passwordHash: text('password_hash').notNull(),
  emailVerified: boolean('email_verified').notNull().default(false),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
});

export type UserRow = typeof userTable.$inferSelect;
export type InsertUserRow = typeof userTable.$inferInsert;

export const tokenActionSchema = z.enum(['verify-email', 'reset-password']);
export const tokenActionPgEnum = appSchema.enum('token_action', tokenActionSchema.options);
export type TokenAction = z.infer<typeof tokenActionSchema>;

export const tokenTable = appSchema.table(
  'action_token',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    action: tokenActionPgEnum('action').notNull(),
    token: text('token').notNull(),
    email: text('email'),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      uniqueEmailAction: unique().on(table.email, table.action),
    };
  },
);

export type TokenRow = typeof tokenTable.$inferSelect;
export type InsertTokenRow = typeof tokenTable.$inferInsert;
