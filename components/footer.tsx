import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Link,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { IoLogoGithub, IoLogoTwitter, IoLogoInstagram, IoLogoYoutube, IoMail } from 'react-icons/io5';
import { SiDiscord } from 'react-icons/si';
import { motion } from 'framer-motion';
import { MagicArray } from './magic-array';

const MotionBox = motion(Box);

const Footer = () => {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const footerQuotes = {
    en: "One step, two steps — the path to the future is at your feet.",
    jp: "一歩、二歩…「未来」への道は足元にある。",
    mn: "Нэг алхам, хоёр алхам... 'Ирээдүй' рүү чиглэх зам хөл дор байна."
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
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <MotionBox
      as="footer"
      bg="rgba(8, 12, 20, 0.95)"
      borderTop="1px solid #1e2d42"
      css={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      mt={20}
      pt={14}
      pb={8}
      position="relative"
      overflow="hidden"
    >
      {/* Background magic array decoration */}
      {mounted && (
        <Box
          position="absolute"
          bottom="-60px"
          right="-60px"
          pointerEvents="none"
          opacity={0.06}
        >
          <MagicArray size="xl" opacity={1} animate />
        </Box>
      )}

      <Box maxW="container.xl" mx="auto" px={{ base: 6, md: 10 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12} mb={12}>
          {/* Profile Section */}
          <VStack spacing={5} align={{ base: 'center', md: 'start' }}>
            <Box
              width="88px"
              height="88px"
              borderRadius="none"
              overflow="hidden"
              border="1px solid #1e2d42"
              boxShadow="0 0 24px rgba(77, 184, 212, 0.12)"
              position="relative"
            >
              <Box
                as="img"
                src="/images/ig-photo-1.jpg"
                alt="Kyuna"
                width="100%"
                height="100%"
                objectFit="cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = '/images/maya.png';
                }}
              />
            </Box>

            <VStack spacing={1} textAlign={{ base: 'center', md: 'left' }}>
              <Heading
                size="sm"
                fontFamily="heading"
                color="#c4a55a"
                letterSpacing="0.08em"
              >
                Kyuna / 霜花
              </Heading>
              <Text fontSize="xs" color="#4a6580" letterSpacing="0.06em" textTransform="uppercase">
                Dev · Cosplayer · OSS · For hire
              </Text>
            </VStack>
          </VStack>

          {/* Quick Links */}
          <VStack spacing={4} align={{ base: 'center', md: 'start' }}>
            <Text
              fontSize="xs"
              color="#4db8d4"
              letterSpacing="0.1em"
              textTransform="uppercase"
              fontWeight="600"
              borderBottom="1px solid #1e2d42"
              pb={2}
              w="full"
            >
              Navigation
            </Text>
            <VStack spacing={1} align={{ base: 'center', md: 'start' }}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color="#4a6580"
                  fontWeight="400"
                  fontSize="sm"
                  letterSpacing="0.04em"
                  py={1}
                  px={0}
                  transition="all 0.2s ease"
                  _hover={{
                    color: '#4db8d4',
                    textDecoration: 'none',
                    transform: 'translateX(4px)',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </VStack>
          </VStack>

          {/* Social Links */}
          <VStack spacing={4} align={{ base: 'center', md: 'start' }}>
            <Text
              fontSize="xs"
              color="#4db8d4"
              letterSpacing="0.1em"
              textTransform="uppercase"
              fontWeight="600"
              borderBottom="1px solid #1e2d42"
              pb={2}
              w="full"
            >
              Connect
            </Text>
            <HStack spacing={2} flexWrap="wrap">
              {socialLinks.map((social) => (
                <Box
                  key={social.label}
                  as={Link}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  p={2}
                  borderRadius="none"
                  bg="transparent"
                  color="#4a6580"
                  border="1px solid #1e2d42"
                  transition="all 0.2s ease"
                  aria-label={social.label}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{
                    color: '#4db8d4',
                    borderColor: '#4db8d4',
                    bg: 'rgba(77, 184, 212, 0.06)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(77, 184, 212, 0.15)',
                  }}
                >
                  <social.icon size={16} />
                </Box>
              ))}
            </HStack>
          </VStack>
        </SimpleGrid>

        {/* Divider */}
        <Box h="1px" bg="#1e2d42" mb={6} />

        {/* Quote */}
        <Box textAlign="center" mb={6}>
          <Text
            fontSize="sm"
            fontStyle="italic"
            color="#4a6580"
            maxW="480px"
            mx="auto"
            lineHeight="tall"
            letterSpacing="0.02em"
          >
            {footerQuotes[t('locale') as keyof typeof footerQuotes] || footerQuotes.en}
          </Text>
        </Box>

        {/* Copyright */}
        <Box textAlign="center">
          <Text fontSize="xs" color="#2a3a4e" letterSpacing="0.08em">
            © 2026 Kyuna / 霜花 — MIT License
          </Text>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default Footer;
