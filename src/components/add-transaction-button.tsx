'use client'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import z from 'zod'
import {
  TransactionTypeEnum,
  PaymentMethodEnum,
  CategoryEnum,
} from '@/db/schema'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import MoneyInput from './money-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { TRANSACTION_TYPES_OPTIONS } from './_constants/transactions'
import { createTransaction } from '@/app/actions/create-transaction'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CATEGORY_OPTIONS = [
  { label: 'Moradia', value: 'HOUSING' },
  { label: 'Transporte', value: 'TRANSPORTATION' },
  { label: 'Alimentação', value: 'FOOD' },
  { label: 'Entretenimento', value: 'ENTERTAINMENT' },
  { label: 'Saúde', value: 'HEALTH' },
  { label: 'Utilidades', value: 'UTILITY' },
  { label: 'Salário', value: 'SALARY' },
  { label: 'Educação', value: 'EDUCATION' },
  { label: 'Outros', value: 'OTHER' },
]

const PAYMENT_METHOD_OPTIONS = [
  { label: 'Cartão de Crédito', value: 'CREDIT_CARD' },
  { label: 'Cartão de Débito', value: 'DEBIT_CARD' },
  { label: 'Transferência Bancária', value: 'BANK_TRANSFER' },
  { label: 'Boleto Bancário', value: 'BANK_SLIP' },
  { label: 'Dinheiro', value: 'CASH' },
  { label: 'PIX', value: 'PIX' },
  { label: 'Outros', value: 'OTHER' },
]

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  amount: z.string().min(1, { message: 'Valor é obrigatório' }),
  type: z.enum(TransactionTypeEnum.enumValues, {
    message: 'Tipo é obrigatório',
  }),
  category: z.enum(CategoryEnum.enumValues, {
    message: 'Categoria é obrigatória',
  }),
  paymentMethod: z.enum(PaymentMethodEnum.enumValues, {
    message: 'Método de pagamento é obrigatório',
  }),
  date: z.date({ message: 'Data é obrigatória' }),
})

type FormSchema = z.infer<typeof formSchema>

const AddTransactionButton = () => {
  const [open, setOpen] = useState(false) //
  const router = useRouter()
  const form = useForm<FormSchema>({
    defaultValues: {
      name: '',
      amount: '',
      type: 'DEPOSIT' as const,
      category: 'OTHER' as const,
      paymentMethod: 'OTHER' as const,
      date: new Date(),
    },
  })

  const onSubmit = async (data: FormSchema) => {
    try {
      await createTransaction(data)
      toast.success('Transação adicionada com sucesso')
      form.reset()
      setOpen(false)
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 text-white hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Transação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
          <DialogDescription>
            Adicione uma nova transação à sua conta.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite um Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      value={field.value}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue || 0)
                      }}
                      placeholder="R$ 0,00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPES_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um método de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? field.value.toISOString().split('T')[0]
                          : ''
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button>Cancelar</Button>
              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Adicionando...' : 'Adicionar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTransactionButton
