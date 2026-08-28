import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { site, locales } from '../lib/site'

// The one SEO module. Every tag carries a key, so when a page-level mount
// renders after the layout's default mount, its tags override instead of
// stacking duplicates in the document head.
const SEOHead = ({
  title,
  description,
  image = '/images/icon.png',
  type = 'website',
  author = 'Amari Hana'
}) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const siteTitle = '霜花 (Shimoka)'
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const siteUrl = site.url
  const currentUrl = `${siteUrl}${router.asPath}`

  const pageDescription = description || t('seo.defaultDescription')
  const locale = locales.find(l => l.code === router.locale) || locales[0]

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta key="description" name="description" content={pageDescription} />
      <meta key="author" name="author" content={author} />
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta key="application-name" name="application-name" content="霜花 (Shimoka)" />
      <meta key="apple-title" name="apple-mobile-web-app-title" content="Shimoka" />
      <meta key="format-detection" name="format-detection" content="telephone=no" />

      {/* Open Graph */}
      <meta key="og:title" property="og:title" content={pageTitle} />
      <meta key="og:description" property="og:description" content={pageDescription} />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:url" property="og:url" content={currentUrl} />
      <meta key="og:image" property="og:image" content={`${siteUrl}${image}`} />
      <meta key="og:site_name" property="og:site_name" content={siteTitle} />
      <meta key="og:locale" property="og:locale" content={locale.ogLocale} />

      {/* Twitter */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={pageTitle} />
      <meta key="twitter:description" name="twitter:description" content={pageDescription} />
      <meta key="twitter:image" name="twitter:image" content={`${siteUrl}${image}`} />
      <meta key="twitter:creator" name="twitter:creator" content={`@${site.handle}`} />

      {/* Language alternates */}
      {locales.map(l => (
        <link
          key={`alt-${l.code}`}
          rel="alternate"
          hrefLang={l.hreflang}
          href={`${siteUrl}/${l.code}${router.asPath}`}
        />
      ))}
      <link
        key="alt-x-default"
        rel="alternate"
        hrefLang="x-default"
        href={`${siteUrl}/${locales[0].code}${router.asPath}`}
      />

      {/* Canonical URL */}
      <link key="canonical" rel="canonical" href={currentUrl} />

      {/* PWA Links */}
      <link key="manifest" rel="manifest" href="/manifest.json" />
      <link key="favicon" rel="icon" href="/favicon.ico" />
      <link key="apple-icon" rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link key="icon-32" rel="icon" type="image/png" sizes="32x32" href="/images/icon.png" />
      <link key="icon-16" rel="icon" type="image/png" sizes="16x16" href="/images/icon.png" />

      {/* Preconnect to external domains */}
      <link key="preconnect-fonts" rel="preconnect" href="https://fonts.googleapis.com" />
      <link key="preconnect-gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

      {/* Theme color */}
      <meta key="theme-color" name="theme-color" content="#17131C" />

      {/* Performance hints */}
      <link key="dns-fonts" rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link key="dns-gstatic" rel="dns-prefetch" href="//fonts.gstatic.com" />

      {/* Structured data */}
      <script
        key="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Shimoka (霜花)",
            "url": siteUrl,
            "sameAs": [site.github, site.twitter, site.instagram],
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
