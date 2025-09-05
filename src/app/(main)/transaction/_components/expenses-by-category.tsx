'use client'

import * as React from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// Função para formatar valores monetários
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

interface ExpensesByCategoryProps {
  expensesByCategory: {
    category: string
    totalAmount: number
    percentageOfTotal: number
  }[]
}

export function ExpensesByCategory({ expensesByCategory }: ExpensesByCategoryProps) {
  // Transformar os dados para o formato do gráfico
  const chartData = expensesByCategory.map((expense, index) => ({
    category: expense.category,
    amount: expense.totalAmount,
    fill: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
  }))

  const totalAmount = expensesByCategory.reduce((sum, expense) => sum + expense.totalAmount, 0)

  // Tooltip customizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-gray-800 p-2 rounded border border-gray-600">
          <p className="text-white text-sm">{data.category}</p>
          <p className="text-white text-sm">{formatCurrency(data.amount)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-gray-900 bg-transparent">
      <CardHeader>
        <CardTitle className="text-white">Gastos por categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="flex items-center justify-center">
            <div className="w-[280px] h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={2}
                    stroke="#374151"
                    strokeWidth={1}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Detalhamento por categoria</h4>
            {expensesByCategory.map((expense, index) => (
              <div
                key={expense.category}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      backgroundColor: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{expense.category}</span>
                    <span className="text-xs text-gray-400">
                      {expense.percentageOfTotal.toFixed(1)}% do total
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium text-white">
                  {formatCurrency(expense.totalAmount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
