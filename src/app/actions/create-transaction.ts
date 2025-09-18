'use server'
import { db } from '@/db'
import { transactionsTable } from '@/db/schema'
import type { Transaction } from '../types/transaction'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const createTransaction = async (transaction: Transaction) => {
  const { ...transactionData } = transaction
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const userId = session?.user.id

  if (!userId) {
    throw new Error('Usuário não autenticado')
  }

  if (transaction.amount === '0') {
    throw new Error('O valor da transação não pode ser zero')
  }

  await db.insert(transactionsTable).values({
    ...transactionData,
    userId,
  })
}
