import { Metadata } from "next";

// Ana sayfa için özel metadata
export const metadata: Metadata = {
  title: 'Soner Yeşilay | Yazılım Geliştirici | Web, Mobil ve Masaüstü Çözümleri',
  description: 'Tam kapsamlı yazılım geliştirme hizmetleri. Modern teknolojiler ile web, mobil ve masaüstü uygulamaları, veritabanı çözümleri ve sistem entegrasyonları. Yaratıcı, çözüm odaklı ve teknoloji tutkunu bir yazılım profesyoneliyim.',
  keywords: 'Yazılım Geliştirici, Programlama, Web Geliştirme, Mobil Uygulama, Masaüstü Yazılım, IT, Sistem Çözümleri, Full Stack Developer, Backend Developer, .NET Core, JavaScript, React, C#, Veri Tabanı, Analitik, E-Ticaret, REST API',
  openGraph: {
    title: 'Soner Yeşilay | Yazılım Geliştirici',
    description: 'Modern teknolojilerle web, mobil ve masaüstü uygulamalar. Yazılım dünyasında yenilikçi ve sürdürülebilir çözümler. Teknoloji tutkunu bir yazılım profesyoneli.',
    url: 'https://soneryesilay.com',
    siteName: 'Soner Yeşilay Portfolio',
    images: [
      {
        url: '/placeholder-user.jpg',
        width: 800,
        height: 600,
        alt: 'Soner Yeşilay - Yazılım Geliştirici',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soner Yeşilay | Yazılım Geliştirici & Teknoloji Uzmanı',
    description: 'Web, masaüstü ve mobil platformlar için yaratıcı çözümler. Güncel teknolojileri kullanarak karmaşık problemleri çözüyorum.',
    images: ['/placeholder-user.jpg'],
    creator: '@soneryesilay',
  },
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': 'https://soneryesilay.com',
    },
  },
  authors: [{ name: 'Soner Yeşilay', url: 'https://github.com/soneryesilay' }],
};