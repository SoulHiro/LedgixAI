'use client'
import { ColumnDef } from '@tanstack/react-table'
import { transactionsTable } from '@/db/schema'
import { Badge } from '@/components/ui/badge'
import { maxSize } from 'zod'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  TRANSACTION_CATEGORY_LABEL,
  TRANSACTION_PAYMENT_METHOD_LABEL,
} from '@/components/_constants/transactions'
import { deleteTransaction } from '@/app/actions/delete-transaction'
import DeleteTransactionButton from '@/components/delete-transaction-button'

type Transaction = typeof transactionsTable.$inferSelect

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type === 'DEPOSIT') {
        return (
          <Badge
            variant="primary"
            className="rounded-full border border-green-700 bg-transparent text-green-600"
          >
            Depósito
          </Badge>
        )
      }
      if (transaction.type === 'EXPENSE') {
        return (
          <Badge
            variant="primary"
            className="rounded-full border border-red-700 bg-transparent text-red-600"
          >
            Despesa
          </Badge>
        )
      }
      return (
        <Badge
          variant="primary"
          className="rounded-full border border-blue-700 bg-transparent text-blue-600"
        >
          Investimento
        </Badge>
      )
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row: { original: transaction } }) => {
      return TRANSACTION_CATEGORY_LABEL[transaction.category]
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Método de Pagamento',
    cell: ({ row: { original: transaction } }) => {
      return TRANSACTION_PAYMENT_METHOD_LABEL[transaction.paymentMethod]
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      return new Date(transaction.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return (
        <p
          className={
            transaction.type === 'EXPENSE' ? 'text-red-500' : 'text-green-500'
          }
        >
          {transaction.type === 'EXPENSE' ? '- ' : ''}
          R$ {parseFloat(transaction.amount).toFixed(2).replace('.', ',')}
        </p>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="text-muted-foreground">
          <Button variant="ghost" size="icon">
            <PencilIcon />
          </Button>
          <DeleteTransactionButton id={transaction.id} />
        </div>
      )
    },
  },
]
