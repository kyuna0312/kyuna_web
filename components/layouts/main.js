import NavBar from '../navbar';
import { Box } from '@chakra-ui/react';
import Footer from '../footer';
import KeyboardNavigation from '../keyboard-navigation';
import SEOHead from '../seo-head';

const Main = ({ children, router }) => {
  return (
    <KeyboardNavigation>
      <Box as="main" pb={8} position="relative">
        <SEOHead />

        <NavBar path={router.asPath} id="navigation" />

        <Box
          id="main-content"
          tabIndex={-1}
          pt={{ base: '80px', md: '100px' }}
          role="main"
          aria-label="Main content"
          position="relative"
          zIndex={1}
        >
          {children}
        </Box>

        <Footer />
      </Box>
    </KeyboardNavigation>
  );
};

export default Main;
