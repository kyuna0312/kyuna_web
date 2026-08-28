import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../lib/theme';
import ErrorBoundary from '../components/error-boundary';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layouts/main';
import { Analytics } from '@vercel/analytics/react';
import { RouteLoadingBar } from '../components/route-loading-bar';
import { useEffect } from 'react';

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

function Website({ Component, pageProps, router }) {
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

  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        `}</style>
        <RouteLoadingBar />
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
