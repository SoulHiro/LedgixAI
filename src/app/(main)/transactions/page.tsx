import { DataTableWithPagination } from '@/components/data-table-with-pagination'
import { db } from '@/db'
import { transactionColumns } from './_components/columns'
import AddTransactionButton from '@/components/add-transaction-button'
import TopBarComponent from '@/components/topbar'

export default async function TransactionsPage() {
  const transactions = await db.query.transactionsTable.findMany({
    orderBy: (transactions, { desc }) => [desc(transactions.createdAt)],
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <TopBarComponent />
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent">
            Transações
          </h1>
          <AddTransactionButton />
        </div>
        <DataTableWithPagination
          columns={transactionColumns}
          data={transactions}
          pageSize={10}
        />
      </div>
    </div>
  )
}
