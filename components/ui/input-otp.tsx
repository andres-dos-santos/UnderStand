'use client'

import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'

import { cn } from '@/lib/utils'

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput>) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        'flex items-center gap-2 has-disabled:opacity-50',
        containerClassName,
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn('flex items-center', className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        'relative flex size-12 items-center justify-center border-y border-r border-zinc-200 text-lg font-medium first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:border-zinc-950 data-[active=true]:ring-4 data-[active=true]:ring-zinc-950/10',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-caret-blink bg-zinc-950 duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator(props: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="input-otp-separator"
      aria-hidden="true"
      className="text-zinc-400"
      {...props}
    >
      −
    </span>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
