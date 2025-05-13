import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Soner Yeşilay | Software Developer & Programmer',
  description: 'Yazılım geliştirici ve teknoloji tutkunu. Web, masaüstü, mobil uygulama ve sistem çözümleri. Modern teknolojilere hakim, öğrenmeye ve gelişmeye açık bir yazılım profesyoneli.',
  keywords: 'Yazılım Geliştirici, Bilgisayar Programcısı, Full Stack, Web Geliştirme, .NET, C#, JavaScript, React, Yazılım Çözümleri, Mobil Uygulama, Masaüstü Uygulama, IT Uzmanı, Veri Tabanı, Sistem Geliştirme, Türkiye, Soner Yeşilay',
  authors: [{ name: 'Soner Yeşilay' }],
  creator: 'Soner Yeşilay',
  publisher: 'Soner Yeşilay',
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://soneryesilay.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Soner Yeşilay | Software Developer & Programmer',
    description: 'Çok yönlü yazılım geliştirici. Web, masaüstü ve mobil uygulamalar için modern ve yenilikçi çözümler geliştiriyorum. Teknoloji tutkunu ve sürekli öğrenmeye açık bir yazılım profesyoneli.',
    url: 'https://soneryesilay.com',
    siteName: 'Soner Yeşilay Portfolio',
    images: [
      {
        url: '/placeholder-user.jpg',
        width: 800,
        height: 600,
        alt: 'Soner Yeşilay - Software Developer',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soner Yeşilay | Software Developer & Programmer',
    description: 'Modern teknolojilerle web, masaüstü ve mobil uygulamalar geliştiren yazılım profesyoneli. Yenilikçi çözümler ve sürdürülebilir kodlama yaklaşımı.',
    images: ['/placeholder-user.jpg'],
    creator: '@soneryesilay',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/favicon.ico',
    },
  },
  category: 'technology',
  verification: {
    google: '8l0VutM2IeH2L_lzs_dhvnCCGo5gw3hLxtc5umVbdmQ',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
