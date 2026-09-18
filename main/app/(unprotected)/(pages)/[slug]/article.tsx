'use client'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  EllipsisIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useCallback, useEffect, useState } from 'react'
import { AudioPlayer } from './audio-player'

type LevelSwitcherProps = {
  author: string
  date: string
  levels: string[]
  links: Array<{
    link: string
    text: string
  }>
  title: string
}

const BLOCK_ELEMENT_PATTERN =
  /<(?:article|blockquote|div|h[1-6]|ol|p|pre|section|table|ul)\b/i

function addParagraphs(html: string) {
  const content = html.trim()

  if (!content || BLOCK_ELEMENT_PATTERN.test(content)) {
    return content
  }

  return content
    .split(/(?:\r?\n\s*)+/)
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph.trim()}</p>`)
    .join('')
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function Article({
  author,
  date,
  levels,
  links,
  title,
}: LevelSwitcherProps) {
  const [levelIndex, setLevelIndex] = useState(0)

  const increaseLevel = useCallback(() => {
    setLevelIndex((currentLevel) =>
      Math.min(currentLevel + 1, levels.length - 1),
    )
  }, [levels.length])

  const decreaseLevel = useCallback(() => {
    setLevelIndex((currentLevel) => Math.max(currentLevel - 1, 0))
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        increaseLevel()
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        decreaseLevel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [decreaseLevel, increaseLevel])

  return (
    <>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-6">
        <h1 className="min-w-0 text-3xl font-semibold leading-tight -tracking-wide">
          {title}
        </h1>
        <div className="group flex shrink-0 items-center justify-center">
          <div className="relative flex items-start">
            <span className="font-medium text-zinc-500 dark:text-zinc-700 block mr-2 mt-2">
              LVL{' '}
            </span>
            <span className="font-mono text-4xl font-medium text-zinc-500 dark:text-zinc-700">
              {levelIndex + 1}
            </span>
          </div>
        </div>
      </header>

      <span className="mt-2.5 block text-[11px] font-semibold tracking-widest text-zinc-400 uppercase">
        {date} by {author}
      </span>

      <article
        className="prose prose-zinc mt-2.5 max-w-none text-zinc-600 dark:prose-invert prose-p:text-sm prose-p:leading-6 prose-h2:text-lg dark:text-white"
        aria-live="polite"
      >
        <div
          className="mt-10"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Post HTML is supplied by the trusted API and sanitized there.
          dangerouslySetInnerHTML={{
            __html: addParagraphs(levels[levelIndex] ?? ''),
          }}
        />
      </article>

      {links.length > 0 && (
        <footer className="mt-10 border-t border-zinc-200 pb-32 pt-10 dark:border-zinc-800">
          <ol className="space-y-2">
            {links.map((item, index) => (
              <li className="flex items-start gap-2" key={item.link}>
                <span className="mt-0.5 text-[10px] font-semibold text-zinc-400 dark:text-zinc-600">
                  {index + 1}
                </span>
                <a
                  className="text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  href={item.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </footer>
      )}

      <div className="fixed bottom-10 left-1/2 z-40 grid w-full max-w-3xl -translate-x-1/2 grid-cols-3 items-center px-5 sm:px-20">
        <div className="justify-self-start">
          <AudioPlayer
            author={author}
            key={levelIndex}
            text={stripHtml(levels[levelIndex] ?? '')}
            title={title}
          />
        </div>

        <div className="flex items-center justify-center gap-2.5">
          <button
            aria-label="Increase English level"
            className="flex size-8 items-center justify-center rounded-[7px] border border-zinc-400 shadow-sm transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-35 dark:border-zinc-700 dark:bg-zinc-900/20 dark:hover:bg-zinc-800"
            disabled={levelIndex === levels.length - 1}
            onClick={increaseLevel}
            type="button"
          >
            <HugeiconsIcon
              icon={ArrowUpIcon}
              strokeWidth={2}
              className="size-4 text-black dark:text-white"
            />
          </button>

          <p className="text-center text-xs -tracking-wider text-zinc-600 dark:text-zinc-400">
            ou
          </p>

          <button
            aria-label="Decrease English level"
            className="flex size-8 items-center justify-center rounded-[7px] border border-zinc-400 shadow-sm transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-35 dark:border-zinc-700 dark:bg-zinc-900/20 dark:hover:bg-zinc-800"
            disabled={levelIndex === 0}
            onClick={decreaseLevel}
            type="button"
          >
            <HugeiconsIcon
              icon={ArrowDownIcon}
              strokeWidth={2}
              className="size-4 text-black dark:text-white"
            />
          </button>
        </div>

        <button
          aria-label="More options"
          className="group flex size-8 items-center justify-center justify-self-end rounded-[7px] border border-zinc-400 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/20 dark:hover:bg-zinc-800"
          type="button"
        >
          <HugeiconsIcon
            icon={EllipsisIcon}
            strokeWidth={2}
            className="size-4 text-black dark:text-white"
          />
        </button>
      </div>
    </>
  )
}
