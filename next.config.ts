import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import { withContentCollections } from "@content-collections/next"

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  typedRoutes: true,
  pageExtensions: ["ts", "tsx", "mdx", "md"],
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-frontmatter", ["remark-mdx-frontmatter"]],
    rehypePlugins: [["rehype-expressive-code"]],
  },
})

export default withContentCollections(withMDX(nextConfig))

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
initOpenNextCloudflareForDev()
