import NavBar from '../navbar';
import { Box } from '@chakra-ui/react';
import Footer from '../footer';
import KeyboardNavigation from '../keyboard-navigation';
import SEOHead from '../seo-head';
import { ScrollToTop } from '../scroll-to-top';
import { PageFrame } from '../frost';

const Main = ({ children, router }) => {
  return (
    <KeyboardNavigation>
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
    </KeyboardNavigation>
  );
};

export default Main;
