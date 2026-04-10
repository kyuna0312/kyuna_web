import React from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// Interactive Section Headers - with static colors to avoid hydration issues
export const SectionHeader = ({
  children,
  subtitle,
  delay = 0,
  gradient = "linear(to-r, pink.400, rose.400)",
  ...props
}) => {
  const ref = React.useRef(null);
  const [isInView, setIsInView] = React.useState(false);

  // Static color for subtitle to prevent hydration mismatch
  const subtitleColor = "gray.400";

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
      textAlign="center"
      mb={12}
      {...props}
    >
      <MotionBox
        as="h2"
        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
        fontFamily="'Playfair Display', serif"
        fontWeight="bold"
        bgGradient={gradient}
        bgClip="text"
        mb={4}
        initial={{ scale: 0.9 }}
        animate={isInView ? { scale: 1 } : { scale: 0.9 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        {children}
      </MotionBox>

      {subtitle && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
          fontSize="lg"
          color={subtitleColor}
          maxW="600px"
          mx="auto"
        >
          {subtitle}
        </MotionBox>
      )}
    </MotionBox>
  );
};

// Glass Card Effect - Cute glassmorphism card component 💖
export const GlassCard = ({
  children,
  blur = "20px",
  opacity = 0.1,
  borderColor = "rgba(255, 255, 255, 0.2)",
  ...props
}) => {
  // Static dark mode glass effect
  const glassBg = `rgba(255, 255, 255, ${opacity * 0.1})`;

  return (
    <Box
      bg={glassBg}
      backdropFilter={`blur(${blur})`}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="20px"
      boxShadow="0 25px 45px -10px rgba(0, 0, 0, 0.1)"
      {...props}
    >
      {children}
    </Box>
  );
};
