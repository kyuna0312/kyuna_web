import { motion } from 'framer-motion';
import SEOHead from '../seo-head';
import { Box } from '@chakra-ui/react';

const variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Per-page wrapper: route transition + page-level SEO overrides.
const Layout = ({ children, title, description, image }) => (
  <motion.article
    initial="hidden"
    animate="enter"
    exit="exit"
    variants={variants}
    style={{ position: 'relative', width: '100%' }}
  >
    {(title || description || image) && (
      <SEOHead title={title} description={description} image={image} />
    )}
    <Box w="100%" minH={{ base: '50vh', md: '60vh' }} position="relative">
      {children}
    </Box>
  </motion.article>
);

export default Layout;
