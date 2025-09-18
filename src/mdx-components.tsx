import type { MDXComponents } from "mdx/types"

const components = {
  code: ({ children, ...props }) => {
    return (
      <code {...props} className="font-mono!">
        {children}
      </code>
    )
  },
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
