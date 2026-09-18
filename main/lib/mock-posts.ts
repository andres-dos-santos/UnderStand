export type Post = {
  _id: string
  title: string
  created_at: string
  short_description: string
  html: string[]
  slug: string
  links: Array<{
    link: string
    text: string
  }>
  author: {
    name: string
  }
}

export const mockPosts: Post[] = [
  {
    _id: '1',
    title: 'Why Animations Matter in UI Design',
    created_at: '2026-09-17T00:00:00.000Z',
    short_description:
      "There's a set of psychological principles behind every interface that feels right. Here are the ones I think about the most.",
    html: [
      '<p>Animations are <strong>important</strong> in apps. They make the app feel nice to use.</p><p>When you tap a button, something moves on the screen. This helps the user understand what is happening.</p><p>Simple animations can make an app feel <em>more fun</em> and alive.</p>',
      "<p>Animations can make an interface feel <strong>more responsive</strong>. When a user taps a button or swipes a screen, a small animation gives <em>instant feedback</em>.</p><p>This helps people understand that their action worked. Animations also guide the user's attention, showing them where to look next.</p><p>Without animations, apps can feel <em>static</em> and less natural to use.</p>",
      '<p>Animations can make an interface feel <strong>more responsive and intentional</strong>. Beyond simple visual polish, well-crafted motion communicates system status, reinforces spatial relationships between elements, and reduces the cognitive load required to track changes in the UI.</p><p>A carefully timed transition can make an interaction feel <em>instantaneous</em> even when there is underlying latency, while an abrupt or missing animation can make the same interface feel broken or unpolished.</p><p>In this sense, animation is <strong>not merely decorative</strong> — it is a core part of the interaction design, shaping how trustworthy and thoughtful an application feels to the user.</p>',
    ],
    slug: 'why-animations-matter-in-ui-design',
    links: [
      {
        link: 'https://ea.com',
        text: 'Motion should clarify what changed, not compete with the content for attention.',
      },
    ],
    author: {
      name: 'Raphael Fiziev',
    },
  },
]

export function getMockPost(slug: string) {
  return mockPosts.find((post) => post.slug === slug) ?? null
}
