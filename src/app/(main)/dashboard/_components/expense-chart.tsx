'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ExpenseChartProps {
  expensesByCategory: {
    category: string
    totalAmount: number
    percentageOfTotal: number
  }[]
}

export function ExpenseChart({ expensesByCategory }: ExpenseChartProps) {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-indigo-500',
  ]

  return (
    <Card className="h-full border-gray-800 bg-gray-950">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-white">
          Gastos por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 overflow-hidden p-4">
        {expensesByCategory.map((expense, index) => (
          <div key={expense.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border border-gray-600 bg-gray-700" />
                <span className="truncate text-sm text-gray-300">
                  {expense.category}
                </span>
              </div>
              <span className="text-sm font-medium text-white">
                R$ {expense.totalAmount.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gray-600"
                style={{ width: `${expense.percentageOfTotal}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
