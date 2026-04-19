import React from 'react';
import { Box, Heading, Text, VStack, HStack, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IoLogoGithub, IoLogoTwitter, IoLogoInstagram, IoLogoYoutube, IoMail } from 'react-icons/io5';
import { SiDiscord } from 'react-icons/si';

const MotionBox = motion(Box);

const crystalline = { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const };

// ─── Background ────────────────────────────────────────────────────────────

export const ElegantBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box position="relative" overflow="hidden">
    <Box
      position="absolute"
      top="-120px"
      right="-120px"
      width="300px"
      height="300px"
      borderRadius="full"
      bg="radial-gradient(circle, rgba(77,184,212,0.04) 0%, transparent 70%)"
      pointerEvents="none"
    />
    <Box
      position="absolute"
      bottom="-80px"
      left="-80px"
      width="200px"
      height="200px"
      borderRadius="full"
      bg="radial-gradient(circle, rgba(196,165,90,0.04) 0%, transparent 70%)"
      pointerEvents="none"
    />
    {children}
  </Box>
);

// ─── Button ────────────────────────────────────────────────────────────────

interface ElegantButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'ice' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  [key: string]: unknown;
}

export const ElegantButton: React.FC<ElegantButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'ice',
  size = 'md',
  ...props
}) => {
  const styles = {
    ice: {
      border: '1px solid #4db8d4',
      color: '#4db8d4',
      bg: 'transparent',
      hoverBg: 'rgba(77, 184, 212, 0.08)',
      hoverShadow: '0 4px 20px rgba(77, 184, 212, 0.2)',
    },
    gold: {
      border: '1px solid #c4a55a',
      color: '#c4a55a',
      bg: 'transparent',
      hoverBg: 'rgba(196, 165, 90, 0.08)',
      hoverShadow: '0 4px 20px rgba(196, 165, 90, 0.2)',
    },
    ghost: {
      border: '1px solid #1e2d42',
      color: '#7899b0',
      bg: 'transparent',
      hoverBg: 'rgba(77, 184, 212, 0.04)',
      hoverShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    },
  };

  const sizeMap = {
    sm: { px: '14px', py: '7px', fontSize: '11px' },
    md: { px: '20px', py: '10px', fontSize: '12px' },
    lg: { px: '28px', py: '14px', fontSize: '13px' },
  };

  const s = styles[variant];
  const sz = sizeMap[size];
  const tag = href ? 'a' : 'button';

  return (
    <MotionBox
      as={tag}
      href={href}
      onClick={onClick}
      display="inline-flex"
      alignItems="center"
      gap={2}
      border={s.border}
      color={s.color}
      bg={s.bg}
      px={sz.px}
      py={sz.py}
      fontSize={sz.fontSize}
      fontFamily="mono"
      letterSpacing="0.08em"
      textTransform="uppercase"
      cursor="pointer"
      position="relative"
      textDecoration="none"
      whileHover={{ y: -2, boxShadow: s.hoverShadow, backgroundColor: s.hoverBg }}
      whileTap={{ scale: 0.97 }}
      transition={crystalline}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

// ─── Card ──────────────────────────────────────────────────────────────────

interface ElegantCardProps {
  children: React.ReactNode;
  delay?: number;
  [key: string]: unknown;
}

export const ElegantCard: React.FC<ElegantCardProps> = ({ children, delay = 0, ...props }) => (
  <MotionBox
    bg="#0d1525"
    border="1px solid #1e2d42"
    position="relative"
    overflow="hidden"
    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true }}
    transition={{ ...crystalline, delay }}
    whileHover={{
      borderColor: 'rgba(77, 184, 212, 0.35)',
      boxShadow: '0 8px 32px rgba(77, 184, 212, 0.1)',
      y: -3,
    }}
    {...props}
  >
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      h="1px"
      bgGradient="linear(to-r, transparent, #4db8d4, transparent)"
      opacity={0.4}
    />
    {children}
  </MotionBox>
);

// ─── Text ──────────────────────────────────────────────────────────────────

export const ElegantText: React.FC<{ children: React.ReactNode; [key: string]: unknown }> = ({
  children,
  ...props
}) => (
  <Text color="#e8eef4" lineHeight="tall" {...props}>
    {children}
  </Text>
);

// ─── Section ──────────────────────────────────────────────────────────────

export const ElegantSection: React.FC<{ children: React.ReactNode; [key: string]: unknown }> = ({
  children,
  ...props
}) => (
  <MotionBox
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={crystalline}
    py={{ base: 12, md: 16 }}
    {...props}
  >
    {children}
  </MotionBox>
);

// ─── Timeline ──────────────────────────────────────────────────────────────

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon?: string;
  delay?: number;
}

export const ElegantTimeline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box position="relative">
    <Box
      position="absolute"
      left={{ base: '14px', md: '50%' }}
      top={0}
      bottom={0}
      w="1px"
      bg="linear-gradient(to bottom, transparent, #1e2d42 15%, #1e2d42 85%, transparent)"
      transform={{ md: 'translateX(-50%)' }}
    />
    <VStack spacing={8} align="stretch">
      {children}
    </VStack>
  </Box>
);

export const ElegantTimelineItem: React.FC<TimelineItemProps> = ({
  year,
  title,
  description,
  delay = 0,
}) => (
  <MotionBox
    display="flex"
    alignItems="flex-start"
    gap={6}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ ...crystalline, delay }}
  >
    <Box
      position="relative"
      flexShrink={0}
      w="28px"
      h="28px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mt={1}
    >
      <Box
        w="8px"
        h="8px"
        border="1px solid #4db8d4"
        transform="rotate(45deg)"
        bg="#4db8d4"
        opacity={0.8}
      />
    </Box>

    <Box flex={1}>
      <HStack spacing={3} mb={1} align="baseline">
        <Text
          fontSize="xs"
          color="#c4a55a"
          fontFamily="mono"
          letterSpacing="0.1em"
          fontWeight="500"
        >
          {year}
        </Text>
        <Text fontSize="xs" color="#1e2d42">◆</Text>
        <Text
          fontSize="sm"
          fontWeight="600"
          color="#e8eef4"
          letterSpacing="0.04em"
        >
          {title}
        </Text>
      </HStack>
      <Text fontSize="sm" color="#4a6580" lineHeight="tall">
        {description}
      </Text>
    </Box>
  </MotionBox>
);

// ─── Social Links ──────────────────────────────────────────────────────────

interface SocialLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const DEFAULT_SOCIALS: SocialLink[] = [
  { icon: IoLogoGithub, href: 'https://github.com/kyuna0312', label: 'GitHub' },
  { icon: IoLogoYoutube, href: 'https://www.youtube.com/@amarihana', label: 'YouTube' },
  { icon: IoLogoTwitter, href: 'https://x.com/kyuna0312', label: 'X' },
  { icon: IoLogoInstagram, href: 'https://www.instagram.com/kyuna0312/', label: 'Instagram' },
  { icon: SiDiscord, href: 'https://discord.gg/shiba', label: 'Discord' },
  { icon: IoMail, href: '/contact', label: 'Contact' },
];

export const ElegantSocialLinks: React.FC<{ links?: SocialLink[] }> = ({
  links = DEFAULT_SOCIALS,
}) => (
  <HStack spacing={2} flexWrap="wrap">
    {links.map((social) => (
      <MotionBox
        key={social.label}
        as={Link}
        href={social.href}
        target={social.href.startsWith('http') ? '_blank' : undefined}
        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        p={2}
        border="1px solid #1e2d42"
        color="#4a6580"
        display="flex"
        alignItems="center"
        justifyContent="center"
        aria-label={social.label}
        whileHover={{
          color: '#4db8d4',
          borderColor: '#4db8d4',
          backgroundColor: 'rgba(77, 184, 212, 0.06)',
          y: -2,
        }}
        transition={crystalline}
      >
        <social.icon size={16} />
      </MotionBox>
    ))}
  </HStack>
);

// ─── Floating Elements (subtle background) ─────────────────────────────────

export const FloatingElements: React.FC = () => (
  <>
    {[
      { top: '15%', left: '5%', size: 120, dur: 20, delay: 0, color: 'rgba(77,184,212,0.03)' },
      { top: '60%', right: '8%', size: 80, dur: 28, delay: 5, color: 'rgba(196,165,90,0.03)' },
      { top: '35%', left: '88%', size: 60, dur: 35, delay: 10, color: 'rgba(77,184,212,0.02)' },
    ].map((el, i) => (
      <Box
        key={i}
        position="fixed"
        top={el.top}
        left={el.left}
        right={el.right}
        width={`${el.size}px`}
        height={`${el.size}px`}
        borderRadius="full"
        bg={el.color}
        pointerEvents="none"
        zIndex={0}
        style={{ animation: `float ${el.dur}s ease-in-out ${el.delay}s infinite` }}
      />
    ))}
  </>
);

// Keep Heading re-export for any callers that imported it from here
export { Heading };
