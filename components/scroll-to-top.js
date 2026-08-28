import { Box, IconButton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowUp } from 'react-icons/io5';

const MotionBox = motion(Box);

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          position="fixed"
          bottom={{ base: 4, md: 8 }}
          right={{ base: 4, md: 8 }}
          zIndex={9998}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
        >
          <IconButton
            icon={<IoArrowUp />}
            onClick={scrollToTop}
            size="md"
            borderRadius="2px"
            bg="pane"
            color="frost"
            border="1px solid"
            borderColor="hairline"
            _hover={{ borderColor: 'ice', color: 'ice' }}
            aria-label="Scroll to top"
          />
        </MotionBox>
      )}
    </AnimatePresence>
  );
};
