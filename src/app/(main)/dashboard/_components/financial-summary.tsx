import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react'

interface FinancialSummaryProps {
  totalIncome: number
  totalExpenses: number
  totalBalance: number
}

export function FinancialSummary({
  totalIncome,
  totalExpenses,
  totalBalance,
}: FinancialSummaryProps) {
  const savingsRate =
    totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0
  const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0

  const metrics = [
    {
      title: 'Taxa de Poupança',
      value: `${savingsRate.toFixed(1)}%`,
      icon: Target,
      color:
        savingsRate >= 20
          ? 'text-green-400'
          : savingsRate >= 10
            ? 'text-yellow-400'
            : 'text-red-400',
      bgColor:
        savingsRate >= 20
          ? 'bg-green-500/10'
          : savingsRate >= 10
            ? 'bg-yellow-500/10'
            : 'bg-red-500/10',
    },
    {
      title: 'Razão Gastos/Receita',
      value: `${expenseRatio.toFixed(1)}%`,
      icon: DollarSign,
      color:
        expenseRatio <= 70
          ? 'text-green-400'
          : expenseRatio <= 85
            ? 'text-yellow-400'
            : 'text-red-400',
      bgColor:
        expenseRatio <= 70
          ? 'bg-green-500/10'
          : expenseRatio <= 85
            ? 'bg-yellow-500/10'
            : 'bg-red-500/10',
    },
    {
      title: 'Fluxo Mensal',
      value:
        totalIncome - totalExpenses >= 0
          ? `+R$ ${(totalIncome - totalExpenses).toLocaleString('pt-BR')}`
          : `-R$ ${Math.abs(totalIncome - totalExpenses).toLocaleString('pt-BR')}`,
      icon: totalIncome - totalExpenses >= 0 ? TrendingUp : TrendingDown,
      color:
        totalIncome - totalExpenses >= 0 ? 'text-green-400' : 'text-red-400',
      bgColor:
        totalIncome - totalExpenses >= 0 ? 'bg-green-500/10' : 'bg-red-500/10',
    },
  ]

  return (
    <Card className="h-full space-y-2 border-gray-800 bg-gray-950">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Resumo Financeiro
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 overflow-hidden px-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.title}>
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-gray-700 p-3">
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <div className="flex w-full justify-between">
                  <p className="truncate text-sm text-gray-400">
                    {metric.title}
                  </p>
                  <p
                    className={`text-base font-semibold ${metric.color} truncate`}
                  >
                    {metric.value}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
