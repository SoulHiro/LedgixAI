export type Transaction = {
  type: 'DEPOSIT' | 'EXPENSE' | 'INVESTMENT'
  name: string
  amount: string
  category:
    | 'HOUSING'
    | 'TRANSPORTATION'
    | 'FOOD'
    | 'ENTERTAINMENT'
    | 'HEALTH'
    | 'UTILITY'
    | 'SALARY'
    | 'EDUCATION'
    | 'OTHER'
  date: Date
  paymentMethod:
    | 'CREDIT_CARD'
    | 'DEBIT_CARD'
    | 'BANK_TRANSFER'
    | 'BANK_SLIP'
    | 'CASH'
    | 'PIX'
    | 'OTHER'
}
