import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

// Thin ice-line at the top of the page during route changes.
// Self-contained: owns the router-event wiring, so callers just render it.
export const RouteLoadingBar = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = () => setIsLoading(true);
    const done = () => setIsLoading(false);

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
    };
  }, [router]);

  return (
    <AnimatePresence>
      {isLoading && (
        <MotionBox
          key="loading-bar"
          position="fixed"
          top={0}
          left={0}
          right={0}
          h="2px"
          bg="ice"
          zIndex={9999}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 1, transformOrigin: 'right', opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      )}
    </AnimatePresence>
  );
};
