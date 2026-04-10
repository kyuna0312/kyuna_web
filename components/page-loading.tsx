import { Box, Spinner, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// Cute floating animation 💖
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Sparkle animation ✨
const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
`;

// Cute Page Loading Component 💖
export const PageLoading = () => {
  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(0, 0, 0, 0.3)"
      backdropFilter="blur(10px)"
      zIndex={9999}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box position="relative">
        {/* Cute sparkles around spinner ✨ */}
        <Box
          position="absolute"
          top="-20px"
          left="-20px"
          fontSize="xl"
          animation={`${sparkleAnimation} 1.5s ease-in-out infinite`}
        >
          ✨
        </Box>
        <Box
          position="absolute"
          top="-20px"
          right="-20px"
          fontSize="xl"
          animation={`${sparkleAnimation} 1.5s ease-in-out 0.5s infinite`}
        >
          💖
        </Box>
        <Box
          position="absolute"
          bottom="-20px"
          left="-20px"
          fontSize="xl"
          animation={`${sparkleAnimation} 1.5s ease-in-out 1s infinite`}
        >
          🌸
        </Box>
        <Box
          position="absolute"
          bottom="-20px"
          right="-20px"
          fontSize="xl"
          animation={`${sparkleAnimation} 1.5s ease-in-out 0.7s infinite`}
        >
          ⭐
        </Box>

        {/* Loading spinner */}
        <Box
          animation={`${floatAnimation} 2s ease-in-out infinite`}
        >
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.8s"
            color="pink.400"
            emptyColor="gray.200"
          />
        </Box>
      </Box>
    </MotionBox>
  );
};

// Minimal loading bar for top of page
export const LoadingBar = () => {
  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      h="3px"
      bgGradient="linear(to-r, pink.400, purple.400, pink.400)"
      zIndex={9999}
      initial={{ scaleX: 0, transformOrigin: 'left' }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 1, transformOrigin: 'right', opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    />
  );
};
