import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export type BlogPost = {
  slug: string
  title: string
  description?: string
  date?: string
  tags?: string[]
  draft?: boolean
}

const projectRoot = process.cwd()

// We look for MDX pages inside blog route segments, assuming file pattern: .../blog/**/page.mdx
const BLOG_GLOB_DIR = path.join(projectRoot, "src", "app", "(app)", "blog")

function findAllMdxPageFiles(dir: string): string[] {
  const results: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findAllMdxPageFiles(fullPath))
    } else if (entry.isFile() && entry.name.toLowerCase() === "page.mdx") {
      results.push(fullPath)
    }
  }
  return results
}

function filePathToSlug(filePath: string): string {
  // Convert .../blog/segment-a/segment-b/page.mdx -> /blog/segment-a/segment-b
  const relative = path.relative(BLOG_GLOB_DIR, path.dirname(filePath))
  const segments = relative.split(path.sep).filter(Boolean)
  return "/blog/" + segments.join("/")
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_GLOB_DIR)) return []
  const files = findAllMdxPageFiles(BLOG_GLOB_DIR)
  const posts: BlogPost[] = files.map((file) => {
    const source = fs.readFileSync(file, "utf8")
    const { data } = matter(source)
    const slug = filePathToSlug(file)
    return {
      slug,
      title:
        typeof data.title === "string"
          ? data.title
          : path.basename(path.dirname(file)),
      description:
        typeof data.description === "string" ? data.description : undefined,
      date: typeof data.date === "string" ? data.date : undefined,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
      draft: typeof data.draft === "boolean" ? data.draft : undefined,
    }
  })

  return posts
}

export function getRecentPosts(limit = 10): BlogPost[] {
  const posts = getAllPosts()
  const filtered = posts.filter((p) => !p.draft)
  filtered.sort((a, b) => {
    const ad = a.date ? Date.parse(a.date) : 0
    const bd = b.date ? Date.parse(b.date) : 0
    return bd - ad
  })
  return filtered.slice(0, limit)
}
