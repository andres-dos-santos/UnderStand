import { NextResponse } from 'next/server'

const SESSION_COOKIE = 'understand-session'

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = formData.get('email')

  if (typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.redirect(new URL('/login', request.url), {
      status: 303,
    })
  }

  // Fake sign-in response. Replace this object with the real authentication
  // provider response when the backend is available.
  const signInData = {
    user: {
      id: 'fake-user-id',
      email,
    },
    authenticated: true,
  }

  const response = NextResponse.redirect(new URL('/', request.url), {
    status: 303,
  })

  response.cookies.set(SESSION_COOKIE, JSON.stringify(signInData), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: formData.get('remember') === 'on' ? 60 * 60 * 24 * 30 : undefined,
  })

  return response
}
