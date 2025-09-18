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
    'bg-pink-500',
    'bg-orange-500',
    'bg-teal-500',
  ]

  return (
    <Card className="h-full border-gray-800 bg-gray-950">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-white">
          Gastos por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 overflow-y-auto p-4">
        {expensesByCategory.map((expense, index) => (
          <div key={expense.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className={`h-3 w-3 rounded-full ${colors[index % colors.length]}`} 
                />
                <span className="truncate text-sm text-gray-300">
                  {expense.category}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-white">
                  R$ {expense.totalAmount.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
                <span className="text-xs text-gray-400">
                  {expense.percentageOfTotal.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-300`}
                style={{ width: `${Math.max(expense.percentageOfTotal, 0.5)}%` }}
              />
            </div>
          </div>
        ))}
        {expensesByCategory.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400">
            <p className="text-sm">Nenhuma categoria de gasto encontrada</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
