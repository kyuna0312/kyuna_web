import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import {
  Link,
  Box,
  Text,
  VStack,
  SimpleGrid,
  Heading,
  HStack,
  keyframes,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import OptimizedImage from '../components/optimized-image-v2'
import {
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoYoutube,
  IoSparkles,
  IoHeart,
} from 'react-icons/io5'
import { SiDiscord } from 'react-icons/si'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config'
import {
  ElegantBackground,
  ElegantButton,
  ElegantTimeline,
} from '../components/elegant-elements'
import {
  ResponsiveContainer,
} from '../components/responsive-design-system'
import SEOHead from '../components/seo-head'
import { CriticalCSS } from '../components/performance-optimization'
import { motion } from 'framer-motion'
import type { DecoPositionProps } from '@/types'

// Cute animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(5deg); }
  75% { transform: translateY(5px) rotate(-5deg); }
`

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
`

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3), 0 0 40px rgba(236, 72, 153, 0.1); }
  50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.5), 0 0 80px rgba(236, 72, 153, 0.2); }
`

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

// Dynamic imports for heavy interactive components (client-side only)
const ConstellationBackground = dynamic(
  () => import('../components/projects-background-effects').then(mod => mod.ConstellationBackground),
  { ssr: false }
)

const TiltCard = dynamic(
  () => import('../components/interactive-effects-v2').then(mod => mod.TiltCard),
  { ssr: false }
)

const MagneticButton = dynamic(
  () => import('../components/interactive-effects-v2').then(mod => mod.MagneticButton),
  { ssr: false, loading: () => <Box display="inline-block" /> }
)

const ParallaxElement = dynamic(
  () => import('../components/interactive-effects-v2').then(mod => mod.ParallaxElement),
  { ssr: false }
)

const FloatingActionButton = dynamic(
  () => import('../components/interactive-effects-v2').then(mod => mod.FloatingActionButton),
  { ssr: false }
)

const ScrollAnimationWrapper = dynamic(
  () => import('../components/advanced-animations').then(mod => mod.ScrollAnimationWrapper),
  { ssr: false }
)

const MotionBox = motion(Box)

const Home = () => {
  const { t } = useTranslation('common')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const timelineItems = [
    {
      year: '2000',
      title: t('home.timeline.2000'),
      description: t('home.timelineDesc.2000'),
    },
    {
      year: '2019',
      title: t('home.timeline.2019'),
      description: t('home.timelineDesc.2019'),
    },
    {
      year: '2021',
      title: t('home.timeline.2021'),
      description: t('home.timelineDesc.2021'),
    },
    {
      year: '2023',
      title: t('home.timeline.2023-01'),
      description: t('home.timelineDesc.2023-01'),
    },
    {
      year: '2023',
      title: t('home.timeline.2023-02'),
      description: t('home.timelineDesc.2023-02'),
    },
  ]

  const socialLinks = [
    { icon: IoLogoGithub, href: 'https://github.com/kyuna0312', label: 'GitHub' },
    { icon: IoLogoYoutube, href: 'https://www.youtube.com/@amarihana', label: 'YouTube' },
    { icon: IoLogoTwitter, href: 'https://x.com/kyuna0312', label: 'X' },
    { icon: IoLogoInstagram, href: 'https://www.instagram.com/kyuna0312/', label: 'Instagram' },
    { icon: SiDiscord, href: 'https://discord.gg/shiba', label: 'Discord' },
  ]

  const skillsRaw = t('home.skills.items', { returnObjects: true })
  const skills = Array.isArray(skillsRaw) ? skillsRaw : []

  const pillarsRaw = t('home.pillars', { returnObjects: true })
  const pillarOrder = ['oss', 'comics', 'youtube']
  const pillars = pillarOrder
    .map((key) => (pillarsRaw && typeof pillarsRaw === 'object' ? pillarsRaw[key] : null))
    .filter(Boolean)

  // Static colors for consistent rendering
  const textColor = "gray.300"
  const socialBg = "rgba(26, 32, 44, 0.8)"

  // Cute decorative elements that only render on client
  const CuteSparkle = ({
    delay = 0,
    size = '12px',
    top,
    left,
    right,
    bottom,
  }: DecoPositionProps) => (
    <Box
      position="absolute"
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      color="pink.300"
      fontSize={size}
      animation={`${sparkleAnimation} 2s ease-in-out ${delay}s infinite`}
      pointerEvents="none"
    >
      ✦
    </Box>
  )

  const FloatingHeart = ({
    delay = 0,
    size = '16px',
    top,
    left,
    right,
    bottom,
  }: DecoPositionProps) => (
    <Box
      position="absolute"
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      color="pink.400"
      fontSize={size}
      animation={`${floatAnimation} 3s ease-in-out ${delay}s infinite`}
      opacity={0.6}
      pointerEvents="none"
    >
      ♡
    </Box>
  )

  return (
    <>
      <SEOHead title={t('home.seoTitle')} description={t('home.seoDescription')} />
      <CriticalCSS />

      <Layout>
        <ElegantBackground>
          <ConstellationBackground />
          <ResponsiveContainer maxWidth={{ base: '100%', xl: '1400px' }} paddingTop={20}>

            {/* ✨ Enhanced Cute Hero Section ✨ */}
            <ScrollAnimationWrapper>
              <MotionBox
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                mb={20}
              >
                <Box
                  display={{ base: 'block', lg: 'flex' }}
                  alignItems="center"
                  gap={{ base: 8, lg: 16 }}
                  minH={{ base: "auto", lg: "70vh" }}
                  position="relative"
                  py={{ base: 8, lg: 0 }}
                >
                  {/* Cute floating decorations - only on client */}
                  {mounted && (
                    <>
                      <CuteSparkle delay={0} top="10%" left="5%" size="16px" />
                      <CuteSparkle delay={0.5} top="20%" right="10%" size="12px" />
                      <CuteSparkle delay={1} bottom="30%" left="15%" size="14px" />
                      <CuteSparkle delay={0.7} top="50%" left="3%" size="10px" />
                      <CuteSparkle delay={1.2} bottom="15%" right="8%" size="14px" />
                      <FloatingHeart delay={0.3} top="15%" right="20%" size="18px" />
                      <FloatingHeart delay={0.8} bottom="20%" left="8%" size="14px" />
                      <FloatingHeart delay={1.5} top="60%" right="5%" size="16px" />
                      <Box
                        position="absolute"
                        top="35%"
                        left="2%"
                        fontSize="20px"
                        color="pink.300"
                        animation={`${floatAnimation} 3.5s ease-in-out 0.4s infinite`}
                        opacity={0.4}
                        pointerEvents="none"
                      >
                        🌸
                      </Box>
                      <Box
                        position="absolute"
                        bottom="35%"
                        right="3%"
                        fontSize="18px"
                        color="purple.300"
                        animation={`${floatAnimation} 3.2s ease-in-out 1s infinite`}
                        opacity={0.4}
                        pointerEvents="none"
                      >
                        🎀
                      </Box>
                    </>
                  )}

                  {/* Profile Image with Cute Styling */}
                  <TiltCard
                    tiltStrength={12}
                    glareEffect={true}
                    shadow={true}
                    scale={1.05}
                  >
                    <FloatingActionButton amplitude={8} duration={4}>
                      <MotionBox
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
                        position="relative"
                      >
                        <Box
                          width={{ base: "220px", md: "300px" }}
                          height={{ base: "220px", md: "300px" }}
                          position="relative"
                          mx="auto"
                          mb={{ base: 10, lg: 0 }}
                        >
                          {/* Cute glowing ring */}
                          <Box
                            position="absolute"
                            top="-15px"
                            left="-15px"
                            right="-15px"
                            bottom="-15px"
                            borderRadius="full"
                            bg="transparent"
                            border="3px dashed"
                            borderColor="pink.300"
                            opacity={0.5}
                            animation={`${floatAnimation} 6s ease-in-out infinite`}
                          />

                          {/* Pulsing glow effect */}
                          <Box
                            position="absolute"
                            top="-5px"
                            left="-5px"
                            right="-5px"
                            bottom="-5px"
                            borderRadius="full"
                            animation={`${pulseGlow} 3s ease-in-out infinite`}
                          />

                          <OptimizedImage
                            src="/images/霜花.png"
                            width={300}
                            height={300}
                            alt={t('home.imageAlt')}
                            priority={true}
                            style={{
                              borderRadius: '50%',
                              border: '4px solid rgba(236, 72, 153, 0.3)',
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />

                          {/* Cute corner decorations */}
                          {mounted && (
                            <>
                              <Box
                                position="absolute"
                                top="-8px"
                                right="-8px"
                                fontSize="24px"
                                animation={`${floatAnimation} 2s ease-in-out infinite`}
                              >
                                ✨
                              </Box>
                              <Box
                                position="absolute"
                                bottom="-5px"
                                left="-5px"
                                fontSize="20px"
                                animation={`${floatAnimation} 2.5s ease-in-out 0.5s infinite`}
                              >
                                💖
                              </Box>
                              <Box
                                position="absolute"
                                top="50%"
                                right="-20px"
                                fontSize="16px"
                                animation={`${sparkleAnimation} 2s ease-in-out 0.3s infinite`}
                              >
                                ⭐
                              </Box>
                            </>
                          )}
                        </Box>
                      </MotionBox>
                    </FloatingActionButton>
                  </TiltCard>

                  {/* Hero Content */}
                  <VStack align={{ base: "center", lg: "start" }} spacing={6} flex={1} textAlign={{ base: "center", lg: "left" }}>
                    {/* Cute greeting badge */}
                    <MotionBox
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <Box
                        display="inline-flex"
                        alignItems="center"
                        gap={2}
                        px={4}
                        py={2}
                        bg="rgba(236, 72, 153, 0.15)"
                        borderRadius="full"
                        border="1px solid"
                        borderColor="pink.300"
                        fontSize="sm"
                        color="pink.300"
                        fontWeight="medium"
                      >
                        <IoSparkles />
                        <span>{t('home.welcomeBadge')}</span>
                        <IoHeart />
                      </Box>
                    </MotionBox>

                    <MotionBox
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      <Heading
                        as="h1"
                        fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                        fontFamily="heading"
                        fontWeight="bold"
                        lineHeight="shorter"
                        mb={2}
                        position="relative"
                      >
                        <Box
                          as="span"
                          bgGradient="linear(135deg, #ff6b9d 0%, #c44569 25%, #f8a5c2 50%, #ff6b9d 75%, #c44569 100%)"
                          bgSize="200% 200%"
                          bgClip="text"
                          animation={`${gradientShift} 4s ease infinite`}
                          display="inline"
                        >
                          {t('home.title')}
                        </Box>
                        {mounted && (
                          <Box
                            as="span"
                            position="absolute"
                            top="-10px"
                            right={{ base: "-5px", lg: "-20px" }}
                            fontSize={{ base: "xl", lg: "2xl" }}
                            animation={`${floatAnimation} 2s ease-in-out infinite`}
                          >
                            ♪
                          </Box>
                        )}
                      </Heading>
                    </MotionBox>

                    <MotionBox
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 0.9 }}
                    >
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        color="pink.200"
                        fontWeight="600"
                        maxW="600px"
                        mb={3}
                      >
                        {t('home.subtitle')}
                      </Text>
                    </MotionBox>

                    <MotionBox
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <Text
                        fontSize={{ base: "md", md: "lg", lg: "xl" }}
                        color={textColor}
                        lineHeight="tall"
                        maxW="550px"
                      >
                        {t('home.description')}
                      </Text>
                    </MotionBox>

                    {pillars.length > 0 && (
                      <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        spacing={4}
                        w="100%"
                        maxW="720px"
                        mt={4}
                      >
                        {pillars.map((pillar, idx) => (
                          <Box
                            key={idx}
                            px={4}
                            py={3}
                            borderRadius="xl"
                            bg="rgba(236, 72, 153, 0.08)"
                            border="1px solid"
                            borderColor="rgba(236, 72, 153, 0.25)"
                          >
                            <Text fontWeight="bold" color="pink.300" fontSize="sm" mb={1}>
                              {pillar.title}
                            </Text>
                            <Text fontSize="sm" color={textColor} lineHeight="short">
                              {pillar.body}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    )}

                    <Box
                      w="100%"
                      maxW="720px"
                      mt={5}
                      px={4}
                      py={3}
                      borderRadius="lg"
                      bg="rgba(0, 0, 0, 0.35)"
                      border="1px solid"
                      borderColor="rgba(129, 230, 217, 0.35)"
                      fontFamily="mono"
                      fontSize={{ base: '10px', sm: 'xs' }}
                      color="teal.200"
                      textAlign="left"
                      lineHeight="tall"
                      whiteSpace="pre-wrap"
                      aria-label={t('home.buildSectionAria')}
                    >
                      <Text as="span" color="gray.500" display="block" mb={1}>
                        {t('home.buildSectionTitle')}
                      </Text>
                      {t('home.buildTree')}
                    </Box>

                    <HStack
                      mt={3}
                      spacing={2}
                      flexWrap="wrap"
                      rowGap={2}
                      justify={{ base: 'center', lg: 'flex-start' }}
                      align="center"
                      fontSize="sm"
                      maxW="720px"
                      w="100%"
                    >
                      <Text color="gray.500">{t('home.liveSites')}</Text>
                      <Link
                        href="https://kyuna-web.vercel.app"
                        color="teal.300"
                        fontWeight="600"
                        _hover={{ color: 'pink.300', textDecoration: 'underline' }}
                        isExternal
                      >
                        kyuna-web.vercel.app
                      </Link>
                      <Text color="gray.600" aria-hidden>
                        ·
                      </Text>
                      <Link
                        href="https://amane312.vercel.app"
                        color="teal.300"
                        fontWeight="600"
                        _hover={{ color: 'pink.300', textDecoration: 'underline' }}
                        isExternal
                      >
                        amane312.vercel.app
                      </Link>
                    </HStack>

                    {/* Cute Call-to-Action Buttons */}
                    <HStack
                      spacing={{ base: 3, md: 5 }}
                      mt={6}
                      flexWrap="wrap"
                      justify={{ base: "center", lg: "flex-start" }}
                    >
                      <MagneticButton magnetStrength={0.2}>
                        <ElegantButton
                          as={NextLink}
                          href="/projects"
                          variant="elegant"
                          size="lg"
                          rightIcon={<ChevronRightIcon />}
                          _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)"
                          }}
                        >
                          ✨ {t('home.viewProjects')}
                        </ElegantButton>
                      </MagneticButton>

                      <MagneticButton magnetStrength={0.15}>
                        <ElegantButton
                          as={NextLink}
                          href="/contact"
                          variant="outline"
                          size="lg"
                          _hover={{
                            bg: "rgba(236, 72, 153, 0.1)",
                            borderColor: "pink.400"
                          }}
                        >
                          {t('home.hireMe')}
                        </ElegantButton>
                      </MagneticButton>

                      <MagneticButton magnetStrength={0.15}>
                        <ElegantButton
                          as="a"
                          href="https://github.com/kyuna0312"
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          size="lg"
                          leftIcon={<IoLogoGithub />}
                          _hover={{
                            bg: "rgba(236, 72, 153, 0.1)",
                            borderColor: "pink.400"
                          }}
                        >
                          {t('navigation.github')}
                        </ElegantButton>
                      </MagneticButton>
                    </HStack>

                    {/* Cute Social Links */}
                    <MotionBox
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1.2 }}
                      mt={6}
                    >
                      <HStack spacing={4}>
                        {socialLinks.map((social) => (
                          <MagneticButton key={social.label} magnetStrength={0.3}>
                            <Box
                              as={Link}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={social.label}
                              p={3}
                              borderRadius="full"
                              bg={socialBg}
                              border="1px solid"
                              borderColor="rgba(236, 72, 153, 0.3)"
                              color="pink.400"
                              _hover={{
                                transform: "scale(1.15) rotate(5deg)",
                                bg: "rgba(236, 72, 153, 0.2)",
                                borderColor: "pink.400",
                                color: "pink.300"
                              }}
                              transition="all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                            >
                              <social.icon size={22} aria-hidden />
                            </Box>
                          </MagneticButton>
                        ))}
                      </HStack>
                    </MotionBox>
                  </VStack>
                </Box>
              </MotionBox>
            </ScrollAnimationWrapper>

            {/* ✨ Cute Skills Section ✨ */}
            <ParallaxElement speed={0.3}>
              <Box
                position="relative"
                mb={16}
                w="100%"
              >
                {/* Section Header with cute decorations */}
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  textAlign="center"
                  mb={12}
                  w="100%"
                >
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
                    mb={4}
                  >
                    <Text fontSize="sm" color="pink.300" whiteSpace="nowrap">
                      {t('home.skillsSection.badge')}
                    </Text>
                  </Box>
                  <Heading
                    fontSize={{ base: "2xl", md: "4xl" }}
                    fontFamily="heading"
                    bgGradient="linear(to-r, pink.400, purple.400)"
                    bgClip="text"
                    mb={3}
                  >
                    {t('home.skillsSection.heading')}
                  </Heading>
                  <Text
                    color="gray.400"
                    fontSize="lg"
                    maxW="800px"
                    mx="auto"
                  >
                    {t('home.skillsSection.subheading')}
                  </Text>
                </MotionBox>

                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={{ base: 4, md: 6, lg: 8 }}
                  w="100%"
                >
                  {skills.map((skill, index) => (
                    <TiltCard key={index} tiltStrength={6}>
                      <MotionBox
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                      >
                        <Box
                          bg="rgba(26, 32, 44, 0.7)"
                          backdropFilter="blur(10px)"
                          borderRadius="24px"
                          p={6}
                          height="100%"
                          border="1px solid"
                          borderColor="rgba(254, 128, 160, 0.2)"
                          position="relative"
                          overflow="hidden"
                          _hover={{
                            borderColor: "pink.400",
                            boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)",
                          }}
                          transition="all 0.3s ease"
                        >
                          {/* Cute gradient top border */}
                          <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            h="3px"
                            bgGradient="linear(to-r, pink.400, purple.400, pink.300)"
                            borderTopRadius="24px"
                          />

                          {/* Corner sparkle */}
                          {mounted && (
                            <Box
                              position="absolute"
                              top={3}
                              right={3}
                              fontSize="sm"
                              opacity={0.5}
                              animation={`${sparkleAnimation} 2s ease-in-out ${index * 0.2}s infinite`}
                            >
                              ✦
                            </Box>
                          )}

                          <VStack spacing={4} align="start" height="100%">
                            {/* Cute icon container */}
                            <Box
                              w="60px"
                              h="60px"
                              borderRadius="16px"
                              bg="rgba(236, 72, 153, 0.15)"
                              border="2px solid"
                              borderColor="rgba(236, 72, 153, 0.3)"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              fontSize="2xl"
                              position="relative"
                            >
                              {skill.icon}
                              {/* Floating ring */}
                              <Box
                                position="absolute"
                                top="-4px"
                                right="-4px"
                                w="16px"
                                h="16px"
                                borderRadius="full"
                                bg="pink.400"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="8px"
                                color="white"
                              >
                                ♡
                              </Box>
                            </Box>

                            <Heading
                              size="md"
                              color="white"
                              fontFamily="heading"
                              position="relative"
                            >
                              {skill.title}
                            </Heading>

                            <Text
                              color="gray.400"
                              lineHeight="tall"
                              fontSize="sm"
                              flex={1}
                            >
                              {skill.description}
                            </Text>

                            {/* Cute tech tags */}
                            <HStack spacing={2} wrap="wrap" pt={2}>
                              {(Array.isArray(skill.techs) ? skill.techs : []).map((tech, i) => (
                                <Box
                                  key={i}
                                  px={3}
                                  py={1}
                                  bg="rgba(236, 72, 153, 0.1)"
                                  color="pink.300"
                                  fontSize="xs"
                                  borderRadius="full"
                                  fontWeight="600"
                                  border="1px solid"
                                  borderColor="rgba(236, 72, 153, 0.3)"
                                  _hover={{
                                    bg: "rgba(236, 72, 153, 0.2)",
                                    borderColor: "pink.400",
                                  }}
                                  transition="all 0.2s ease"
                                >
                                  {tech}
                                </Box>
                              ))}
                            </HStack>
                          </VStack>
                        </Box>
                      </MotionBox>
                    </TiltCard>
                  ))}
                </SimpleGrid>
              </Box>
            </ParallaxElement>

            {/* ✨ Cute Timeline Section ✨ */}
            <Box position="relative" mb={20} mt= {50} >
              {/* Cute Section Header */}
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                textAlign="center"
                mb={10}
              >
                <Box
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  px={4}
                  py={2}
                  bg="rgba(167, 139, 250, 0.1)"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="purple.400"
                  mb={4}
                >
                  <Text fontSize="sm" color="purple.300">{t('home.timelineSection.badge')}</Text>
                </Box>
                <Heading
                  fontSize={{ base: "2xl", md: "4xl" }}
                  fontFamily="heading"
                  bgGradient="linear(to-r, purple.400, pink.400)"
                  bgClip="text"
                  mb={3}
                >
                  {t('home.timelineSection.heading')}
                </Heading>
                <Text color="gray.400" fontSize="lg">
                  {t('home.timelineSection.subheading')}
                </Text>
              </MotionBox>

              {/* Timeline with clean wrapper */}
              <Box
                bg="rgba(26, 32, 44, 0.5)"
                backdropFilter="blur(10px)"
                borderRadius="32px"
                p={{ base: 4, md: 8 }}
                border="1px solid"
                borderColor="rgba(167, 139, 250, 0.2)"
                position="relative"
                overflow="hidden"
              >
                <ElegantTimeline items={timelineItems} />
              </Box>
            </Box>

            {/* ✨ Cute Call to Action Section ✨ */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              textAlign="center"
              py={16}
              position="relative"
            >
              {/* Floating decorations */}
              {mounted && (
                <>
                  <Box
                    position="absolute"
                    top="10%"
                    left="5%"
                    fontSize="2xl"
                    animation={`${floatAnimation} 4s ease-in-out infinite`}
                    opacity={0.3}
                  >
                    💖
                  </Box>
                  <Box
                    position="absolute"
                    top="20%"
                    right="8%"
                    fontSize="xl"
                    animation={`${sparkleAnimation} 3s ease-in-out 0.5s infinite`}
                    opacity={0.4}
                  >
                    ✨
                  </Box>
                  <Box
                    position="absolute"
                    bottom="15%"
                    left="10%"
                    fontSize="lg"
                    animation={`${floatAnimation} 3.5s ease-in-out 1s infinite`}
                    opacity={0.3}
                  >
                    🌸
                  </Box>
                  <Box
                    position="absolute"
                    bottom="25%"
                    right="5%"
                    fontSize="xl"
                    animation={`${sparkleAnimation} 2.5s ease-in-out 0.3s infinite`}
                    opacity={0.4}
                  >
                    ⭐
                  </Box>
                </>
              )}

              <Box
                bg="rgba(26, 32, 44, 0.6)"
                backdropFilter="blur(20px)"
                borderRadius="40px"
                p={{ base: 8, md: 16 }}
                border="2px solid"
                borderColor="rgba(236, 72, 153, 0.3)"
                position="relative"
                overflow="hidden"
                _hover={{
                  borderColor: "pink.400",
                  boxShadow: "0 30px 60px rgba(236, 72, 153, 0.2)",
                }}
                transition="all 0.4s ease"
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

                {/* Cute bottom decoration */}
                <Box
                  position="absolute"
                  bottom={0}
                  left="20%"
                  right="20%"
                  h="4px"
                  bgGradient="linear(to-r, transparent, purple.400, pink.400, purple.400, transparent)"
                  borderBottomRadius="40px"
                />

                <VStack spacing={8}>
                  {/* Cute badge */}
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
                    <Text fontSize="sm" color="pink.300">{t('home.ctaSection.badge')}</Text>
                  </Box>

                  <Heading
                    fontSize={{ base: "2xl", md: "4xl" }}
                    fontFamily="heading"
                    color="white"
                    position="relative"
                  >
                    <Box
                      as="span"
                      bgGradient="linear(135deg, #ff6b9d 0%, #c44569 25%, #f8a5c2 50%, #a855f7 75%, #ff6b9d 100%)"
                      bgSize="200% 200%"
                      bgClip="text"
                      animation={`${gradientShift} 4s ease infinite`}
                    >
                      {t('home.ctaSection.heading')}
                    </Box>
                  </Heading>

                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color="gray.300"
                    maxW="550px"
                    lineHeight="tall"
                  >
                    {t('home.ctaSection.body')}
                  </Text>

                  <HStack spacing={{ base: 3, md: 6 }} flexWrap="wrap" justify="center" pt={4}>
                    <MagneticButton magnetStrength={0.2}>
                      <ElegantButton
                        as={NextLink}
                        href="/contact"
                        variant="elegant"
                        size="lg"
                        px={{ base: 6, md: 10 }}
                        _hover={{
                          transform: "translateY(-3px)",
                          boxShadow: "0 15px 35px rgba(236, 72, 153, 0.4)"
                        }}
                      >
                        {t('home.ctaSection.startProject')}
                      </ElegantButton>
                    </MagneticButton>

                    <MagneticButton magnetStrength={0.15}>
                      <ElegantButton
                        as="a"
                        href="https://drive.google.com/file/d/1oWOw_YBpAOkuspCKvnnyOlLTcXwI-dmG/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="lg"
                        px={{ base: 6, md: 10 }}
                        _hover={{
                          bg: "rgba(167, 139, 250, 0.1)",
                          borderColor: "purple.400"
                        }}
                      >
                        {t('home.resumeButton')}
                      </ElegantButton>
                    </MagneticButton>
                  </HStack>

                  {/* Cute social reminder */}
                  <Box pt={4}>
                    <Text fontSize="sm" color="gray.500">
                      {t('home.ctaSection.socialHint')}
                    </Text>
                    <HStack spacing={3} justify="center" mt={3}>
                      {socialLinks.map((social) => (
                        <Box
                          key={social.label}
                          as={Link}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          p={2}
                          borderRadius="full"
                          color="gray.400"
                          _hover={{
                            color: "pink.400",
                            transform: "scale(1.2)",
                          }}
                          transition="all 0.3s ease"
                        >
                          <social.icon size={18} aria-hidden />
                        </Box>
                      ))}
                    </HStack>
                  </Box>
                </VStack>
              </Box>
            </MotionBox>
          </ResponsiveContainer>
        </ElegantBackground>
      </Layout>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  }
}

export default Home
