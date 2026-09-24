import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')

  if (
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    typeof email !== 'string' ||
    !email.includes('@')
  ) {
    return NextResponse.redirect(new URL('/create', request.url), {
      status: 303,
    })
  }

  return NextResponse.redirect(new URL('/verification', request.url), {
    status: 303,
  })
}
