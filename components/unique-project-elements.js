import React, { useState, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  IconButton,
  useColorModeValue,
  Flex,
  Image,
  Link,
  Tooltip,
} from '@chakra-ui/react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLinkIcon, ViewIcon, CodeIcon } from '@chakra-ui/icons';
import { IoLogoGithub, IoEyeOutline, IoCodeSlashOutline } from 'react-icons/io5';
import { TiltCard, RippleEffect } from './interactive-effects-v2';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionFlex = motion(Flex);

// Unique Hexagon Project Card
export const HexagonProjectCard = ({
  title,
  description,
  thumbnail,
  url,
  github,
  tech = [],
  delay = 0,
  featured = false,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(15, 23, 42, 0.9)"
  );
  const overlayBg = useColorModeValue(
    "rgba(236, 72, 153, 0.95)",
    "rgba(254, 128, 160, 0.95)"
  );

  return (
    <TiltCard tiltStrength={8}>
      <RippleEffect>
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={isInView ? {
            opacity: 1,
            scale: 1,
            rotateY: 0
          } : {
            opacity: 0,
            scale: 0.8,
            rotateY: -15
          }}
          transition={{
            duration: 0.8,
            delay,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            z: 10
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          position="relative"
          borderRadius="20px"
          overflow="hidden"
          boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          bg={cardBg}
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor={useColorModeValue("rgba(236, 72, 153, 0.2)", "rgba(254, 128, 160, 0.3)")}
          height={featured ? "400px" : "320px"}
          css={{
            transformStyle: "preserve-3d"
          }}
          {...props}
        >
      {/* Background Image */}
      <MotionImage
        src={thumbnail}
        alt={title}
        w="100%"
        h="60%"
        objectFit="cover"
        initial={{ scale: 1.2 }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Floating Tech Badges */}
      <AnimatePresence>
        {isHovered && (
          <Box position="absolute" top="10px" right="10px" zIndex={3}>
            {tech.slice(0, 3).map((t, i) => (
              <MotionBox
                key={t}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.1 }}
                mb={2}
              >
                <Badge
                  colorScheme="pink"
                  variant="solid"
                  borderRadius="full"
                  px={2}
                  py={1}
                  fontSize="xs"
                  boxShadow="lg"
                >
                  {t}
                </Badge>
              </MotionBox>
            ))}
          </Box>
        )}
      </AnimatePresence>

      {/* Interactive Overlay */}
      <AnimatePresence>
        {isHovered && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg={overlayBg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            backdropFilter="blur(10px)"
          >
            <VStack spacing={4}>
              <HStack spacing={4}>
                {url && (
                  <Tooltip label="Visit Project" placement="top">
                    <IconButton
                      as={Link}
                      href={url}
                      target="_blank"
                      icon={<IoEyeOutline size={20} />}
                      aria-label="Visit project"
                      colorScheme="whiteAlpha"
                      variant="solid"
                      size="lg"
                      borderRadius="full"
                      _hover={{ transform: "scale(1.1)" }}
                    />
                  </Tooltip>
                )}
                {github && (
                  <Tooltip label="View Code" placement="top">
                    <IconButton
                      as={Link}
                      href={github}
                      target="_blank"
                      icon={<IoLogoGithub size={20} />}
                      aria-label="View code"
                      colorScheme="whiteAlpha"
                      variant="solid"
                      size="lg"
                      borderRadius="full"
                      _hover={{ transform: "scale(1.1)" }}
                    />
                  </Tooltip>
                )}
              </HStack>
              <Text
                color="white"
                fontSize="sm"
                textAlign="center"
                maxW="200px"
                fontWeight="medium"
              >
                {description}
              </Text>
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Content Section */}
      <Box p={6} position="relative" zIndex={2}>
        <VStack align="start" spacing={3}>
          <Text
            fontSize={featured ? "xl" : "lg"}
            fontWeight="bold"
            color={useColorModeValue("gray.800", "white")}
            fontFamily="'Playfair Display', serif"
          >
            {title}
          </Text>

          {!isHovered && (
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.300")}
              noOfLines={2}
              lineHeight="tall"
            >
              {description}
            </Text>
          )}
        </VStack>
      </Box>

      {/* Featured Badge */}
      {featured && (
        <Box
          position="absolute"
          top="15px"
          left="15px"
          zIndex={3}
        >
          <Badge
            bg="linear-gradient(135deg, #ec4899, #f43f5e)"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontWeight="bold"
            boxShadow="lg"
          >
            Featured
          </Badge>
        </Box>
      )}
        </MotionBox>
      </RippleEffect>
    </TiltCard>
  );
};

// Masonry-style Project Grid
export const MasonryProjectGrid = ({ projects = [], children, ...props }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)"
      }}
      gap={8}
      gridAutoRows="minmax(300px, auto)"
      {...props}
    >
      {children}
    </Box>
  );
};

// Floating Project Statistics
export const ProjectStats = ({ stats = [], delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <MotionFlex
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
      justify="center"
      wrap="wrap"
      gap={8}
      mb={12}
    >
      {stats.map((stat, index) => (
        <MotionBox
          key={stat.label}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + (index * 0.1),
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ scale: 1.1 }}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          borderRadius="20px"
          textAlign="center"
          boxShadow="xl"
          border="1px solid"
          borderColor={useColorModeValue("pink.100", "pink.800")}
          minW="120px"
        >
          <Text
            fontSize="3xl"
            fontWeight="bold"
            bgGradient="linear(to-r, pink.400, rose.400)"
            bgClip="text"
            fontFamily="'Playfair Display', serif"
          >
            {stat.value}
          </Text>
          <Text
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
            fontWeight="medium"
          >
            {stat.label}
          </Text>
        </MotionBox>
      ))}
    </MotionFlex>
  );
};

// Interactive Section Divider
export const SectionDivider = ({ delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <MotionBox
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.2, delay }}
      w="100%"
      h="2px"
      bg="linear-gradient(90deg, transparent, #ec4899, #f43f5e, transparent)"
      my={16}
      borderRadius="full"
      transformOrigin="center"
    />
  );
};
