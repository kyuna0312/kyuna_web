import NavBar from '../navbar';
import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Footer from '../footer';
import SEOHead from '../seo-head';
import { ScrollToTop } from '../scroll-to-top';
import { PageFrame } from '../frost';

const Main = ({ children, router }) => {
  const { t } = useTranslation('common');
  return (
    <>
      {/* Skip link for keyboard users */}
      <Box
        as="a"
        href="#main-content"
        position="absolute"
        top="-40px"
        left="6px"
        bg="ink"
        color="paper"
        p={2}
        borderRadius="2px"
        zIndex={2000}
        _focus={{ top: '6px' }}
      >
        {t('skipToContent')}
      </Box>
      <Box
        as="main"
        position="relative"
        minH="100vh"
        display="flex"
        flexDirection="column"
      >
        <SEOHead />
        <PageFrame />

        <NavBar path={router.asPath} id="navigation" />

        <Box
          id="main-content"
          tabIndex={-1}
          pb={{ base: 8, md: 12 }}
          role="main"
          aria-label="Main content"
          position="relative"
          zIndex={1}
          flex="1"
          display="flex"
          flexDirection="column"
        >
          {children}
        </Box>

        <Footer />

        <ScrollToTop />
      </Box>
    </>
  );
};

export default Main;
