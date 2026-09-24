import 'server-only'

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export type User = {
  name: string
  picture?: string
}

type MeResponse = {
  name?: string
  picture?: string
  user?: {
    name?: string
    picture?: string
  }
}

export async function getCurrentUser(
  sessionCookie: string,
): Promise<User | null> {
  const response = await fetch(new URL('/me', apiUrl), {
    cache: 'no-store',
    headers: {
      accept: 'application/json',
      cookie: `understand-session=${sessionCookie}`,
    },
  })

  if (response.status === 401 || response.status === 404) return null

  if (!response.ok) {
    throw new Error(
      `Failed to fetch current user: ${response.status} ${response.statusText}`,
    )
  }

  const data = (await response.json()) as MeResponse
  const user = data.user ?? data

  if (!user.name) return null

  return {
    name: user.name,
    picture: user.picture,
  }
}
