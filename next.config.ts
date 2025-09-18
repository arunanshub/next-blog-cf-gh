import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import { withContentCollections } from "@content-collections/next"

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    webpackMemoryOptimizations: true,
    mdxRs: true,
  },
  typedRoutes: true,
  pageExtensions: ["ts", "tsx", "mdx", "md"],
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

export default withContentCollections(withMDX(nextConfig))

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
initOpenNextCloudflareForDev()
