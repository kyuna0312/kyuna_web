import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config';
import Chakra from '../components/chakra';
import Fonts from '../components/fonts';
import ErrorBoundary from '../components/error-boundary';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layouts/main';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

function Website({ Component, pageProps, router }) {
  useEffect(() => {
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {
          // Silent fail in production
        });
    }
  }, []);

  return (
    <ErrorBoundary>
      <Chakra cookies={pageProps.cookies}>
        <Fonts />
        <Layout router={router}>
          <AnimatePresence
            mode="wait"
            initial={true}
            onExitComplete={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0 });
              }
            }}
          >
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
          <Analytics />
        </Layout>
      </Chakra>
    </ErrorBoundary>
  );
}

export default appWithTranslation(Website, nextI18NextConfig);
