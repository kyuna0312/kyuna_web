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
import { IoLogoGithub, IoLogoTwitter, IoLogoInstagram, IoMail } from 'react-icons/io5';
import { motion } from 'framer-motion';

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

  // Call all hooks at the top level
  const bgColor = useColorModeValue('glass.light', 'glass.dark');
  const borderColor = useColorModeValue('rgba(236, 72, 153, 0.1)', 'rgba(254, 128, 160, 0.2)');
  const bgGradient = useColorModeValue(
    "linear(to-b, transparent, rgba(236, 72, 153, 0.05))",
    "linear(to-b, transparent, rgba(254, 128, 160, 0.1))"
  );
  const textColorMuted = useColorModeValue("gray.600", "gray.400");
  const textColorLight = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const dividerColor = useColorModeValue("gray.200", "gray.700");
  const copyrightColor = useColorModeValue("gray.500", "gray.500");
  const glassLight = useColorModeValue("glass.light", "glass.dark");
  const socialBorderColor = useColorModeValue("rgba(236, 72, 153, 0.2)", "rgba(254, 128, 160, 0.2)");
  const linkHoverBg = useColorModeValue("rgba(236, 72, 153, 0.1)", "rgba(254, 128, 160, 0.1)");

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
        bgGradient={bgGradient}
        zIndex={-1}
      />

      <Box maxW="container.xl" mx="auto" px={8}>
        {/* Main Footer Content */}
        <Box
          p={12}
          bg="rgba(255, 255, 255, 0.05)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(236, 72, 153, 0.2)"
          borderRadius="2xl"
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
            {/* Profile Section */}
            <VStack spacing={6} align={{ base: "center", md: "start" }}>
              <Box
                width="120px"
                height="120px"
                borderRadius="full"
                overflow="hidden"
                border="3px solid"
                borderColor="feminine.300"
                boxShadow="lg"
                bg="gray.200"
              >
                <Box
                  as="img"
                  src="/images/maya.png"
                  alt="Profile picture"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Box>

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
                  color={textColorMuted}
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
                color={headingColor}
                fontFamily="'Playfair Display', serif"
              >
                Quick Links
              </Heading>
              <VStack spacing={2} align={{ base: "center", md: "start" }}>
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    color={textColorLight}
                    fontWeight="500"
                    px={3}
                    py={2}
                    borderRadius="md"
                    transition="all 0.3s ease"
                    _hover={{
                      color: "feminine.500",
                      textDecoration: "none",
                      bg: linkHoverBg
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </VStack>
            </VStack>

            {/* Social Links */}
            <VStack spacing={4} align={{ base: "center", md: "start" }}>
              <Heading
                size="sm"
                color={headingColor}
                fontFamily="'Playfair Display', serif"
              >
                Connect
              </Heading>
              <HStack spacing={4}>
                {socialLinks.map((social, index) => (
                  <Box
                    key={index}
                    as={Link}
                    href={social.href}
                    target="_blank"
                    p={3}
                    borderRadius="full"
                    bg={glassLight}
                    color="feminine.500"
                    border="1px solid"
                    borderColor={socialBorderColor}
                    backdropFilter="blur(10px)"
                    transition="all 0.3s ease"
                    aria-label={social.label}
                    _hover={{
                      transform: "scale(1.1)",
                      color: "feminine.600"
                    }}
                  >
                    <social.icon size={20} />
                  </Box>
                ))}
              </HStack>
            </VStack>
          </SimpleGrid>

          <Divider my={8} borderColor={dividerColor} />

          {/* Quote Section */}
          <Box textAlign="center" mb={8}>
            <Text
              fontSize="lg"
              fontStyle="italic"
              color={textColorLight}
              maxW="600px"
              mx="auto"
              lineHeight="tall"
            >
              {footerQuotes[t('locale')] || footerQuotes.jp}
            </Text>
          </Box>

          {/* Copyright */}
          <Box textAlign="center">
            <Text fontSize="sm" color={copyrightColor}>
              © 2024 霜花 (Shimoka). Made with ❤️ and lots of ☕
            </Text>
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default Footer;
