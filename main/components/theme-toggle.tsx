'use client'

import { Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useEffect, useRef, useState } from 'react'

type Theme = 'light' | 'dark'
type AnimationPhase = 'idle' | 'out' | 'in'

function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle')
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])
  const audioContext = useRef<AudioContext | null>(null)

  useEffect(() => {
    setTheme(getTheme())

    return () => {
      for (const timeout of timeouts.current) clearTimeout(timeout)
      void audioContext.current?.close()
    }
  }, [])

  function playClickSound() {
    const context = audioContext.current ?? new AudioContext()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const now = context.currentTime

    audioContext.current = context
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(620, now)
    oscillator.frequency.exponentialRampToValueAtTime(280, now + 0.045)
    gain.gain.setValueAtTime(0.055, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(now)
    oscillator.stop(now + 0.05)
  }

  function toggleTheme() {
    if (animationPhase !== 'idle') return

    playClickSound()
    setAnimationPhase('out')

    timeouts.current.push(
      setTimeout(() => {
        const nextTheme = getTheme() === 'dark' ? 'light' : 'dark'

        document.documentElement.classList.toggle('dark', nextTheme === 'dark')
        document.documentElement.style.colorScheme = nextTheme
        localStorage.setItem('theme', nextTheme)
        setTheme(nextTheme)
        setAnimationPhase('in')

        timeouts.current.push(setTimeout(() => setAnimationPhase('idle'), 20))
      }, 140),
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Use light theme' : 'Use dark theme'}
      title={isDark ? 'Use light theme' : 'Use dark theme'}
      className="grid size-7 cursor-pointer place-items-center rounded-full group"
    >
      <span
        className={`transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          animationPhase === 'idle' ? 'scale-100' : 'scale-0'
        }`}
      >
        <HugeiconsIcon
          icon={isDark ? Sun03Icon : Moon02Icon}
          className="size-3.5 fill-zinc-400 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-white group-hover:fill-zinc-700 dark:group-hover:fill-white transition-colors duration-300"
          strokeWidth={2}
        />
      </span>
    </button>
  )
}
