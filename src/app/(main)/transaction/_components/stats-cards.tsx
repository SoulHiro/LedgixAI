import { Card, CardContent } from '@/components/ui/card'

interface StatsCardsProps {
  totalIncome: number
  totalExpenses: number
  totalInvestments: number
}

export function StatsCards({
  totalIncome,
  totalExpenses,
  totalInvestments,
}: StatsCardsProps) {
  const cardsData = [
    {
      title: 'Receitas',
      amount: totalIncome,
      color: 'bg-green-500',
    },
    {
      title: 'Despesas',
      amount: totalExpenses,
      color: 'bg-red-500',
    },
    {
      title: 'Investimentos',
      amount: totalInvestments,
      color: 'bg-blue-500',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {cardsData.map((card) => (
        <Card key={card.title} className="border-gray-900 bg-transparent">
          <CardContent className="space-y-2 px-6 py-2">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${card.color}`}></div>
              <span className="text-sm text-gray-400">{card.title}</span>
            </div>
            <div className="text-xl font-bold">
              R${' '}
              {card.amount.toLocaleString('pt-BR', {
                minimumFractionDigits: 0,
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
