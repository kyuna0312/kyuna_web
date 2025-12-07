import NextLink from 'next/link';
import {
  Box,
  Container,
  Button,
  Text,
  Heading,
  VStack,
  HStack,
  keyframes
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Layout from '../components/layouts/article';
import { motion } from 'framer-motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MotionBox = motion(Box);

// Cute animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(-5deg); }
  50% { transform: translateY(-15px) rotate(0deg); }
  75% { transform: translateY(-10px) rotate(5deg); }
`;

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
`;

const NotFound = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout title="404 - Page Not Found">
      <Container maxW="container.lg" py={20}>
        <Box
          minH="60vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          {/* Floating decorations */}
          {mounted && (
            <>
              <Box
                position="absolute"
                top="10%"
                left="10%"
                fontSize="3xl"
                animation={`${floatAnimation} 4s ease-in-out infinite`}
                opacity={0.4}
              >
                ✨
              </Box>
              <Box
                position="absolute"
                top="20%"
                right="15%"
                fontSize="2xl"
                animation={`${sparkleAnimation} 3s ease-in-out 0.5s infinite`}
                opacity={0.5}
              >
                🌸
              </Box>
              <Box
                position="absolute"
                bottom="25%"
                left="15%"
                fontSize="2xl"
                animation={`${floatAnimation} 3.5s ease-in-out 1s infinite`}
                opacity={0.4}
              >
                💫
              </Box>
              <Box
                position="absolute"
                bottom="20%"
                right="10%"
                fontSize="xl"
                animation={`${sparkleAnimation} 2.5s ease-in-out 0.3s infinite`}
                opacity={0.5}
              >
                ⭐
              </Box>
              <Box
                position="absolute"
                top="40%"
                left="5%"
                fontSize="lg"
                animation={`${wiggle} 2s ease-in-out infinite`}
                opacity={0.3}
              >
                🎀
              </Box>
              <Box
                position="absolute"
                top="50%"
                right="5%"
                fontSize="lg"
                animation={`${wiggle} 2s ease-in-out 0.5s infinite`}
                opacity={0.3}
              >
                💖
              </Box>
            </>
          )}

          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <Box
              bg="rgba(26, 32, 44, 0.6)"
              backdropFilter="blur(20px)"
              borderRadius="40px"
              p={{ base: 8, md: 16 }}
              border="2px solid"
              borderColor="rgba(236, 72, 153, 0.3)"
              position="relative"
              overflow="hidden"
              maxW="600px"
              mx="auto"
            >
              {/* Cute gradient top border */}
              <Box
                position="absolute"
                top={0}
                left="10%"
                right="10%"
                h="4px"
                bgGradient="linear(to-r, transparent, pink.400, purple.400, pink.400, transparent)"
                borderTopRadius="40px"
              />

              {/* Corner sparkles */}
              {mounted && (
                <>
                  <Box position="absolute" top={4} left={4} fontSize="md" opacity={0.4}>✦</Box>
                  <Box position="absolute" top={4} right={4} fontSize="md" opacity={0.4}>✦</Box>
                  <Box position="absolute" bottom={4} left={4} fontSize="md" opacity={0.4}>✦</Box>
                  <Box position="absolute" bottom={4} right={4} fontSize="md" opacity={0.4}>✦</Box>
                </>
              )}

              <VStack spacing={6}>
                {/* Cute sad emoji */}
                <Box
                  fontSize="6xl"
                  animation={`${bounceAnimation} 2s ease-in-out infinite`}
                >
                  😿
                </Box>

                {/* 404 Number */}
                <Heading
                  fontSize={{ base: "6xl", md: "8xl" }}
                  fontFamily="'Playfair Display', serif"
                  fontWeight="bold"
                >
                  <Box
                    as="span"
                    bgGradient="linear(135deg, #ff6b8a 0%, #a855f7 50%, #ff6b8a 100%)"
                    bgSize="200% 200%"
                    bgClip="text"
                    animation={`${gradientShift} 4s ease infinite`}
                  >
                    404
                  </Box>
                </Heading>

                {/* Cute Badge */}
                <Box
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  px={4}
                  py={2}
                  bg="rgba(236, 72, 153, 0.1)"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="pink.400"
                >
                  <Text fontSize="sm" color="pink.300">🔍 Page Not Found 🔍</Text>
                </Box>

                {/* Message */}
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.400"
                  maxW="400px"
                  lineHeight="tall"
                >
                  Oops! It seems this page wandered off somewhere~
                  Don&apos;t worry, let&apos;s get you back home! 💖
                </Text>

                {/* Cute divider */}
                <HStack spacing={3}>
                  <Box h="1px" w="30px" bgGradient="linear(to-r, transparent, pink.400)" />
                  <Text color="pink.400">♡</Text>
                  <Box h="1px" w="30px" bgGradient="linear(to-r, pink.400, purple.400)" />
                  <Text color="purple.400">♡</Text>
                  <Box h="1px" w="30px" bgGradient="linear(to-r, purple.400, transparent)" />
                </HStack>

                {/* Home Button */}
                <Button
                  as={NextLink}
                  href="/"
                  size="lg"
                  bgGradient="linear(135deg, #ff6b8a, #a855f7)"
                  color="white"
                  borderRadius="full"
                  px={10}
                  py={6}
                  fontWeight="bold"
                  _hover={{
                    bgGradient: "linear(135deg, #ff4d6d, #9333ea)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 35px rgba(236, 72, 153, 0.4)"
                  }}
                  transition="all 0.3s ease"
                >
                  🏠 Take Me Home ✨
                </Button>

                {/* Extra cute message */}
                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                  Lost? That&apos;s okay, even the best explorers get lost sometimes~ 🌸
                </Text>
              </VStack>
            </Box>
          </MotionBox>
        </Box>
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
}

export default NotFound;
