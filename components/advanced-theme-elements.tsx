import React from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const crystalline = { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const };

// Interactive section headers with ice/gold gradient
export const SectionHeader = ({
  children,
  subtitle,
  delay = 0,
  gradient = 'linear(to-r, #4db8d4, #c4a55a)',
  ...props
}) => {
  const ref = React.useRef(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ ...crystalline, delay }}
      textAlign="center"
      mb={12}
      {...props}
    >
      <MotionBox
        as="h2"
        fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
        fontFamily="heading"
        fontWeight="700"
        letterSpacing="0.04em"
        bgGradient={gradient}
        bgClip="text"
        mb={4}
        initial={{ scale: 0.95 }}
        animate={isInView ? { scale: 1 } : { scale: 0.95 }}
        transition={{ ...crystalline, delay: delay + 0.15 }}
      >
        {children}
      </MotionBox>

      {subtitle && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ ...crystalline, delay: delay + 0.3 }}
          fontSize="sm"
          color="#4a6580"
          letterSpacing="0.06em"
          textTransform="uppercase"
          maxW="500px"
          mx="auto"
        >
          {subtitle}
        </MotionBox>
      )}

      {/* Thin decorative rule */}
      <MotionBox
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ ...crystalline, delay: delay + 0.4 }}
        h="1px"
        maxW="80px"
        mx="auto"
        mt={5}
        bg="linear-gradient(to right, #4db8d4, #c4a55a)"
        style={{ transformOrigin: 'center' }}
      />
    </MotionBox>
  );
};

// Glassmorphism card — dark navy variant
export const GlassCard = ({
  children,
  blur = '16px',
  borderColor = '#1e2d42',
  ...props
}) => (
  <Box
    bg="rgba(13, 21, 37, 0.7)"
    backdropFilter={`blur(${blur})`}
    border="1px solid"
    borderColor={borderColor}
    boxShadow="0 20px 40px rgba(0, 0, 0, 0.3)"
    {...props}
  >
    {children}
  </Box>
);
