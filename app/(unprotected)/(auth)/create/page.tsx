import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import * as Field from '@/components/field'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.98-.9 6.63-2.36l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.93A6.02 6.02 0 0 1 6.07 12c0-.67.12-1.32.32-1.93V7.45H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.55l3.35-2.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.45l3.35 2.62C7.18 7.7 9.39 5.94 12 5.94Z"
      />
    </svg>
  )
}

export default function CreateAccountPage() {
  return (
    <main className="min-h-dvh p-0 text-zinc-950">
      <div className="mx-auto grid min-h-dvh max-w-[1800px] overflow-hidden lg:min-h-[calc(100dvh)] lg:grid-cols-[1.08fr_0.92fr] lg:rounded-[0.5rem]">
        <section className="relative min-h-56 overflow-hidden bg-zinc-900 sm:min-h-72 lg:min-h-0">
          <Image
            src="https://images.unsplash.com/photo-1750809411151-c46ca3d43b97?auto=format&fit=crop&q=85&w=1800"
            alt="A person reading among tall library shelves"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/75" />

          <div className="absolute left-6 top-6 z-10 text-white sm:left-9 sm:top-9 [&_span]:!text-white [&_svg]:!size-10 [&_svg]:!text-white">
            <Logo />
          </div>

          <div className="absolute inset-x-6 bottom-6 text-white sm:inset-x-9 sm:bottom-9 lg:inset-x-12 lg:bottom-12">
            <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-white/60">
              A living library
            </p>
            <h2 className="max-w-xl text-2xl font-semibold leading-tight tracking-[-0.06em] sm:text-4xl lg:text-5xl">
              Turn every story into a new way to understand English.
            </h2>
            <a
              href="https://unsplash.com/photos/a-man-reads-a-book-in-a-library-pbQJaPEcc34"
              target="_blank"
              rel="noreferrer"
              className="mt-7 hidden w-fit items-center gap-1 text-xs text-white/55 transition-colors hover:text-white lg:flex"
            >
              Photo by Elijah Crouch
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                className="size-3"
                strokeWidth={1.8}
              />
            </a>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-sm">
            <div className="mb-10">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">
                Start your journey
              </p>
              <h1 className="text-3xl font-bold tracking-[-0.05em] sm:text-4xl">
                Create your account.
              </h1>
              <p className="mt-4 max-w-sm text-[13px] leading-6 text-zinc-500 sm:text-sm">
                Save your progress, collect new vocabulary, and make every story
                part of your English journey.
              </p>
            </div>

            <form action="/api/sign-up" method="post" className="space-y-5">
              <Field.Root id="name">
                <Field.Label>Full name</Field.Label>
                <Field.Input name="name" required />
              </Field.Root>
              <Field.Root id="email">
                <Field.Label>Email address</Field.Label>
                <Field.Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </Field.Root>

              <Button
                type="submit"
                className="group h-12 w-full bg-zinc-950 text-white hover:bg-zinc-800"
              >
                Create account
              </Button>

              <div className="flex items-center gap-4" aria-hidden="true">
                <div className="h-px flex-1 bg-zinc-200" />
                <span className="text-xs font-medium text-zinc-400">OR</span>
                <div className="h-px flex-1 bg-zinc-200" />
              </div>

              <a
                href="/sign-up"
                data-google-auth
                className="inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-zinc-300 bg-white text-sm font-medium -tracking-wider text-zinc-950 outline-none transition hover:bg-zinc-50 focus-visible:ring-4 focus-visible:ring-zinc-950/20"
              >
                <GoogleLogo className="size-5" />
                Continue with Google
              </a>
            </form>

            <p className="mt-8 text-center text-sm text-zinc-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-zinc-950 underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
