import Head from 'next/head'
import { useRouter } from 'next/router'

const SEOHead = ({
  title,
  description,
  image = '/images/icon.png',
  type = 'website',
  author = 'Amari Hana'
}) => {
  const router = useRouter()

  const siteTitle = '霜花 (Shimoka)'
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const siteUrl = 'https://kyuna-web.vercel.app' // Update with your actual domain
  const currentUrl = `${siteUrl}${router.asPath}`

  const defaultDescription = {
    en: 'Systems and developer-tooling engineer in Ulaanbaatar — developer environments, editors, and low-level experiments in Rust, C/C++, Lua, and TypeScript.',
    jp: 'ウランバートルを拠点とするシステム＆ツーリングエンジニア。開発環境、エディタ、低レイヤの実験をRust、C/C++、Lua、TypeScriptで作っています。',
    mn: 'Улаанбаатарт төвтэй системс ба хэрэгслийн инженер. Хөгжүүлэлтийн орчин, эдитор, доод түвшний туршилтуудыг Rust, C/C++, Lua, TypeScript дээр бүтээдэг.'
  }

  const pageDescription = description || defaultDescription[router.locale] || defaultDescription.en

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta name="application-name" content="霜花 (Shimoka)" />
      <meta name="apple-mobile-web-app-title" content="Shimoka" />
      <meta name="format-detection" content="telephone=no" />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content={router.locale === 'jp' ? 'ja_JP' : router.locale === 'mn' ? 'mn_MN' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      <meta name="twitter:creator" content="@kyuna0312" />

      {/* Language alternates */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${router.asPath}`} />
      <link rel="alternate" hrefLang="ja" href={`${siteUrl}/jp${router.asPath}`} />
      <link rel="alternate" hrefLang="mn" href={`${siteUrl}/mn${router.asPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en${router.asPath}`} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* PWA Links */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/icon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/icon.png" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

      {/* Theme color */}
      <meta name="theme-color" content="#17131C" />

      {/* Performance hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Shimoka (霜花)",
            "url": siteUrl,
            "sameAs": [
              "https://github.com/kyuna0312",
              "https://twitter.com/kyuna0312",
              "https://instagram.com/kyuna0312"
            ],
            "jobTitle": "Systems & Developer Tooling Engineer",
            "worksFor": {
              "@type": "Organization",
              "name": "Next Social Platform LLC"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ulaanbaatar",
              "addressCountry": "Mongolia"
            },
            "knowsAbout": [
              "Rust",
              "C",
              "C++",
              "Lua",
              "Linux",
              "Neovim",
              "Developer Tooling",
              "TypeScript",
              "React",
              "Next.js",
              "Flutter"
            ]
          })
        }}
      />
    </Head>
  )
}

export default SEOHead
