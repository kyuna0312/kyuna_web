import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Link,
  SimpleGrid,
  Heading,
  keyframes
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { IoLogoGithub, IoLogoTwitter, IoLogoInstagram, IoLogoYoutube, IoMail, IoHeart } from 'react-icons/io5';
import { SiDiscord } from 'react-icons/si';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// Cute animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const heartbeat = keyframes`
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.2); }
  28% { transform: scale(1); }
  42% { transform: scale(1.2); }
  70% { transform: scale(1); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const Footer = () => {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const footerQuotes = {
    en: "✨ One step, two steps... The path to the 'future' is at your feet. ✨",
    jp: "✨ 一歩、二歩…「未来」への道は足元にある。✨",
    mn: "✨ Нэг алхам, хоёр алхам... 'Ирээдүй' рүү чиглэх зам хөл дор байна. ✨"
  };

  const socialLinks = [
    { icon: IoLogoGithub, href: 'https://github.com/kyuna0312', label: 'GitHub' },
    { icon: IoLogoYoutube, href: 'https://www.youtube.com/@amarihana', label: 'YouTube' },
    { icon: IoLogoTwitter, href: 'https://x.com/kyuna0312', label: 'X' },
    { icon: IoLogoInstagram, href: 'https://www.instagram.com/kyuna0312/', label: 'Instagram' },
    { icon: SiDiscord, href: 'https://discord.gg/shiba', label: 'Discord' },
    { icon: IoMail, href: '/contact', label: 'Contact' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/', emoji: '🏠' },
    { name: 'Projects', href: '/projects', emoji: '💻' },
    { name: 'Contact', href: '/contact', emoji: '💌' },
  ];

  return (
    <MotionBox
      as="footer"
      bg="rgba(26, 32, 44, 0.9)"
      borderTop="1px solid"
      borderColor="rgba(236, 72, 153, 0.2)"
      css={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      mt={20}
      pt={16}
      pb={8}
      position="relative"
      overflow="hidden"
    >
      {/* Background decorations */}
      {mounted && (
        <>
          <Box
            position="absolute"
            top="10%"
            left="5%"
            fontSize="xl"
            opacity={0.1}
            animation={`${floatAnimation} 4s ease-in-out infinite`}
          >
            ✨
          </Box>
          <Box
            position="absolute"
            top="20%"
            right="10%"
            fontSize="lg"
            opacity={0.1}
            animation={`${sparkle} 3s ease-in-out infinite`}
          >
            🌸
          </Box>
          <Box
            position="absolute"
            bottom="30%"
            left="8%"
            fontSize="md"
            opacity={0.1}
            animation={`${floatAnimation} 3.5s ease-in-out 1s infinite`}
          >
            💫
          </Box>
        </>
      )}

      {/* Gradient top border */}
      <Box
        position="absolute"
        top={0}
        left="10%"
        right="10%"
        h="3px"
        bgGradient="linear(to-r, transparent, pink.400, purple.400, pink.400, transparent)"
      />

      <Box maxW="container.xl" mx="auto" px={8}>
        {/* Main Footer Content */}
        <Box
          p={{ base: 8, md: 12 }}
          bg="rgba(255, 255, 255, 0.03)"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="rgba(236, 72, 153, 0.15)"
          borderRadius="32px"
          position="relative"
        >
          {/* Corner sparkles */}
          {mounted && (
            <>
              <Box position="absolute" top={4} left={4} fontSize="sm" opacity={0.3}>✦</Box>
              <Box position="absolute" top={4} right={4} fontSize="sm" opacity={0.3}>✦</Box>
              <Box position="absolute" bottom={4} left={4} fontSize="sm" opacity={0.3}>✦</Box>
              <Box position="absolute" bottom={4} right={4} fontSize="sm" opacity={0.3}>✦</Box>
            </>
          )}

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
            {/* Profile Section */}
            <VStack spacing={6} align={{ base: "center", md: "start" }}>
              <Box
                width="100px"
                height="100px"
                borderRadius="full"
                overflow="hidden"
                border="3px solid"
                borderColor="pink.400"
                boxShadow="0 0 30px rgba(236, 72, 153, 0.3)"
                position="relative"
              >
                <Box
                  as="img"
                  src="/images/maya.png"
                  alt="Profile picture"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
                {/* Cute badge */}
                <Box
                  position="absolute"
                  bottom={-1}
                  right={-1}
                  bg="pink.500"
                  borderRadius="full"
                  p={1}
                  fontSize="xs"
                >
                  ✨
                </Box>
              </Box>

              <VStack spacing={2} textAlign={{ base: "center", md: "left" }}>
                <Heading
                  size="md"
                  fontFamily="heading"
                  bgGradient="linear(to-r, pink.400, purple.400)"
                  bgClip="text"
                >
                  Kyuna / 霜花 ✨
                </Heading>
                <Text
                  fontSize="sm"
                  color="gray.400"
                >
                  Developer 💻 • Designer 🎨 • Cosplayer 🎭
                </Text>
              </VStack>
            </VStack>

            {/* Quick Links */}
            <VStack spacing={4} align={{ base: "center", md: "start" }}>
              <Box
                display="inline-flex"
                alignItems="center"
                gap={2}
                px={3}
                py={1}
                bg="rgba(167, 139, 250, 0.1)"
                borderRadius="full"
                border="1px solid"
                borderColor="purple.400"
              >
                <Text fontSize="xs" color="purple.300">Quick Links</Text>
              </Box>
              <VStack spacing={2} align={{ base: "center", md: "start" }}>
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    color="gray.300"
                    fontWeight="500"
                    px={3}
                    py={2}
                    borderRadius="lg"
                    transition="all 0.3s ease"
                    _hover={{
                      color: "pink.400",
                      textDecoration: "none",
                      bg: "rgba(236, 72, 153, 0.1)",
                      transform: "translateX(5px)"
                    }}
                  >
                    {link.emoji} {link.name}
                  </Link>
                ))}
              </VStack>
            </VStack>

            {/* Social Links */}
            <VStack spacing={4} align={{ base: "center", md: "start" }}>
              <Box
                display="inline-flex"
                alignItems="center"
                gap={2}
                px={3}
                py={1}
                bg="rgba(236, 72, 153, 0.1)"
                borderRadius="full"
                border="1px solid"
                borderColor="pink.400"
              >
                <Text fontSize="xs" color="pink.300">Connect ♡</Text>
              </Box>
              <HStack spacing={3}>
                {socialLinks.map((social) => (
                  <Box
                    key={social.label}
                    as={Link}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    p={3}
                    borderRadius="full"
                    bg="rgba(255, 255, 255, 0.05)"
                    color="gray.400"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    transition="all 0.3s ease"
                    aria-label={social.label}
                    _hover={{
                      transform: "scale(1.1) translateY(-3px)",
                      color: "pink.400",
                      borderColor: "pink.400",
                      bg: "rgba(236, 72, 153, 0.1)",
                      boxShadow: "0 10px 20px rgba(236, 72, 153, 0.2)"
                    }}
                  >
                    <social.icon size={18} />
                  </Box>
                ))}
              </HStack>
            </VStack>
          </SimpleGrid>

          {/* Cute divider */}
          <HStack justify="center" spacing={4} my={8}>
            <Box h="1px" flex={1} bgGradient="linear(to-r, transparent, rgba(236, 72, 153, 0.3))" />
            <Text color="pink.400" fontSize="sm">♡</Text>
            <Box h="1px" w="50px" bgGradient="linear(to-r, pink.400, purple.400)" />
            <Text color="purple.400" fontSize="sm">♡</Text>
            <Box h="1px" flex={1} bgGradient="linear(to-l, transparent, rgba(167, 139, 250, 0.3))" />
          </HStack>

          {/* Quote Section */}
          <Box textAlign="center" mb={6}>
            <Text
              fontSize="md"
              fontStyle="italic"
              color="gray.400"
              maxW="500px"
              mx="auto"
              lineHeight="tall"
            >
              {footerQuotes[t('locale')] || footerQuotes.jp}
            </Text>
          </Box>

          {/* Copyright */}
          <Box textAlign="center">
            <HStack justify="center" spacing={2}>
              <Text fontSize="sm" color="gray.500">
                © 2026 Kyuna / 霜花
              </Text>
              <Text fontSize="sm" color="gray.500">•</Text>
              <Text fontSize="sm" color="gray.500">
                Made with
              </Text>
              <Box animation={`${heartbeat} 1.5s ease-in-out infinite`}>
                <IoHeart color="#ec4899" size={14} />
              </Box>
              <Text fontSize="sm" color="gray.500">
                and lots of ☕
              </Text>
            </HStack>
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default Footer;
