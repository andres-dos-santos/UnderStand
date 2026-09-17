'use client'

import {
  Backward02Icon,
  Download01Icon,
  FastForwardIcon,
  PauseIcon,
  Play,
  Timer,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useEffect, useMemo, useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useTextToSpeech } from '@/hooks/use-text-to-speech'

const WORDS_PER_MINUTE = 180

function getReadingDuration(text: string) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil((wordCount / WORDS_PER_MINUTE) * 60))
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

type AudioPlayerProps = {
  text: string
}

export function AudioPlayer({ text }: AudioPlayerProps) {
  const duration = useMemo(() => getReadingDuration(text), [text])
  const [currentTime, setCurrentTime] = useState(0)
  const { pause, paused, resume, speak, speaking, stop } = useTextToSpeech()

  useEffect(() => {
    if (!speaking) return

    const interval = window.setInterval(() => {
      setCurrentTime((time) => {
        if (time >= duration) {
          stop()
          return duration
        }

        return time + 1
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [duration, speaking, stop])

  function togglePlayback() {
    if (speaking) {
      pause()
      return
    }

    if (paused) {
      resume()
      return
    }

    speak(text, 'en-US')
  }

  function skip(seconds: number) {
    setCurrentTime((time) => Math.min(duration, Math.max(0, time + seconds)))
  }

  return (
    <Drawer
      onOpenChange={(open) => {
        if (!open) stop()
      }}
      showSwipeHandle={false}
      swipeDirection="down"
    >
      <DrawerTrigger
        render={
          <button
            aria-label="Open audio player"
            className="shadow-2xs group flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-black dark:hover:bg-zinc-800/80"
            type="button"
          />
        }
      >
        <HugeiconsIcon
          icon={Play}
          color="currentColor"
          strokeWidth={2}
          className="size-4 fill-zinc-500 text-zinc-500 transition-colors group-hover:fill-zinc-950 group-hover:text-zinc-950 group-focus-visible:fill-zinc-950 group-focus-visible:text-zinc-950 dark:group-hover:fill-white dark:group-hover:text-white dark:group-focus-visible:fill-white dark:group-focus-visible:text-white"
        />
      </DrawerTrigger>

      <DrawerContent className="overflow-visible bg-white before:pointer-events-none before:absolute before:inset-x-0 before:-top-40 before:h-40 before:bg-[linear-gradient(to_bottom,transparent,#ffffff)] before:content-[''] dark:bg-[linear-gradient(to_bottom,#111113_0%,#0d0d0f_32%,#09090b_68%,#09090b_100%)] dark:before:bg-[linear-gradient(to_bottom,transparent,#111113)]">
        <div className="mx-auto max-w-5xl px-6 pb-8 pt-6 sm:px-10 sm:pb-10 sm:pt-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <div
              aria-hidden="true"
              className="relative size-10 shrink-0 overflow-hidden rounded-xl bg-zinc-700 sm:size-14"
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_50%_50%,#7c3aed,#ec4899,#f97316,#06b6d4,#7c3aed)]" />
              <div className="absolute inset-[45%] rounded-full bg-zinc-800/80" />
            </div>

            <div className="min-w-0">
              <DrawerTitle className="truncate font-medium text-base text-zinc-900 dark:text-zinc-100">
                Animating a div
              </DrawerTitle>
              <DrawerDescription className="mt-1 truncate text-sm">
                Andres dos Santos
              </DrawerDescription>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-4 text-xs font-medium tabular-nums text-zinc-500 sm:gap-6 sm:text-sm">
            <span className="w-10 text-xs">{formatTime(currentTime)}</span>
            <input
              aria-label="Audio progress"
              className="h-0.5 flex-1 cursor-pointer appearance-none rounded-full bg-transparent accent-zinc-200 [&::-moz-range-progress]:h-0.5 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-zinc-200 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-zinc-500 [&::-moz-range-track]:h-0.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-zinc-700 [&::-webkit-slider-runnable-track]:h-0.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-zinc-500"
              max={duration}
              min="0"
              onChange={(event) => setCurrentTime(Number(event.target.value))}
              style={{
                background: `linear-gradient(to right, var(--color-zinc-200) ${(currentTime / duration) * 100}%, var(--color-zinc-700) ${(currentTime / duration) * 100}%)`,
              }}
              type="range"
              value={currentTime}
            />
            <span className="w-10 text-right text-xs">
              {formatTime(duration)}
            </span>
          </div>

          <div className="mt-7 grid grid-cols-3 items-center">
            <button
              aria-label="Download audio"
              className="justify-self-start p-2 text-zinc-400 transition-colors hover:text-white"
              type="button"
            >
              <HugeiconsIcon
                icon={Download01Icon}
                className="size-3.5"
                strokeWidth={2}
              />
            </button>

            <div className="flex items-center justify-center gap-5 sm:gap-7">
              <button
                aria-label="Go back 15 seconds"
                className="p-2 text-zinc-400 transition-colors hover:text-white"
                onClick={() => skip(-15)}
                type="button"
              >
                <HugeiconsIcon
                  icon={Backward02Icon}
                  className="size-5 fill-zinc-400/90 text-zinc-400/90"
                />
              </button>

              <button
                aria-label={speaking ? 'Pause audio' : 'Play audio'}
                className="grid size-11 place-items-center rounded-full text-zinc-200 transition-colors hover:bg-white/5 hover:text-white"
                onClick={togglePlayback}
                type="button"
              >
                <HugeiconsIcon
                  icon={speaking ? PauseIcon : Play}
                  className="size-6 fill-current"
                />
              </button>

              <button
                aria-label="Go forward 15 seconds"
                className="p-2 text-zinc-400 transition-colors hover:text-white"
                onClick={() => skip(15)}
                type="button"
              >
                <HugeiconsIcon
                  icon={FastForwardIcon}
                  className="size-5 fill-zinc-400/90 text-zinc-400/90"
                />
              </button>
            </div>

            <button
              aria-label="Restart audio"
              className="justify-self-end p-2 text-zinc-400 transition-colors hover:text-white"
              onClick={() => {
                setCurrentTime(0)
                speak(text, 'en-US')
              }}
              type="button"
            >
              <HugeiconsIcon
                icon={Timer}
                className="size-3.5"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
