import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'

export const metadata: Metadata = {
  title: 'Soner Yeşilay Portfolio',
  description: 'Back-End Developer Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
