import { Container, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// Cute Responsive Container with adaptive behavior 💖
export const ResponsiveContainer = ({
  children,
  maxWidth,
  padding,
  paddingTop,
  paddingBottom,
  margin,
  ...props
}) => {
  // Use Container with proper defaults for better spacing
  const containerMaxW = maxWidth || {
    base: '100%',
    sm: 'container.sm',
    md: 'container.md',
    lg: 'container.lg',
    xl: 'container.xl',
    '2xl': '1536px'
  };

  const containerPadding = padding || {
    base: 6,
    sm: 8,
    md: 10,
    lg: 12,
    xl: 16
  };

  return (
    <MotionBox
      as={Container}
      maxW={containerMaxW}
      px={containerPadding}
      pt={paddingTop}
      pb={paddingBottom}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};
