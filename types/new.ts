export type New = {
  id: string | number
  created_at: string
  data: {
    title: string
    short_description: string
    html: string[]
    difficult_words: string[][]
    slug: string
    links: Array<{
      link: string
      text: string
    }>
    author: {
      name: string
    }
  }
}
