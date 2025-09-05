import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Eye } from 'lucide-react'

interface BalanceCardProps {
  totalBalance: number
}

export function BalanceCard({ totalBalance }: BalanceCardProps) {
  return (
    <Card className="border-gray-900 bg-gray-950">
      <CardContent className="space-y-4 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-400">Saldo</span>
          </div>
          <Eye className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex w-full justify-between">
          <p className="text-3xl font-bold">
            R${' '}
            {totalBalance.toLocaleString('pt-BR', {
              minimumFractionDigits: 0,
            })}
          </p>
          <Button className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Transação
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
