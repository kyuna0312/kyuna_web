import { Box, IconButton, keyframes } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowUp } from 'react-icons/io5';

const MotionBox = motion(Box);

// Cute bounce animation 💖
const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

// Scroll to Top Button Component ✨
export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          position="fixed"
          bottom={{ base: 4, md: 8 }}
          right={{ base: 4, md: 8 }}
          zIndex={9998}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <IconButton
            icon={<IoArrowUp />}
            onClick={scrollToTop}
            size="lg"
            borderRadius="full"
            bgGradient="linear(135deg, #ff6b8a, #a855f7)"
            color="white"
            boxShadow="0 10px 30px rgba(236, 72, 153, 0.3)"
            animation={`${bounceAnimation} 2s ease-in-out infinite`}
            _hover={{
              bgGradient: "linear(135deg, #ff4d6d, #9333ea)",
              transform: "scale(1.1)",
              boxShadow: "0 15px 40px rgba(236, 72, 153, 0.5)",
            }}
            _active={{
              transform: "scale(0.95)",
            }}
            transition="all 0.3s ease"
            aria-label="Scroll to top"
          />
        </MotionBox>
      )}
    </AnimatePresence>
  );
};
