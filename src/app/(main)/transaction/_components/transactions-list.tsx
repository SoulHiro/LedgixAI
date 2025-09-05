import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { transactionsTable } from '@/db/schema'
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react'

type Transaction = typeof transactionsTable.$inferSelect

interface TransactionsListProps {
  transactions: Transaction[]
  maxItems?: number
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'DEPOSIT':
      return 'Receita'
    case 'EXPENSE':
      return 'Despesa'
    case 'INVESTMENT':
      return 'Investimento'
    default:
      return type
  }
}

export function TransactionsList({ transactions, maxItems = 10 }: TransactionsListProps) {
  return (
    <Card className="border-gray-900 bg-transparent">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Transações</CardTitle>
          <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
            Ver todas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Nome</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Tipo</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Data</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-gray-400">Valor</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-400">Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, maxItems).map((transaction) => {
                const isExpense = transaction.type === 'EXPENSE'
                const isIncome = transaction.type === 'DEPOSIT'
                const amount = parseFloat(transaction.amount)

                return (
                  <tr key={transaction.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            isExpense
                              ? 'bg-red-500/20'
                              : isIncome
                                ? 'bg-green-500/20'
                                : 'bg-blue-500/20'
                          }`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full ${
                              isExpense
                                ? 'bg-red-500'
                                : isIncome
                                  ? 'bg-green-500'
                                  : 'bg-blue-500'
                            }`}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-white">
                          {transaction.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isExpense
                          ? 'bg-red-500/20 text-red-400'
                          : isIncome
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {getTypeLabel(transaction.type)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-400">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span
                        className={`text-sm font-medium ${
                          isExpense ? 'text-red-400' : 'text-green-400'
                        }`}
                      >
                        {isExpense ? '-' : '+'}{formatCurrency(amount)}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}