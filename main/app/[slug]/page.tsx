import { EllipsisIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AudioPlayer } from './audio-player'

type PageProps = {
  params: Promise<{ slug: string }>
}

const articleParagraphs = [
  'Animations can make an interface feel more responsive and intentional. In this post, we will animate a simple div with CSS and keep the motion smooth, subtle, and accessible.',
  'First, create the element that will move. A small square is enough to demonstrate the technique without distracting from the animation itself.',
  'Use keyframes to describe the beginning and end states. Animating lets the browser render the transition efficiently.',
  'Some people prefer interfaces with less motion. Disable non-essential animation when the operating system requests it.',
  'That is all you need: a lightweight animation, a clear purpose, and a considerate fallback.',
  'That is all you need: a lightweight animation, a clear purpose, and a considerate fallback.',
  'That is all you need: a lightweight animation, a clear purpose, and a considerate fallback.',
  'That is all you need: a lightweight animation, a clear purpose, and a considerate fallback.',
  'That is all you need: a lightweight animation, a clear purpose, and a considerate fallback.',
]

export default async function Slug({ params }: PageProps) {
  const { slug } = await params

  return (
    <div className="pt-32">
      <header className="flex items-center justify-between">
        <h1 className="font-semibold text-3xl -tracking-wide">
          Animating a div
        </h1>

        <div className="flex items-center gap-2">
          <AudioPlayer text={articleParagraphs.join(' ')} />
          <button
            className="shadow-2xs group flex items-center justify-center h-8 w-8 rounded-full border border-zinc-700 bg-black hover:bg-zinc-800/80"
            type="button"
          >
            <HugeiconsIcon
              icon={EllipsisIcon}
              color="currentColor"
              strokeWidth={2}
              className="size-4 group-hover:text-white text-zinc-500 group-focus-within:text-white"
            />
          </button>
        </div>
      </header>

      <article
        className="prose prose-zinc mt-2.5 max-w-none dark:prose-invert prose-p:text-[13px] prose-p:leading-6 prose-h2:text-lg text-zinc-400"
        data-slug={slug}
      >
        <p>Dec 28, 2026 by Andres dos Santos</p>

        {articleParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>

      <footer className="border-t border-zinc-800 mt-10 pt-10 pb-32">
        <ol>
          <li className="flex items-center gap-2">
            <p className="text-[10px] font-semibold text-zinc-600 mb-2">1</p>
            <p className="text-xs text-zinc-600">
              Motion should clarify what changed, not compete with the content
              for attention.
            </p>
          </li>
        </ol>
      </footer>
    </div>
  )
}
