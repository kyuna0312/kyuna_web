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

  const siteTitle = 'Amari Hana - Portfolio'
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const siteUrl = 'https://kyuna-web.vercel.app' // Update with your actual domain
  const currentUrl = `${siteUrl}${router.asPath}`

  const defaultDescription = {
    en: 'Full-stack developer based in Ulaanbaatar with passion for solving problems through product planning, design, and coding.',
    jp: 'ウランバートルを拠点とするフルスタック開発者。プロダクトの企画、デザイン、コーディングを通じた問題解決に情熱を持っています。',
    mn: 'Улаанбаатарт төвтэй фулл стак хөгжүүлэгч. Бүтээгдэхүүний төлөвлөлт, дизайн, кодчилолоор дамжуулан асуудал шийдвэрлэхэд хүсэл тэмүүлэлтэй.'
  }

  const pageDescription = description || defaultDescription[router.locale] || defaultDescription.en

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* PWA Meta Tags */}
      <meta name="application-name" content="Hattanzorg Portfolio" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Hattanzorg" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#9f7aea" />
      <meta name="msapplication-tap-highlight" content="no" />

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
      <meta name="twitter:creator" content="@m1or3n" />

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
      <link rel="mask-icon" href="/images/icon.png" color="#9f7aea" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

      {/* Theme color */}
      <meta name="theme-color" content="#9f7aea" />

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
            "name": "Hattanzorg",
            "url": siteUrl,
            "sameAs": [
              "https://github.com/kyuna312",
              "https://twitter.com/m1or3n",
              "https://instagram.com/m1or3n"
            ],
            "jobTitle": "Full-stack Developer",
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
              "JavaScript",
              "React",
              "Next.js",
              "Node.js",
              "MongoDB",
              "PostgreSQL",
              "TypeScript",
              "Python",
              "Flutter",
              "Mobile Development",
              "Web Development",
              "Full Stack Development"
            ]
          })
        }}
      />
    </Head>
  )
}

export default SEOHead
