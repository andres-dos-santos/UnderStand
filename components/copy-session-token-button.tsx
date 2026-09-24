'use client'

import { useState } from 'react'

interface Props {
  sessionToken: string
  variant?: 'button' | 'text'
}

export function CopySessionTokenButton({
  sessionToken,
  variant = 'button',
}: Props) {
  const [copied, setCopied] = useState(false)

  async function copySessionToken() {
    await navigator.clipboard.writeText(sessionToken)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copySessionToken}
      className={
        variant === 'text'
          ? 'whitespace-nowrap text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-950 hover:underline focus-visible:outline-none focus-visible:underline dark:text-zinc-400 dark:hover:text-white'
          : 'whitespace-nowrap rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-950/20 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white'
      }
    >
      {copied ? 'Token copied' : 'Copy session token'}
    </button>
  )
}
