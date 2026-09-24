'use client'

import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
  useId,
} from 'react'
import { Switch as SwitchPrimitive } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

type ToggleContextValue = {
  controlId: string
}

const ToggleContext = createContext<ToggleContextValue | null>(null)

function useToggle() {
  const context = useContext(ToggleContext)

  if (!context) {
    throw new Error('Toggle parts must be used inside Toggle.Root')
  }

  return context
}

type RootProps = {
  children: ReactNode
  className?: string
  id?: string
}

function Root({ children, className, id }: RootProps) {
  const generatedId = useId()
  const controlId = id ?? generatedId

  return (
    <ToggleContext value={{ controlId }}>
      <div className={cn('flex items-center justify-between gap-4', className)}>
        {children}
      </div>
    </ToggleContext>
  )
}

type LabelProps = {
  children: ReactNode
  className?: string
  icon: ReactNode
}

function Label({ children, className, icon }: LabelProps) {
  const { controlId } = useToggle()

  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-5 text-xs',
        className,
      )}
      htmlFor={controlId}
    >
      {icon}
      <span>{children}</span>
    </label>
  )
}

type ToggleSwitchProps = Omit<ComponentProps<typeof SwitchPrimitive>, 'id'>

function ToggleSwitch(props: ToggleSwitchProps) {
  const { controlId } = useToggle()

  return <SwitchPrimitive id={controlId} {...props} />
}

const Toggle = {
  Root,
  Label,
  Switch: ToggleSwitch,
}

export { Toggle }
