import Head from 'next/head';
import { useRouter } from 'next/router';

// Cute SEO Head component 💖
export const SEOHead = ({
  title = 'Kyuna — engineer, OSS, AI comics',
  description = 'Engineer, OSS, AI comic pipelines, YouTube @amarihana — kyuna-web.vercel.app',
  keywords = 'full-stack engineer, open source, react, next.js, game development, AI comics, portfolio',
  image = '/images/og-image.jpg',
  url,
  type = 'website',
  author = 'Kyuna',
  locale = 'en_US',
  siteName = 'Kyuna Portfolio',
  twitterHandle = '@kyuna0312',
  ...props
}) => {
  const router = useRouter();
  const canonicalUrl = url || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kyuna-web.vercel.app'}${router.asPath}`;
  const imageUrl = image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kyuna-web.vercel.app'}${image}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />

      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#ec4899" />
      <meta name="msapplication-TileColor" content="#ec4899" />

      {/* Structured Data for Portfolio ✨ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kyuna",
            "url": canonicalUrl,
            "image": imageUrl,
            "jobTitle": "Software Engineer",
            "worksFor": {
              "@type": "Organization",
              "name": "Amari Hana Inc."
            },
            "sameAs": [
              "https://github.com/kyuna0312",
              "https://kyuna-web.vercel.app",
              "https://amane312.vercel.app",
              "https://www.youtube.com/@amarihana",
              "https://x.com/kyuna0312",
              "https://www.instagram.com/kyuna0312/",
              "https://discord.gg/shiba"
            ],
            "knowsAbout": [
              "Web Development",
              "Open Source Software",
              "React.js",
              "Next.js",
              "Game Development",
              "Generative AI",
              "Full Stack Development"
            ]
          })
        }}
      />

      {/* Additional props */}
      {props.children}
    </Head>
  );
};

// Critical CSS optimization - Cute loading styles 💖
export const CriticalCSS = () => {
  return (
    <Head>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Critical CSS for above-the-fold content */
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a202c;
            background-color: #ffffff;
          }

          .chakra-ui-light {
            color-scheme: light;
          }

          .chakra-ui-dark {
            color-scheme: dark;
            background-color: #1a202c;
            color: #ffffff;
          }

          /* Prevent layout shift for navigation */
          nav {
            height: 80px;
          }

          /* Cute loading states 💖 */
          .loading-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }

          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          /* Reduce motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `
      }} />
    </Head>
  );
};
