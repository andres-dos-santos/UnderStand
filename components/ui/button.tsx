import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

function Button({
  className,
  type = 'button',
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      data-slot="button"
      type={type}
      className={cn(
        'inline-flex items-center justify-center -tracking-wider gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-4 focus-visible:ring-zinc-950/20',
        className,
      )}
      {...props}
    />
  )
}

export { Button }
