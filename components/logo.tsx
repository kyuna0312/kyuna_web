import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Text, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const Logo = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/" passHref legacyBehavior>
      <Box
        as="a"
        display="inline-flex"
        alignItems="center"
        cursor="pointer"
        position="relative"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <HStack spacing={2} align="center">
          {/* Cute sparkle decoration */}
          {mounted && (
            <MotionBox
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Text fontSize="lg" role="img" aria-label="sparkle">
                ✨
              </Text>
            </MotionBox>
          )}
          {!mounted && (
            <Text fontSize="lg" role="img" aria-label="sparkle">
              ✨
            </Text>
          )}

          <MotionText
            fontFamily="'Playfair Display', serif"
            fontWeight="bold"
            fontSize="xl"
            bgGradient="linear(to-r, pink.400, purple.400, pink.500)"
            bgClip="text"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            霜花
          </MotionText>

          {/* Cute heart decoration */}
          {mounted && (
            <MotionBox
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Text fontSize="sm" color="pink.400" role="img" aria-label="heart">
                ♡
              </Text>
            </MotionBox>
          )}
          {!mounted && (
            <Text fontSize="sm" color="pink.400" role="img" aria-label="heart">
              ♡
            </Text>
          )}
        </HStack>
      </Box>
    </Link>
  );
};

export default Logo;
