import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../lib/theme';
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

function Website({ Component, pageProps, router }) {
  const nextRouter = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Unregister the old service worker so returning visitors don't get the
    // pre-redesign site from its cache.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(registrations => registrations.forEach(r => r.unregister()))
        .catch(() => {});
    }
  }, []);

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
      <ChakraProvider theme={theme}>
        <Fonts />
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
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(Website, nextI18NextConfig);
