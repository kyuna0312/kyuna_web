import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// Thin ice-line at the top of the page during route changes.
export const LoadingBar = () => {
  return (
    <MotionBox
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
  );
};
