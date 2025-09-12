import { ThemeProvider } from "next-themes"
import TanstackQueryProvider from "./tanstack-query-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ThemeProvider>
  )
}
