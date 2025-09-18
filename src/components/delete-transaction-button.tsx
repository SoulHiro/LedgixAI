'use client'
import { TrashIcon } from 'lucide-react'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { deleteTransaction } from '@/app/actions/delete-transaction'
import { useRouter } from 'next/navigation'

interface DeleteTransactionButtonProps {
  id: string
}

const DeleteTransactionButton = ({ id }: DeleteTransactionButtonProps) => {
  const router = useRouter()
  const onSubmit = async (id: string) => {
    try {
      await deleteTransaction(id)
      toast.success('Transação excluída com sucesso')
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }
  return (
    <Button onClick={() => onSubmit(id)} variant="ghost" size="icon">
      <TrashIcon />
    </Button>
  )
}

export default DeleteTransactionButton
