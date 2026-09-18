import { HugeiconsIcon } from '@hugeicons/react'
import {
  SearchIcon,
  Menu01Icon,
  DashboardSquare02Icon,
} from '@hugeicons/core-free-icons'
import Link from 'next/link'
import { Posts } from '@/components/posts'

export default function HomeContent() {
  // const searchParams = useSearchParams()

  // const list = searchParams.get('list')
  // const isDetailedView = list === 'grid'

  return (
    <div className="pt-32">
      <h1 className="font-semibold text-2xl -tracking-wide">
        A living library for english learners
      </h1>

      <section className="h-20 mt-32 flex items-center justify-between">
        <form action="" className="flex items-center gap-5 group">
          <HugeiconsIcon
            icon={SearchIcon}
            color="currentColor"
            strokeWidth={2}
            className="size-4 text-zinc-500 group-focus-within:text-zinc-950 dark:group-focus-within:text-white"
          />
          <input
            type="text"
            className="outline-none placeholder:text-zinc-400 text-sm dark:placeholder:text-zinc-300/60"
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
              // data-active={list === 'grid'}
              className="size-4 text-zinc-400 group-hover:text-zinc-700 data-[active=true]:text-zinc-950 dark:text-zinc-500/60 dark:group-hover:text-zinc-400 dark:data-[active=true]:text-white"
            />
          </Link>

          <Link
            href="?list=list"
            className="h-5 w-5 items-center justify-center flex group"
          >
            <HugeiconsIcon
              icon={Menu01Icon}
              strokeWidth={2}
              // data-active={list === 'list'}
              className="size-4 text-zinc-400 group-hover:text-zinc-700 data-[active=true]:text-zinc-950 dark:text-zinc-500/60 dark:group-hover:text-zinc-400 dark:data-[active=true]:text-white"
            />
          </Link>
        </div>
      </section>

      <Posts />
    </div>
  )
}
