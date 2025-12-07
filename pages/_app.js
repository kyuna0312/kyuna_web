import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config';
import Chakra from '../components/chakra';
import Fonts from '../components/fonts';
import ErrorBoundary from '../components/error-boundary';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layouts/main';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';
import ClientOnly from '../components/client-only';

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
<<<<<<< Current (Your changes)
          // Silently fail in production - errors are handled by error boundary
=======
          // Silent fail in production
>>>>>>> Incoming (Background Agent changes)
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
            {/* Wrap the component to prevent hydration issues */}
            <div suppressHydrationWarning>
              <ClientOnly>
                <Component {...pageProps} key={router.route} />
              </ClientOnly>
            </div>
          </AnimatePresence>
          <Analytics />
        </Layout>
      </Chakra>
    </ErrorBoundary>
  );
}

export default appWithTranslation(Website, nextI18NextConfig);
