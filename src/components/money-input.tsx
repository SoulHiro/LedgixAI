import { forwardRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { Input } from '@/components/ui/input'
import React from 'react'

const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<React.ComponentProps<"input">>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator={'.'}
        decimalSeparator={','}
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
      />
    )
  }
)

export default MoneyInput
