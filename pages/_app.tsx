import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config';
import Chakra from '../components/chakra';
import Fonts from '../components/fonts';
import ErrorBoundary from '../components/error-boundary';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layouts/main';
import { Analytics } from '@vercel/analytics/react';
import { LoadingBar } from '../components/page-loading';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

// Cute Website Component with loading states 💖
function Website({ Component, pageProps, router }) {
  const nextRouter = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  // Handle page loading states ✨
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    nextRouter.events.on('routeChangeStart', handleStart);
    nextRouter.events.on('routeChangeComplete', handleComplete);
    nextRouter.events.on('routeChangeError', handleComplete);

    return () => {
      nextRouter.events.off('routeChangeStart', handleStart);
      nextRouter.events.off('routeChangeComplete', handleComplete);
      nextRouter.events.off('routeChangeError', handleComplete);
    };
  }, [nextRouter]);

  return (
    <ErrorBoundary>
      <Chakra cookies={pageProps.cookies}>
        <Fonts />
        {/* Cute loading bar on route change 💖 */}
        <AnimatePresence>
          {isLoading && <LoadingBar key="loading-bar" />}
        </AnimatePresence>
        <Layout router={router}>
          <AnimatePresence
            mode="wait"
            initial={true}
            onExitComplete={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
