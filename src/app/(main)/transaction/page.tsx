import { db } from '@/db'
import { BalanceCard } from './_components/balance-card'
import { StatsCards } from './_components/stats-cards'
import { ExpensesByCategory } from './_components/expenses-by-category'
import { TransactionsList } from './_components/transactions-list'

const TransactionsPage = async () => {
  const result = await db.query.transactionsTable.findMany({})

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

  // Gastos por categoria
  const expensesByCategoryData = {
    Moradia: 2500,
    Alimentação: 800,
    Transporte: 100,
    Saúde: 100,
  }

  // Transformar em array com percentuais
  const totalExpensesByCategory = Object.values(expensesByCategoryData).reduce((sum, value) => sum + value, 0)
  const expensesByCategory = Object.entries(expensesByCategoryData).map(([category, totalAmount]) => ({
    category,
    totalAmount,
    percentageOfTotal: (totalAmount / totalExpensesByCategory) * 100,
  }))

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-8 space-y-6">
            {/* Balance Card */}
            <BalanceCard totalBalance={totalBalance} />

            {/* Stats Cards */}
            <StatsCards
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              totalInvestments={totalInvestments}
            />

            {/* Transactions */}
            <TransactionsList transactions={result} />
          </div>

          {/* Right Column - Expenses by Category */}
          <div className="col-span-4">
            <ExpensesByCategory expensesByCategory={expensesByCategory} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage
