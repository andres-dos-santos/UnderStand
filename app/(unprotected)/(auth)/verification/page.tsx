import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Logo } from '@/components/logo'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import Image from 'next/image'
import Link from 'next/link'

export default function VerificationPage() {
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
                One last step
              </p>
              <h1 className="text-3xl font-bold tracking-[-0.05em] sm:text-4xl">
                Check your inbox.
              </h1>
              <p className="mt-4 max-w-sm text-[13px] leading-6 text-zinc-500 sm:text-sm">
                Enter the six-digit code we sent to your email to verify your
                account.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="verification-code"
                className="text-sm font-medium text-zinc-950"
              >
                Verification code
              </label>
              <InputOTP
                id="verification-code"
                name="verificationCode"
                maxLength={6}
                pattern="^\d+$"
                autoComplete="one-time-code"
                required
                containerClassName="justify-center sm:justify-start"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs leading-5 text-zinc-500">
                The code expires soon, so enter it as soon as it arrives.
              </p>
            </div>

            <p className="mt-8 text-sm text-zinc-500">
              Entered the wrong email?{' '}
              <Link
                href="/create"
                className="font-medium text-zinc-950 underline underline-offset-4"
              >
                Resend
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
