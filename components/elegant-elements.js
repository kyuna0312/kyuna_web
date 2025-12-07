import React from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Flex,
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

// Elegant Section Component - using static dark mode colors
export const ElegantSection = ({ children, delay = 0, bg, ...props }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  // Static dark mode colors to prevent hydration issues
  const defaultBg = "rgba(26, 32, 44, 0.8)"
  const borderColor = "rgba(254, 128, 160, 0.2)"

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      bg={bg || defaultBg}
      backdropFilter="blur(20px)"
      borderRadius="20px"
      p={8}
      mb={8}
      border="1px solid"
      borderColor={borderColor}
      boxShadow="elegant"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(254, 128, 160, 0.6), transparent)",
        animation: "shimmer 3s ease-in-out infinite",
      }}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

// Sophisticated Button Component
export const ElegantButton = ({ children, variant = "elegant", isLoading, ...props }) => {
  return (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant={variant}
        isLoading={isLoading}
        loadingText="Loading..."
        fontFamily="'Inter', sans-serif"
        fontSize="md"
        px={8}
        py={6}
        h="auto"
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          transition: "left 0.5s",
        }}
        _hover={{
          _before: {
            left: "100%",
          }
        }}
        {...props}
      >
        {children}
      </Button>
    </MotionBox>
  )
}

// Elegant Card Component - using static dark mode colors
export const ElegantCard = ({ children, icon, title, ...props }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  // Static dark mode colors to prevent hydration issues
  const cardBg = "rgba(26, 32, 44, 0.8)"
  const borderColor = "rgba(254, 128, 160, 0.2)"

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        y: -5,
        boxShadow: "elegant-lg",
        transition: { duration: 0.3 }
      }}
      bg={cardBg}
      backdropFilter="blur(15px)"
      borderRadius="16px"
      p={6}
      border="1px solid"
      borderColor={borderColor}
      boxShadow="elegant"
      position="relative"
      cursor="pointer"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #ec4899, #f43f5e)",
        transform: "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.3s ease",
      }}
      _hover={{
        _before: {
          transform: "scaleX(1)",
        }
      }}
      {...props}
    >
      {icon && (
        <Box
          fontSize="2xl"
          mb={3}
          color="feminine.500"
        >
          {icon}
        </Box>
      )}
      {title && (
        <Text
          fontSize="lg"
          fontWeight="600"
          mb={2}
          color="elegant.800"
          fontFamily="'Playfair Display', serif"
        >
          {title}
        </Text>
      )}
      {children}
    </MotionBox>
  )
}

// Sophisticated Text Component
export const ElegantText = ({ children, variant = "elegant", as = "span", ...props }) => {
  return (
    <Text
      as={as}
      textStyle={variant}
      fontWeight="600"
      letterSpacing="-0.02em"
      {...props}
    >
      {children}
    </Text>
  )
}

// Floating Elements Component
export const FloatingElements = () => {
  return (
    <>
      <MotionBox
        position="absolute"
        top="10%"
        right="10%"
        w="20px"
        h="20px"
        borderRadius="full"
        bg="linear-gradient(135deg, #ec4899, #f43f5e)"
        opacity={0.6}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        zIndex={0}
      />
      <MotionBox
        position="absolute"
        top="60%"
        left="5%"
        w="15px"
        h="15px"
        borderRadius="full"
        bg="linear-gradient(135deg, #f43f5e, #ec4899)"
        opacity={0.4}
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        zIndex={0}
      />
      <MotionBox
        position="absolute"
        bottom="20%"
        right="20%"
        w="12px"
        h="12px"
        borderRadius="full"
        bg="linear-gradient(135deg, #ec4899, #be185d)"
        opacity={0.5}
        animate={{
          y: [-15, 15, -15],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        zIndex={0}
      />
    </>
  )
}

// Sophisticated Background Component
export const ElegantBackground = ({ children, ...props }) => {
  return (
    <Box
      position="relative"
      minH="100vh"
      overflow="hidden"
      {...props}
    >
      <FloatingElements />
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  )
}

// Cute emoji icons for timeline items
const timelineEmojis = ['🌸', '✨', '💫', '🎀', '💖', '⭐', '🌟', '💝']

// Timeline Component - Cute Version
export const ElegantTimeline = ({ items = [] }) => {
  return (
    <VStack spacing={8} align="stretch" position="relative" py={4}>
      {/* Cute gradient timeline line with dashes */}
      <Box
        position="absolute"
        left={{ base: "24px", md: "28px" }}
        top="0"
        bottom="0"
        w="3px"
        bgGradient="linear(to-b, pink.400, purple.400, pink.300)"
        borderRadius="full"
        zIndex={0}
        sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(to bottom, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 16px)',
          }
        }}
      />

      {items.map((item, index) => (
        <ElegantTimelineItem
          key={index}
          {...item}
          delay={index * 0.15}
          emoji={timelineEmojis[index % timelineEmojis.length]}
          isLast={index === items.length - 1}
        />
      ))}
    </VStack>
  )
}

// Timeline Item Component - Cute Version
export const ElegantTimelineItem = ({ year, title, description, delay = 0, emoji = '✨', isLast = false }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <MotionFlex
      ref={ref}
      initial={{ opacity: 0, x: -30, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -30, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      align="flex-start"
      position="relative"
      zIndex={1}
    >
      {/* Cute timeline dot with emoji */}
      <MotionBox
        w={{ base: "50px", md: "58px" }}
        h={{ base: "50px", md: "58px" }}
        borderRadius="full"
        bgGradient="linear(135deg, pink.400, purple.500)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        border="4px solid"
        borderColor="gray.800"
        boxShadow="0 4px 20px rgba(236, 72, 153, 0.4)"
        position="relative"
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Text fontSize={{ base: "lg", md: "xl" }}>{emoji}</Text>

        {/* Year badge */}
        <Box
          position="absolute"
          bottom="-8px"
          bg="gray.900"
          px={2}
          py={0.5}
          borderRadius="full"
          border="2px solid"
          borderColor="pink.400"
          fontSize="xs"
          fontWeight="bold"
          color="pink.300"
        >
          {year}
        </Box>
      </MotionBox>

      {/* Content card */}
      <Box ml={{ base: 4, md: 6 }} flex={1} mt={1}>
        <MotionBox
          bg="rgba(26, 32, 44, 0.6)"
          backdropFilter="blur(10px)"
          borderRadius="20px"
          p={{ base: 4, md: 6 }}
          border="1px solid"
          borderColor="rgba(254, 128, 160, 0.2)"
          position="relative"
          whileHover={{
            y: -3,
            boxShadow: "0 10px 30px rgba(236, 72, 153, 0.2)",
            borderColor: "rgba(254, 128, 160, 0.4)"
          }}
          transition={{ duration: 0.3 }}
          _before={{
            content: '""',
            position: "absolute",
            top: "20px",
            left: "-8px",
            w: "0",
            h: "0",
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            borderRight: "8px solid rgba(254, 128, 160, 0.2)",
          }}
        >
          {/* Cute sparkle decoration */}
          <Box
            position="absolute"
            top="-6px"
            right="12px"
            fontSize="sm"
            opacity={0.8}
          >
            ✦
          </Box>

          <HStack mb={2} spacing={2}>
            <Box
              px={3}
              py={1}
              bg="rgba(236, 72, 153, 0.15)"
              borderRadius="full"
              border="1px solid"
              borderColor="pink.400"
            >
              <Text
                fontSize="xs"
                color="pink.300"
                fontWeight="700"
                letterSpacing="wider"
              >
                {year}
              </Text>
            </Box>
          </HStack>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="700"
            color="white"
            mb={2}
            fontFamily="'Playfair Display', serif"
            lineHeight="short"
          >
            {title}
          </Text>

          <Text
            color="gray.400"
            lineHeight="tall"
            fontSize={{ base: "sm", md: "md" }}
          >
            {description}
          </Text>

          {/* Cute bottom decoration */}
          {!isLast && (
            <Box
              position="absolute"
              bottom="-20px"
              left="50%"
              transform="translateX(-50%)"
              fontSize="xs"
              color="pink.400"
              opacity={0.6}
            >
              ♡
            </Box>
          )}
        </MotionBox>
      </Box>
    </MotionFlex>
  )
}

// Social Links Component
export const ElegantSocialLinks = ({ links = [] }) => {
  return (
    <HStack spacing={4} justify="center">
      {links.map((link, index) => (
        <MotionBox
          key={index}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <NextLink
            href={link.href}
            passHref
            legacyBehavior
          >
            <Box
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="50px"
              h="50px"
              borderRadius="full"
            bg="rgba(255, 255, 255, 0.8)"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="rgba(236, 72, 153, 0.2)"
            color="feminine.600"
            transition="all 0.3s ease"
            boxShadow="elegant"
            _hover={{
              bg: "feminine.500",
              color: "white",
              borderColor: "feminine.500",
              boxShadow: "elegant-lg",
            }}
          >
            <Box as={link.icon} size="20px" />
          </Box>
          </NextLink>
        </MotionBox>
      ))}
    </HStack>
  )
}
