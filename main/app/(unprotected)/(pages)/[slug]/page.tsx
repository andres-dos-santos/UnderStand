import { notFound } from 'next/navigation'
import { getMockPost } from '@/lib/mock-posts'
import { Article } from './article'

type PageProps = {
  params: Promise<{ slug: string }>
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function Slug({ params }: PageProps) {
  const { slug } = await params
  const post = getMockPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-32">
      <Article
        author={post.author?.name ?? 'Unknown'}
        date={formatDate(post.created_at)}
        levels={post.html}
        links={post.links ?? []}
        title={post.title}
      />
    </div>
  )
}
