import MarkdownLayout from "@/components/markdown/markdown-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MarkdownLayout className="max-w-4xl mx-auto p-8 lg:px-0">
      {children}
    </MarkdownLayout>
  )
}
