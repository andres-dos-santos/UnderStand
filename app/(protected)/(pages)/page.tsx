import { HugeiconsIcon } from '@hugeicons/react'
import { SearchIcon } from '@hugeicons/core-free-icons'
import { cookies } from 'next/headers'

import { News } from '@/components/news'
import { NewsModel } from '@/model/news'

export default async function HomeContent() {
  const sessionCookie = (await cookies()).get('understand-session')?.value
  const news = sessionCookie ? await NewsModel.getAll(sessionCookie) : []

  return (
    <div className="mx-auto max-w-4xl pt-20 sm:pt-32 px-5 sm:px-0">
      <div>
        <h1 className="font-semibold text-4xl font-title -tracking-wide">
          A living library for english learners
        </h1>
      </div>

      <section className="h-20 mt-20 sm:mt-32 flex items-center justify-between">
        <form action="" className="flex items-center gap-5 group w-full h-10">
          <HugeiconsIcon
            icon={SearchIcon}
            color="currentColor"
            strokeWidth={2}
            className="size-4 text-zinc-500 group-focus-within:text-zinc-950 dark:group-focus-within:text-white"
          />
          <input
            type="text"
            className="outline-none w-full h-full placeholder:text-zinc-400 text-sm dark:placeholder:text-zinc-300/60"
            placeholder="Search..."
          />
        </form>
      </section>

      <News news={news} />
    </div>
  )
}
