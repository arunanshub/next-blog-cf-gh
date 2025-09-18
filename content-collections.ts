import { defineCollection, defineConfig } from "@content-collections/core"
import { z } from "zod"

const posts = defineCollection({
  name: "posts",
  directory: "src/app/(app)/blog",
  include: ["**/*.md", "**/*.mdx"],
  schema: z.object({
    title: z.string(),
  }),
})

export default defineConfig({
  collections: [posts],
})
