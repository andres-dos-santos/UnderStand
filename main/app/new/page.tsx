'use client'

import { Link, Question } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'

export default function New() {
  const [mode, setMode] = useState<'link' | 'manual'>('link')
  const isManual = mode === 'manual'

  return (
    <div className="flex h-[calc(100dvh-5rem)] flex-col overflow-hidden pt-12 sm:pt-20 md:pt-32">
      <header className="flex items-baseline gap-8 sm:gap-14 md:gap-20">
        <button
          type="button"
          data-active={!isManual}
          onClick={() => setMode('link')}
          className="group relative cursor-pointer"
          aria-pressed={!isManual}
        >
          <span className="font-semibold text-2xl -tracking-wider text-zinc-400 transition-colors duration-200 group-hover:text-zinc-700 group-data-[active=true]:text-zinc-950 dark:text-zinc-600 dark:group-hover:text-zinc-200 dark:group-data-[active=true]:text-white">
            Link
          </span>

          <span className="absolute -top-2 -right-3 font-medium text-xs -tracking-wider text-zinc-600 transition-colors duration-200 group-hover:text-orange-500 group-data-[active=true]:text-orange-500">
            AI
          </span>
        </button>

        <span className="mb-2 self-end font-medium text-sm -tracking-wider text-zinc-300 dark:text-zinc-700">
          /
        </span>

        <button
          type="button"
          data-active={isManual}
          onClick={() => setMode('manual')}
          className="group relative cursor-pointer"
          aria-pressed={isManual}
        >
          <span className="font-semibold text-2xl -tracking-wider text-zinc-400 transition-colors duration-200 group-hover:text-zinc-700 group-data-[active=true]:text-zinc-950 dark:text-zinc-600 dark:group-hover:text-zinc-200 dark:group-data-[active=true]:text-white">
            Escrever
          </span>

          <span className="absolute -top-2 -right-12 font-medium text-xs -tracking-wider text-zinc-600 transition-colors duration-200 group-hover:text-orange-500 group-data-[active=true]:text-orange-500">
            MANUAL
          </span>
        </button>
      </header>

      <div className="relative min-h-0 flex-1">
        <form
          className={`absolute inset-0 flex flex-col justify-end pb-5 sm:pb-8 md:pb-10 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isManual
              ? '-translate-x-full opacity-0 pointer-events-none'
              : 'translate-x-0 opacity-100'
          }`}
          aria-hidden={isManual}
        >
          <label className="group flex h-16 w-full items-center gap-3 rounded-full bg-zinc-100 px-5 sm:h-20 sm:gap-4 sm:px-8 dark:bg-zinc-800/50">
            <span className="sr-only">Link</span>
            <HugeiconsIcon
              icon={Link}
              strokeWidth={2}
              className="size-4 text-zinc-500 transition-colors group-focus-within:text-zinc-950 dark:group-focus-within:text-white"
            />
            <input
              type="url"
              tabIndex={isManual ? -1 : 0}
              className="w-full bg-transparent font-medium text-sm underline outline-0"
            />
          </label>
        </form>

        <form
          className={`absolute inset-0 flex flex-col gap-2.5 pb-5 pt-6 sm:pb-8 sm:pt-9 md:pb-10 md:pt-12 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isManual
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0 pointer-events-none'
          }`}
          aria-hidden={!isManual}
        >
          <label className="min-h-0 flex-1">
            <span className="sr-only">Conteúdo do texto</span>
            <textarea
              tabIndex={isManual ? 0 : -1}
              placeholder="Comece a escrever..."
              className="h-full w-full resize-none rounded-lg bg-zinc-100 p-4 text-base leading-relaxed text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:bg-zinc-200/70 sm:p-6 md:p-8 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:bg-zinc-800/70"
            />
          </label>

          <div className="flex items-center gap-2.5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex size-14 items-center justify-center rounded-md bg-zinc-100 sm:size-20 dark:bg-zinc-800"
              >
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>

          <footer className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="flex items-center gap-2.5 group">
              <HugeiconsIcon
                icon={Question}
                strokeWidth={2}
                className="size-4 text-zinc-500 transition-colors group-hover:text-zinc-950 dark:group-hover:text-white"
              />
              <span className="font-medium text-[10px] text-zinc-500">
                Esse texto será verificado de acordo com os{' '}
                <span className="underline group-hover:text-zinc-950 dark:group-hover:text-white">
                  termos de uso
                </span>
                .
              </span>
            </div>

            <button
              type="submit"
              tabIndex={isManual ? 0 : -1}
              className="h-12 w-full shrink-0 cursor-pointer rounded-full bg-zinc-950 px-8 font-semibold text-sm text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 sm:mt-5 sm:h-14 sm:w-auto sm:px-10 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              Continuar
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}
