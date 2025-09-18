import AddTransactionButton from '@/components/add-transaction-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Eye } from 'lucide-react'

interface BalanceCardProps {
  totalBalance: number
}

export function BalanceCard({ totalBalance }: BalanceCardProps) {
  const isPositive = totalBalance >= 0

  return (
    <Card className="h-full rounded-2xl border border-gray-800 bg-gradient-to-r from-gray-950 to-gray-900 p-6 shadow-2xl">
      <CardContent className="flex h-full flex-col justify-center space-y-4 p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`h-3 w-3 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'} flex-shrink-0 shadow-lg`}
            ></div>
            <span className="text-sm font-medium text-gray-300">
              Saldo Total
            </span>
          </div>
          <Eye className="h-5 w-5 flex-shrink-0 cursor-pointer text-gray-400 transition-colors hover:text-white" />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <p
              className={`text-3xl leading-tight font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}
            >
              R${' '}
              {Math.abs(totalBalance).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </p>
            <span className="mt-1 text-xs text-gray-500">
              {isPositive ? 'Saldo positivo' : 'Saldo negativo'}
            </span>
          </div>
          <AddTransactionButton />
        </div>
      </CardContent>
    </Card>
  )
}
