import { db } from '@/db'
import { BalanceCard } from './_components/balance-card'
import { StatsCards } from './_components/stats-cards'
import { ExpenseChart } from './_components/expense-chart'
import { FinancialSummary } from './_components/financial-summary'
import { DataTable } from '@/components/data-table'
import { transactionColumns } from '../transactions/_components/columns'
import { CategoryEnum } from '@/db/schema'
import TopBarComponent from '@/components/topbar'

const DashboardPage = async () => {
  const result = await db.query.transactionsTable.findMany({
    orderBy: (transactions, { desc }) => [desc(transactions.createdAt)],
    limit: 5,
  })

  // Calcular estatísticas
  const totalBalance = result.reduce((acc, transaction) => {
    if (transaction.type === 'DEPOSIT' || transaction.type === 'INVESTMENT') {
      return acc + parseFloat(transaction.amount)
    } else {
      return acc - parseFloat(transaction.amount)
    }
  }, 0)

  const totalIncome = result
    .filter((t) => t.type === 'DEPOSIT')
    .reduce((acc, t) => acc + parseFloat(t.amount), 0)

  const totalExpenses = result
    .filter((t) => t.type === 'EXPENSE')
    .reduce((acc, t) => acc + parseFloat(t.amount), 0)

  const totalInvestments = result
    .filter((t) => t.type === 'INVESTMENT')
    .reduce((acc, t) => acc + parseFloat(t.amount), 0)

  // Gastos por categoria - calculado a partir das transações reais
  const expenseTransactions = result.filter((t) => t.type === 'EXPENSE')

  // Mapear categorias do enum para nomes em português
  const categoryNames = {
    HOUSING: 'Moradia',
    TRANSPORTATION: 'Transporte',
    FOOD: 'Alimentação',
    ENTERTAINMENT: 'Entretenimento',
    HEALTH: 'Saúde',
    UTILITY: 'Utilidades',
    SALARY: 'Salário',
    EDUCATION: 'Educação',
    OTHER: 'Outros',
  }

  // Agrupar gastos por categoria - mostrar todas as categorias
  const expensesByCategory = Object.values(CategoryEnum.enumValues)
    .map((category) => {
      const categoryExpenses = expenseTransactions.filter(
        (t) => t.category === category
      )
      const totalAmount = categoryExpenses.reduce(
        (acc, t) => acc + parseFloat(t.amount),
        0
      )

      return {
        category: categoryNames[category] || category,
        totalAmount,
        percentageOfTotal:
          totalExpenses > 0 ? (totalAmount / totalExpenses) * 100 : 0,
      }
    })
    .sort((a, b) => b.totalAmount - a.totalAmount) // Ordenar por valor decrescente

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <TopBarComponent />
      <div className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent">
                Dashboard Financeiro
              </h1>
              <p className="text-sm text-gray-400">
                Visão geral das suas finanças
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-400">Atualizado agora</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 space-x-4">
            {/* Left Column - Primary Content */}
            <div className="col-span-2 grid grid-rows-5 space-y-4">
              {/* Balance Card - Enhanced */}
              <div className="row-span-1">
                <BalanceCard totalBalance={totalBalance} />
              </div>

              {/* Stats Cards Row */}
              <div className="row-span-1">
                <StatsCards
                  totalIncome={totalIncome}
                  totalExpenses={totalExpenses}
                  totalInvestments={totalInvestments}
                />
              </div>

              {/* Transactions Table */}
              <div className="row-span-3">
                <div className="h-full space-y-4 rounded-2xl border border-gray-800 bg-gray-950/10 px-6 py-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Transações Recentes
                    </h2>
                    <p className="text-sm text-gray-400">
                      Histórico de movimentações financeiras
                    </p>
                  </div>
                  <DataTable columns={transactionColumns} data={result} />
                </div>
              </div>
            </div>

            {/* Right Sidebar - Analytics */}
            <div className="col-span-1 grid grid-rows-3 space-y-4">
              {/* Financial Summary */}
              <div className="row-span-1">
                <FinancialSummary
                  totalIncome={totalIncome}
                  totalExpenses={totalExpenses}
                  totalBalance={totalBalance}
                />
              </div>

              {/* Expense Chart */}
              <div className="row-span-2">
                <ExpenseChart expensesByCategory={expensesByCategory} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
