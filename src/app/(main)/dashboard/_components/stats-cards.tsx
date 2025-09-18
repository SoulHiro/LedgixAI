import { Card, CardContent } from '@/components/ui/card'
import { HandCoins, BanknoteArrowUp, BanknoteArrowDown } from 'lucide-react'

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
      gradient: 'from-green-500/20 to-green-600/10',
      textColor: 'text-green-400',
      icon: <BanknoteArrowUp />,
    },
    {
      title: 'Despesas',
      amount: totalExpenses,
      color: 'bg-red-500',
      gradient: 'from-red-500/20 to-red-600/10',
      textColor: 'text-red-400',
      icon: <BanknoteArrowDown />,
    },
    {
      title: 'Investimentos',
      amount: totalInvestments,
      color: 'bg-blue-500',
      gradient: 'from-blue-500/20 to-blue-600/10',
      textColor: 'text-blue-400',
      icon: <HandCoins />,
    },
  ]

  return (
    <div className="grid h-full grid-cols-3 gap-4">
      {cardsData.map((card) => (
        <Card key={card.title} className="border-gray-800 bg-gray-950">
          <CardContent className="flex h-full w-full items-center gap-2 px-4">
            <div className="p-2">
              <span className={`${card.textColor} rounded-full p-2`}>
                {card.icon}
              </span>
            </div>
            <div className="flex h-full w-full flex-col justify-center">
              <p className="truncate text-sm text-gray-400">{card.title}</p>
              <p className="truncate text-xl font-bold text-white">
                {card.amount.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
