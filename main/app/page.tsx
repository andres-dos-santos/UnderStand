'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  SearchIcon,
  Menu01Icon,
  DashboardSquare02Icon,
} from '@hugeicons/core-free-icons'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const lists = [
  {
    slug: 'list-of-ux',
    name: 'Laws of UX',
    author: 'Raphael Salaja',
    publishedAt: 'Feb 16, 2026',
    description:
      "There's a set of psychological principles behind every interface that feels right. Here are the ones I think about the most.",
    year: '2026',
    date: '02/16',
  },
  {
    slug: 'animating-a-div',
    name: 'Animating a div',
    author: 'Andres dos Santos',
    publishedAt: 'Mar 16, 2026',
    description:
      'A practical look at creating lightweight animations with a clear purpose and considerate fallbacks.',
    year: '2026',
    date: '03/16',
  },
  {
    slug: 'pseudo-elements',
    name: 'Pseudo elements',
    author: 'Maya Chen',
    publishedAt: 'Apr 16, 2026',
    description:
      'How small CSS details can add structure, personality, and polish without adding extra markup.',
    year: '2026',
    date: '04/16',
  },
]

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  )
}

function HomeContent() {
  const searchParams = useSearchParams()

  const list = searchParams.get('list')
  const isDetailedView = list === 'grid'

  return (
    <div className="pt-32">
      <h1 className="font-semibold text-2xl -tracking-wide">
        A living manual for english learners
      </h1>

      <section className="h-20 mt-32 flex items-center justify-between">
        <form action="" className="flex items-center gap-5 group">
          <HugeiconsIcon
            icon={SearchIcon}
            color="currentColor"
            strokeWidth={2}
            className="size-4 text-zinc-500 group-focus-within:text-white"
          />
          <input
            type="text"
            className="outline-none placeholder:text-zinc-300/60 text-sm"
            placeholder="Search..."
          />
        </form>

        <div className="flex items-center gap-2.5">
          <Link
            href="?list=grid"
            className="h-5 w-5 items-center justify-center flex group"
          >
            <HugeiconsIcon
              icon={DashboardSquare02Icon}
              strokeWidth={2}
              data-active={list === 'grid'}
              className="size-4 text-zinc-500/60 group-hover:text-zinc-400 data-[active=true]:text-white"
            />
          </Link>

          <Link
            href="?list=list"
            className="h-5 w-5 items-center justify-center flex group"
          >
            <HugeiconsIcon
              icon={Menu01Icon}
              strokeWidth={2}
              data-active={list === 'list'}
              className="size-4 text-zinc-500/60 group-hover:text-zinc-400 data-[active=true]:text-white"
            />
          </Link>
        </div>
      </section>

      <ul className="mt-10">
        {lists.map((item) => (
          <li key={item.name}>
            {isDetailedView ? (
              <Link
                href={item.slug}
                className="group block border-b border-zinc-800 py-10 group"
              >
                <h2 className="font-medium text-sm text-zinc-100">
                  {item.name}
                </h2>
                <p className="group-hover:text-zinc-200 mt-2 text-[13px] text-zinc-500 transition-colors">
                  {item.author}
                  <span className="px-2 group-hover:text-zinc-200">•</span>
                  {item.publishedAt}
                </p>
                <p className="group-hover:text-zinc-200 mt-4 max-w-4xl text-[13px] leading-5 text-zinc-500 transition-colors">
                  {item.description}
                </p>
              </Link>
            ) : (
              <Link
                href={item.slug}
                className="group flex h-10 cursor-pointer items-center justify-between border-b border-zinc-800 font-medium"
              >
                <div className="flex items-center gap-6">
                  <p className="text-[13px] text-zinc-500 group-hover:text-zinc-200">
                    {item.year}
                  </p>
                  <p className="text-sm">{item.name}</p>
                </div>

                <p className="text-[13px] text-zinc-500 group-hover:text-zinc-200">
                  {item.date}
                </p>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
