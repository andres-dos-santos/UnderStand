'use client'

import { useEffect } from 'react'
import { toast, Toaster } from 'sonner'

const AUTH_ATTEMPT_KEY = 'understand-google-auth-pending'

function getAuthError(searchParams: URLSearchParams) {
  return (
    searchParams.get('error_description') ??
    searchParams.get('error') ??
    searchParams.get('message')
  )
}

export function AuthFeedback() {
  useEffect(() => {
    const handleGoogleSignIn = (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Element)) return

      const link = target.closest<HTMLAnchorElement>('[data-google-auth]')
      if (!link) return

      sessionStorage.setItem(AUTH_ATTEMPT_KEY, 'true')
    }

    document.addEventListener('click', handleGoogleSignIn)

    const searchParams = new URLSearchParams(window.location.search)
    const authError = getAuthError(searchParams)
    const hasPendingAttempt =
      sessionStorage.getItem(AUTH_ATTEMPT_KEY) === 'true'

    if (authError || hasPendingAttempt) {
      sessionStorage.removeItem(AUTH_ATTEMPT_KEY)

      if (authError || window.location.pathname === '/login') {
        toast.error('Could not sign in with Google', {
          description:
            authError ?? 'Authentication was not completed. Please try again.',
        })
      } else {
        toast.success('Signed in successfully', {
          description: 'Welcome back!',
        })
      }
    }

    return () => document.removeEventListener('click', handleGoogleSignIn)
  }, [])

  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{ duration: 5000 }}
    />
  )
}
