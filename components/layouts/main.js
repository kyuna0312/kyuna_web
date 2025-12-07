import NavBar from '../navbar';
import { Box } from '@chakra-ui/react';
import Footer from '../footer';
import KeyboardNavigation from '../keyboard-navigation';
import SEOHead from '../seo-head';
import { ScrollToTop } from '../scroll-to-top';

// Cute Main Layout Component 💖
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
        {/* Default SEO Head */}
        <SEOHead />

        {/* Sticky Navigation Bar */}
        <NavBar path={router.asPath} id="navigation" />

        {/* Main Content Area with cute spacing ✨ */}
        <Box
          id="main-content"
          tabIndex={-1}
          pt={{ base: '80px', md: '100px' }}
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

        {/* Footer at bottom */}
        <Footer />

        {/* Cute scroll to top button 💖 */}
        <ScrollToTop />
      </Box>
    </KeyboardNavigation>
  );
};

export default Main;
