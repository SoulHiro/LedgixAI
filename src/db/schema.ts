import { relations } from 'drizzle-orm'
import {
  decimal,
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  pgEnum,
  varchar,
} from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})

const TransactionTypeEnum = pgEnum('transaction_type', [
  'DEPOSIT',
  'EXPENSE',
  'INVESTMENT',
])

const CategoryEnum = pgEnum('category', [
  'HOUSING',
  'TRANSPORTATION',
  'FOOD',
  'ENTERTAINMENT',
  'HEALTH',
  'UTILITY',
  'SALARY',
  'EDUCATION',
  'OTHER',
])

const PaymentMethodEnum = pgEnum('payment_method', [
  'CREDIT_CARD',
  'DEBIT_CARD',
  'BANK_TRANSFER',
  'BANK_SLIP',
  'CASH',
  'PIX',
  'OTHER',
])

export const transactionsTable = pgTable('transactions', {
  id: uuid().defaultRandom().primaryKey(),
  transactionType: TransactionTypeEnum('transaction_type').notNull(),
  name: text('name').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  category: CategoryEnum('category').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  paymentMethod: PaymentMethodEnum('payment_method').notNull(),
})

export const usersTableRelations = relations(usersTable, ({ many }) => ({
  transactions: many(transactionsTable),
}))

export const transactionsTableRelations = relations(
  transactionsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [transactionsTable.userId],
      references: [usersTable.id],
    }),
  })
)
