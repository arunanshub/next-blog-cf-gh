import Link from "next/link"
import { getRecentPosts } from "@/lib/posts"

export const dynamic = "force-static"

export default async function Blog() {
  const posts = getRecentPosts(10)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Recent posts</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug} className="flex flex-col gap-1">
            <Link href={post.slug} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
            <div className="text-muted-foreground text-sm">
              {post.date ? new Date(post.date).toLocaleDateString() : null}
              {post.description ? ` — ${post.description}` : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
