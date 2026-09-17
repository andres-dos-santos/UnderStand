'use client'

import { Link, Question } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'

export default function New() {
  const [mode, setMode] = useState<'link' | 'manual'>('link')
  const isManual = mode === 'manual'

  return (
    <div className="flex h-[calc(100dvh-5rem)] flex-col overflow-hidden pt-32">
      <header className="flex items-baseline gap-20">
        <button
          type="button"
          data-active={!isManual}
          onClick={() => setMode('link')}
          className="group relative cursor-pointer"
          aria-pressed={!isManual}
        >
          <span className="font-semibold text-2xl -tracking-wider text-zinc-600 transition-colors duration-200 group-hover:text-zinc-200 group-data-[active=true]:text-white">
            Link
          </span>

          <span className="absolute -top-2 -right-3 font-medium text-xs -tracking-wider text-zinc-600 transition-colors duration-200 group-hover:text-orange-500 group-data-[active=true]:text-orange-500">
            AI
          </span>
        </button>

        <span className="mb-2 self-end font-medium text-sm -tracking-wider text-zinc-700">
          /
        </span>

        <button
          type="button"
          data-active={isManual}
          onClick={() => setMode('manual')}
          className="group relative cursor-pointer"
          aria-pressed={isManual}
        >
          <span className="font-semibold text-2xl -tracking-wider text-zinc-600 transition-colors duration-200 group-hover:text-zinc-200 group-data-[active=true]:text-white">
            Escrever
          </span>

          <span className="absolute -top-2 -right-12 font-medium text-xs -tracking-wider text-zinc-600 transition-colors duration-200 group-hover:text-orange-500 group-data-[active=true]:text-orange-500">
            MANUAL
          </span>
        </button>
      </header>

      <div className="relative min-h-0 flex-1">
        <form
          className={`absolute inset-0 flex flex-col justify-end pb-10 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isManual
              ? '-translate-x-full opacity-0 pointer-events-none'
              : 'translate-x-0 opacity-100'
          }`}
          aria-hidden={isManual}
        >
          <label className="group flex h-20 w-full items-center gap-4 rounded-full bg-zinc-800/50 px-8">
            <span className="sr-only">Link</span>
            <HugeiconsIcon
              icon={Link}
              strokeWidth={2}
              className="size-4 text-zinc-500 transition-colors group-focus-within:text-white"
            />
            <input
              type="url"
              tabIndex={isManual ? -1 : 0}
              className="w-full bg-transparent font-medium text-sm underline outline-0"
            />
          </label>
        </form>

        <form
          className={`absolute inset-0 gap-2.5 flex flex-col pb-10 pt-12 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isManual
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0 pointer-events-none'
          }`}
          aria-hidden={!isManual}
        >
          <label className="min-h-0 flex-1">
            <span className="sr-only">Conteúdo do texto</span>
            <textarea
              autoFocus={isManual}
              tabIndex={isManual ? 0 : -1}
              placeholder="Comece a escrever..."
              className="h-full w-full resize-none rounded-lg bg-zinc-800/50 p-8 text-base leading-relaxed text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:bg-zinc-800/70"
            />
          </label>

          <div className="flex items-center gap-2.5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-center h-20 w-20 bg-zinc-800 rounded-md"
              >
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>

          <footer className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 group">
              <HugeiconsIcon
                icon={Question}
                strokeWidth={2}
                className="size-4 text-zinc-500 transition-colors group-hover:text-white"
              />
              <span className="font-medium text-[10px] text-zinc-500">
                Esse texto será verificado de acordo com os{' '}
                <span className="underline group-hover:text-white">
                  termos de uso
                </span>
                .
              </span>
            </div>

            <button
              type="submit"
              tabIndex={isManual ? 0 : -1}
              className="mt-5 h-14 px-10 cursor-pointer rounded-full bg-white font-semibold text-sm text-zinc-950 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              Continuar
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}
