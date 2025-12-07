import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Link,
  useColorModeValue,
  Divider,
  SimpleGrid,
  Heading
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import OptimizedImage from './optimized-image';
import { IoLogoGithub, IoLogoTwitter, IoLogoInstagram, IoMail } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { MagneticButton, HoverCard, FloatingActionButton } from './interactive-effects-v2';
import { GlassCard } from './advanced-theme-elements';

const MotionBox = motion(Box);

const Footer = () => {
  const { t } = useTranslation('common');

  const footerQuotes = {
    en: "💞👠⚜️ One step, two steps... The path to the 'future' is at your feet. 💞👠⚜️",
    jp: "💞👠⚜️ 一歩、二歩…「未来」への道は足元にある。💞👠⚜️",
    mn: "💞👠⚜️ Нэг алхам, хоёр алхам... 'Ирээдүй' рүү чиглэх зам хөл дор байна. 💞👠⚜️"
  };

  const socialLinks = [
    { icon: IoLogoGithub, href: 'https://github.com/kyuna312', label: 'GitHub' },
    { icon: IoLogoTwitter, href: 'https://twitter.com/m1or3n', label: 'Twitter' },
    { icon: IoLogoInstagram, href: 'https://instagram.com/m1or3n', label: 'Instagram' },
    { icon: IoMail, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  const bgColor = useColorModeValue('glass.light', 'glass.dark');
  const borderColor = useColorModeValue('rgba(236, 72, 153, 0.1)', 'rgba(254, 128, 160, 0.2)');

  return (
    <MotionBox
      as="footer"
      bg={bgColor}
      borderTop={`1px solid ${borderColor}`}
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
    >
      {/* Background Gradient */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient={useColorModeValue(
          "linear(to-b, transparent, rgba(236, 72, 153, 0.05))",
          "linear(to-b, transparent, rgba(254, 128, 160, 0.1))"
        )}
        zIndex={-1}
      />

      <Box maxW="container.xl" mx="auto" px={8}>
        {/* Main Footer Content */}
        <GlassCard p={12} opacity={0.1} borderColor="rgba(236, 72, 153, 0.2)">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
            {/* Profile Section */}
            <VStack spacing={6} align={{ base: "center", md: "start" }}>
              <MotionBox
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  width="120px"
                  height="120px"
                  borderRadius="full"
                  overflow="hidden"
                  border="3px solid"
                  borderColor="feminine.300"
                  boxShadow="lg"
                >
                  <OptimizedImage
                    src="/images/maya.png"
                    width={120}
                    height={120}
                    alt="Profile picture"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
              </MotionBox>

              <VStack spacing={2} textAlign={{ base: "center", md: "left" }}>
                <Heading
                  size="md"
                  fontFamily="'Playfair Display', serif"
                  bgGradient="linear(to-r, pink.400, rose.400)"
                  bgClip="text"
                >
                  霜花 (Shimoka)
                </Heading>
                <Text
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.400")}
                  fontStyle="italic"
                >
                  Creative Developer & Designer
                </Text>
              </VStack>
            </VStack>

            {/* Quick Links */}
            <VStack spacing={4} align={{ base: "center", md: "start" }}>
              <Heading
                size="sm"
                color={useColorModeValue("gray.800", "white")}
                fontFamily="'Playfair Display', serif"
              >
                Quick Links
              </Heading>
              <VStack spacing={2} align={{ base: "center", md: "start" }}>
                {quickLinks.map((link, index) => (
                  <MagneticButton key={index} strength={0.1}>
                    <HoverCard hoverScale={1.05} glowEffect={true}>
                      <Link
                        href={link.href}
                        color={useColorModeValue("gray.600", "gray.300")}
                        fontWeight="500"
                        px={3}
                        py={2}
                        borderRadius="md"
                        transition="all 0.3s ease"
                        _hover={{
                          color: "feminine.500",
                          textDecoration: "none",
                          bg: useColorModeValue("rgba(236, 72, 153, 0.1)", "rgba(254, 128, 160, 0.1)")
                        }}
                      >
                        {link.name}
                      </Link>
                    </HoverCard>
                  </MagneticButton>
                ))}
              </VStack>
            </VStack>

            {/* Social Links */}
            <VStack spacing={4} align={{ base: "center", md: "start" }}>
              <Heading
                size="sm"
                color={useColorModeValue("gray.800", "white")}
                fontFamily="'Playfair Display', serif"
              >
                Connect
              </Heading>
              <HStack spacing={4}>
                {socialLinks.map((social, index) => (
                  <MagneticButton key={index} strength={0.3}>
                    <FloatingActionButton
                      amplitude={3}
                      duration={2 + index * 0.5}
                      delay={index * 0.2}
                    >
                      <HoverCard
                        hoverScale={1.1}
                        rotateOnHover={true}
                        glowEffect={true}
                        shadowEffect={true}
                      >
                        <Box
                          as={Link}
                          href={social.href}
                          target="_blank"
                          p={3}
                          borderRadius="full"
                          bg={useColorModeValue("glass.light", "glass.dark")}
                          color="feminine.500"
                          border="1px solid"
                          borderColor={useColorModeValue("rgba(236, 72, 153, 0.2)", "rgba(254, 128, 160, 0.2)")}
                          backdropFilter="blur(10px)"
                          transition="all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                          aria-label={social.label}
                        >
                          <social.icon size={20} />
                        </Box>
                      </HoverCard>
                    </FloatingActionButton>
                  </MagneticButton>
                ))}
              </HStack>
            </VStack>
          </SimpleGrid>

          <Divider
            my={8}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          />

          {/* Quote Section */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            textAlign="center"
            mb={8}
          >
            <Text
              fontSize="lg"
              fontStyle="italic"
              color={useColorModeValue("gray.600", "gray.300")}
              maxW="600px"
              mx="auto"
              lineHeight="tall"
            >
              {footerQuotes[t('locale')] || footerQuotes.jp}
            </Text>
          </MotionBox>

          {/* Copyright */}
          <Box textAlign="center">
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.500")}
            >
              © {new Date().getFullYear()} 霜花 (Shimoka). Made with ❤️ and lots of ☕
            </Text>
          </Box>
        </GlassCard>
      </Box>
    </MotionBox>
  );
};

export default Footer;
