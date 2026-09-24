'use client'

import { type ComponentProps, createContext, useContext, useId } from 'react'
import { cn } from '@/lib/utils'

type FieldContextValue = {
  inputId: string
}

const FieldContext = createContext<FieldContextValue | null>(null)

function useField() {
  const context = useContext(FieldContext)

  if (!context) {
    throw new Error('Field parts must be used inside Field.Root')
  }

  return context
}

type RootProps = ComponentProps<'div'> & {
  id?: string
}

function Root({ children, className, id, ...props }: RootProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <FieldContext value={{ inputId }}>
      <div className={cn('flex flex-col space-y-0.5', className)} {...props}>
        {children}
      </div>
    </FieldContext>
  )
}

function Label({ children, className, ...props }: ComponentProps<'label'>) {
  const { inputId } = useField()

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'text-[13px] -tracking-wider font-medium text-zinc-800',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}

type InputProps = Omit<ComponentProps<'input'>, 'id'>

function Input({ className, ...props }: InputProps) {
  const { inputId } = useField()

  return (
    <input
      id={inputId}
      className={cn(
        'h-12 w-full rounded-md border border-zinc-300 bg-white px-3 text-[0.95rem] leading-[0.95rem] outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-950/5',
        className,
      )}
      {...props}
    />
  )
}

export { Input, Label, Root }
