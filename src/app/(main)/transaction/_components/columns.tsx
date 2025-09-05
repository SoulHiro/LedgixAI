'use client'
import { ColumnDef } from '@tanstack/react-table'
import { transactionsTable } from '@/db/schema'
import { Badge } from '@/components/ui/badge'

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
        return <Badge>Depósito</Badge>
      }
      if (transaction.type === 'EXPENSE') {
        return <Badge>Despesa</Badge>
      }
      return <Badge>Investimento</Badge>
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Método de Pagamento',
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      return new Date(transaction.date).toLocaleDateString('pt-BR')
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return `R$ ${parseFloat(transaction.amount).toFixed(2).replace('.', ',')}`
    },
  },
  {
    accessorKey: 'actions',
    header: '',
  },
]
