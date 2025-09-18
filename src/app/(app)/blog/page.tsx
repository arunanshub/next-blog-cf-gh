import { allPosts } from "content-collections"
import { Route } from "next"
import Link from "next/link"

export default function Posts() {
  return (
    <div>
      all contents:
      <ul>
        {allPosts.map((post) => (
          <li key={post._meta.path}>
            <Link href={`/blog/${post._meta.directory}` as Route}>
              <h3>{post.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
