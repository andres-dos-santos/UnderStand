import dayjs from 'dayjs'
import Link from 'next/link'
import { mockPosts } from '@/lib/mock-posts'

export function Posts() {
  return (
    <ul className="mt-10">
      {mockPosts.map((item) => (
        <li key={item._id}>
          {/* {isDetailedView ? ( */}
          <Link
            href={item.slug}
            className="group block border-b border-zinc-200 py-10 dark:border-zinc-800"
          >
            <h2 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
              {item.title}
            </h2>
            <p className="group-hover:text-zinc-800 mt-2 text-[13px] text-zinc-500 transition-colors dark:group-hover:text-zinc-200">
              {item.author?.name}
              <span className="px-2 group-hover:text-zinc-800 dark:group-hover:text-zinc-200">
                •
              </span>
              {dayjs(item.created_at).format('MMM DD[,] YYYY')}
            </p>
            <p className="group-hover:text-zinc-800 mt-4 max-w-4xl text-[13px] leading-5 text-zinc-500 transition-colors dark:group-hover:text-zinc-200">
              {item.short_description}
            </p>
          </Link>
          {/* ) : (
            <Link
              href={item.slug}
              className="group flex h-10 cursor-pointer items-center justify-between border-b border-zinc-200 font-medium dark:border-zinc-800"
            >
              <div className="flex items-center gap-6">
                <p className="text-[13px] text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200">
                  {item.year}
                </p>
                <p className="text-sm">{item.name}</p>
              </div>

              <p className="text-[13px] text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200">
                {item.date}
              </p>
            </Link>
          )} */}
        </li>
      ))}
    </ul>
  )
}
