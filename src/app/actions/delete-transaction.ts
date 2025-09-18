'use server'
import { db } from '@/db'
import { transactionsTable } from '@/db/schema'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'

export const deleteTransaction = async (transactionId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const userId = session?.user.id

  if (!userId) {
    throw new Error('Usuário não autenticado')
  }

  await db
    .delete(transactionsTable)
    .where(eq(transactionsTable.id, transactionId))
}
