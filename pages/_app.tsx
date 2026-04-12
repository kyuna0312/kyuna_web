import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import nextI18NextConfig from '../next-i18next.config';
import Chakra from '../components/chakra';
import ErrorBoundary from '../components/error-boundary';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layouts/main';
import { LoadingBar } from '../components/page-loading';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fontVariableClassName } from '../lib/fonts';

const Analytics = dynamic(
  () => import('@vercel/analytics/react').then((m) => m.Analytics),
  { ssr: false }
);

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

function Website({ Component, pageProps, router }: AppProps) {
  const nextRouter = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
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
      <div className={fontVariableClassName}>
        <Chakra cookies={pageProps.cookies}>
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
      </div>
    </ErrorBoundary>
  );
}

export default appWithTranslation(Website, nextI18NextConfig);
