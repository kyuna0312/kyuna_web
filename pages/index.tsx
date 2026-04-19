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
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import {
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoYoutube,
} from 'react-icons/io5'
import { SiDiscord } from 'react-icons/si'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config'
import {
  ElegantBackground,
  ElegantTimeline,
  ElegantTimelineItem,
} from '../components/elegant-elements'
import {
  ResponsiveContainer,
} from '../components/responsive-design-system'
import SEOHead from '../components/seo-head'
import { CriticalCSS } from '../components/performance-optimization'
import { motion } from 'framer-motion'
import { MagicArrayDouble, MagicArray } from '../components/magic-array'
import { SectionHeader } from '../components/advanced-theme-elements'

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

const ScrollAnimationWrapper = dynamic(
  () => import('../components/advanced-animations').then(mod => mod.ScrollAnimationWrapper),
  { ssr: false }
)

const MotionBox = motion(Box)

const crystalline = { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }

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

  return (
    <>
      <SEOHead title={t('home.seoTitle')} description={t('home.seoDescription')} />
      <CriticalCSS />

      <Layout>
        <ElegantBackground>
          <ResponsiveContainer maxWidth={{ base: '100%', xl: '1400px' }} paddingTop={20}>

            {/* ── Hero ─────────────────────────────────────────── */}
            <ScrollAnimationWrapper>
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                mb={24}
              >
                <Box
                  display={{ base: 'block', lg: 'flex' }}
                  alignItems="stretch"
                  minH={{ base: 'auto', lg: '85vh' }}
                  position="relative"
                  gap={0}
                >
                  {/* Left: Text Content */}
                  <VStack
                    align="start"
                    spacing={6}
                    flex="1"
                    justify="center"
                    py={{ base: 12, lg: 0 }}
                    pr={{ base: 0, lg: 10 }}
                    position="relative"
                    zIndex={2}
                  >
                    {/* Background magic array */}
                    {mounted && (
                      <Box
                        position="absolute"
                        top="50%"
                        left="-60px"
                        transform="translateY(-50%)"
                        pointerEvents="none"
                        zIndex={0}
                      >
                        <MagicArrayDouble size="xl" opacity={0.12} />
                      </Box>
                    )}

                    {/* Terminal badge */}
                    <MotionBox
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...crystalline, delay: 0.3 }}
                      position="relative"
                      zIndex={1}
                    >
                      <Box
                        display="inline-flex"
                        alignItems="center"
                        gap={2}
                        px={3}
                        py={1}
                        bg="rgba(13, 21, 37, 0.8)"
                        border="1px solid #1e2d42"
                        fontSize="xs"
                        color="#4db8d4"
                        fontFamily="mono"
                        letterSpacing="0.04em"
                      >
                        <Box as="span" color="#c4a55a">%</Box>
                        <Box as="span">{t('home.welcomeBadge')}</Box>
                        <Box
                          as="span"
                          display="inline-block"
                          w="1px"
                          h="12px"
                          bg="#4db8d4"
                          style={{ animation: 'pulse 1.2s ease-in-out infinite' }}
                        />
                      </Box>
                    </MotionBox>

                    {/* Main title */}
                    <MotionBox
                      initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      transition={{ ...crystalline, delay: 0.5 }}
                      position="relative"
                      zIndex={1}
                    >
                      <Heading
                        as="h1"
                        fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
                        fontFamily="heading"
                        fontWeight="700"
                        letterSpacing="0.04em"
                        lineHeight="1"
                        mb={0}
                      >
                        <Box
                          as="span"
                          bgGradient="linear(135deg, #e8eef4 0%, #4db8d4 40%, #e8eef4 70%, #c4a55a 100%)"
                          bgSize="200% 200%"
                          bgClip="text"
                          style={{ animation: 'gradient 6s ease infinite' }}
                          display="block"
                        >
                          {t('home.title')}
                        </Box>
                      </Heading>
                    </MotionBox>

                    {/* Subtitle */}
                    <MotionBox
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...crystalline, delay: 0.65 }}
                      position="relative"
                      zIndex={1}
                    >
                      <Text
                        fontSize={{ base: 'sm', md: 'md' }}
                        color="#7899b0"
                        letterSpacing="0.1em"
                        textTransform="uppercase"
                        fontWeight="400"
                      >
                        {t('home.subtitle')}
                      </Text>
                    </MotionBox>

                    {/* Description */}
                    <MotionBox
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...crystalline, delay: 0.75 }}
                      position="relative"
                      zIndex={1}
                    >
                      <Text
                        fontSize={{ base: 'md', md: 'lg' }}
                        color="#4a6580"
                        lineHeight="tall"
                        maxW="480px"
                      >
                        {t('home.description')}
                      </Text>
                    </MotionBox>

                    {/* Pillar stats */}
                    {pillars.length > 0 && (
                      <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...crystalline, delay: 0.85 }}
                        w="100%"
                        maxW="500px"
                        position="relative"
                        zIndex={1}
                      >
                        <SimpleGrid columns={3} spacing={0}>
                          {pillars.map((pillar, idx) => (
                            <Box
                              key={idx}
                              px={4}
                              py={3}
                              borderRight={idx < pillars.length - 1 ? '1px solid #1e2d42' : undefined}
                              borderBottom="1px solid #1e2d42"
                              borderTop="1px solid #1e2d42"
                              borderLeft={idx === 0 ? '1px solid #1e2d42' : undefined}
                            >
                              <Text
                                fontWeight="600"
                                color="#4db8d4"
                                fontSize="xs"
                                mb={1}
                                letterSpacing="0.06em"
                                textTransform="uppercase"
                              >
                                {pillar.title}
                              </Text>
                              <Text fontSize="xs" color="#4a6580" lineHeight="short">
                                {pillar.body}
                              </Text>
                            </Box>
                          ))}
                        </SimpleGrid>
                      </MotionBox>
                    )}

                    {/* Build tree */}
                    <MotionBox
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...crystalline, delay: 0.95 }}
                      w="100%"
                      maxW="500px"
                      position="relative"
                      zIndex={1}
                    >
                      <Box
                        px={4}
                        py={3}
                        bg="rgba(8, 12, 20, 0.8)"
                        border="1px solid #1e2d42"
                        fontFamily="mono"
                        fontSize="xs"
                        color="#4db8d4"
                        lineHeight="tall"
                        whiteSpace="pre-wrap"
                        aria-label={t('home.buildSectionAria')}
                      >
                        <Text as="span" color="#4a6580" display="block" mb={1}>
                          {t('home.buildSectionTitle')}
                        </Text>
                        {t('home.buildTree')}
                      </Box>
                    </MotionBox>

                    {/* CTA buttons */}
                    <MotionBox
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...crystalline, delay: 1.05 }}
                      position="relative"
                      zIndex={1}
                    >
                      <HStack spacing={3} flexWrap="wrap">
                        <MagneticButton magnetStrength={0.15}>
                          <Box
                            as={NextLink}
                            href="/projects"
                            display="inline-flex"
                            alignItems="center"
                            gap={2}
                            px={5}
                            py={2}
                            border="1px solid #4db8d4"
                            color="#4db8d4"
                            fontSize="xs"
                            fontFamily="mono"
                            letterSpacing="0.08em"
                            textTransform="uppercase"
                            textDecoration="none"
                            bg="transparent"
                            transition="all 0.2s ease"
                            _hover={{
                              bg: 'rgba(77, 184, 212, 0.08)',
                              boxShadow: '0 4px 20px rgba(77, 184, 212, 0.2)',
                              transform: 'translateY(-2px)',
                            }}
                          >
                            {t('home.viewProjects')}
                          </Box>
                        </MagneticButton>

                        <MagneticButton magnetStrength={0.12}>
                          <Box
                            as={NextLink}
                            href="/contact"
                            display="inline-flex"
                            alignItems="center"
                            gap={2}
                            px={5}
                            py={2}
                            border="1px solid #1e2d42"
                            color="#7899b0"
                            fontSize="xs"
                            fontFamily="mono"
                            letterSpacing="0.08em"
                            textTransform="uppercase"
                            textDecoration="none"
                            bg="transparent"
                            transition="all 0.2s ease"
                            _hover={{
                              borderColor: '#4db8d4',
                              color: '#4db8d4',
                              bg: 'rgba(77, 184, 212, 0.04)',
                              transform: 'translateY(-2px)',
                            }}
                          >
                            {t('home.hireMe')}
                          </Box>
                        </MagneticButton>

                        <MagneticButton magnetStrength={0.12}>
                          <Box
                            as="a"
                            href="https://github.com/kyuna0312"
                            target="_blank"
                            rel="noopener noreferrer"
                            display="inline-flex"
                            alignItems="center"
                            gap={2}
                            px={5}
                            py={2}
                            border="1px solid #c4a55a"
                            color="#c4a55a"
                            fontSize="xs"
                            fontFamily="mono"
                            letterSpacing="0.08em"
                            textTransform="uppercase"
                            textDecoration="none"
                            bg="transparent"
                            transition="all 0.2s ease"
                            _hover={{
                              bg: 'rgba(196, 165, 90, 0.08)',
                              boxShadow: '0 4px 20px rgba(196, 165, 90, 0.2)',
                              transform: 'translateY(-2px)',
                            }}
                          >
                            <IoLogoGithub size={13} />
                            {t('navigation.github')}
                          </Box>
                        </MagneticButton>
                      </HStack>
                    </MotionBox>

                    {/* Social icons */}
                    <MotionBox
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...crystalline, delay: 1.15 }}
                      position="relative"
                      zIndex={1}
                    >
                      <HStack spacing={2}>
                        {socialLinks.map((social) => (
                          <Box
                            key={social.label}
                            as={Link}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            p={2}
                            border="1px solid #1e2d42"
                            color="#4a6580"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            transition="all 0.2s ease"
                            _hover={{
                              color: '#4db8d4',
                              borderColor: '#4db8d4',
                              bg: 'rgba(77, 184, 212, 0.06)',
                              transform: 'translateY(-2px)',
                            }}
                          >
                            <social.icon size={16} aria-hidden />
                          </Box>
                        ))}
                      </HStack>
                    </MotionBox>
                  </VStack>

                  {/* Right: Layered Photo Composition */}
                  <MotionBox
                    flex="0 0 42%"
                    position="relative"
                    display={{ base: 'none', lg: 'block' }}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...crystalline, delay: 0.4 }}
                    overflow="hidden"
                    minH="85vh"
                  >
                    {/* Background photo — blurred/dimmed */}
                    <Box
                      position="absolute"
                      inset={0}
                      overflow="hidden"
                      _before={{
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        bg: 'linear-gradient(to right, #080c14 0%, transparent 30%)',
                        zIndex: 1,
                        pointerEvents: 'none',
                      }}
                    >
                      <Box
                        as="img"
                        src="/images/ig-photo-2.jpg"
                        alt=""
                        aria-hidden="true"
                        position="absolute"
                        inset={0}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        objectPosition="center top"
                        style={{ filter: 'blur(3px) brightness(0.35) saturate(0.7)' }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </Box>

                    {/* Foreground photo — sharp, centered */}
                    <Box
                      position="absolute"
                      bottom={0}
                      left="50%"
                      transform="translateX(-50%)"
                      w="78%"
                      zIndex={2}
                      overflow="hidden"
                      border="1px solid rgba(77, 184, 212, 0.2)"
                      boxShadow="0 0 40px rgba(77, 184, 212, 0.12), 0 40px 80px rgba(0, 0, 0, 0.6)"
                      style={{ clipPath: 'polygon(0 8%, 100% 0%, 100% 100%, 0% 100%)' }}
                    >
                      <Box
                        as="img"
                        src="/images/ig-photo-1.jpg"
                        alt={t('home.imageAlt')}
                        w="100%"
                        style={{ display: 'block' }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = '/images/霜花.png'
                        }}
                      />
                    </Box>

                    {/* Third photo — small floating card top-right */}
                    {mounted && (
                      <Box
                        position="absolute"
                        top="8%"
                        right="5%"
                        w="30%"
                        zIndex={3}
                        border="1px solid #1e2d42"
                        boxShadow="0 8px 32px rgba(0, 0, 0, 0.5)"
                        overflow="hidden"
                        style={{ animation: 'float 8s ease-in-out infinite' }}
                      >
                        <Box
                          as="img"
                          src="/images/ig-photo-3.jpg"
                          alt=""
                          aria-hidden="true"
                          w="100%"
                          style={{ display: 'block' }}
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = '/images/maya.png'
                          }}
                        />
                      </Box>
                    )}

                    {/* Array decoration overlay */}
                    {mounted && (
                      <Box
                        position="absolute"
                        top="8%"
                        left="5%"
                        zIndex={2}
                        pointerEvents="none"
                      >
                        <MagicArray size="md" opacity={0.2} color="#4db8d4" animate />
                      </Box>
                    )}

                    {/* Left gradient fade to page bg */}
                    <Box
                      position="absolute"
                      inset={0}
                      zIndex={3}
                      pointerEvents="none"
                      bg="linear-gradient(to right, #080c14 0%, transparent 25%)"
                    />
                    {/* Bottom fade */}
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      h="120px"
                      zIndex={4}
                      pointerEvents="none"
                      bg="linear-gradient(to top, #080c14 0%, transparent 100%)"
                    />
                  </MotionBox>

                  {/* Mobile: profile image fallback */}
                  <MotionBox
                    display={{ base: 'flex', lg: 'none' }}
                    justifyContent="center"
                    mb={8}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...crystalline, delay: 0.4 }}
                  >
                    <Box
                      w="200px"
                      h="200px"
                      overflow="hidden"
                      border="1px solid #1e2d42"
                      boxShadow="0 0 30px rgba(77, 184, 212, 0.1)"
                      position="relative"
                    >
                      <Box
                        as="img"
                        src="/images/ig-photo-1.jpg"
                        alt={t('home.imageAlt')}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = '/images/霜花.png'
                        }}
                      />
                    </Box>
                  </MotionBox>
                </Box>
              </MotionBox>
            </ScrollAnimationWrapper>

            {/* ── Skills ───────────────────────────────────────── */}
            <ParallaxElement speed={0.2}>
              <Box position="relative" mb={20} w="100%">
                <SectionHeader
                  subtitle={t('home.skillsSection.subheading')}
                  delay={0}
                >
                  {t('home.skillsSection.heading')}
                </SectionHeader>

                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={{ base: 4, md: 5 }}
                  w="100%"
                >
                  {skills.map((skill, index) => (
                    <TiltCard key={index} tiltStrength={5}>
                      <MotionBox
                        initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ ...crystalline, delay: index * 0.07 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                        height="100%"
                      >
                        <Box
                          bg="#0d1525"
                          border="1px solid #1e2d42"
                          p={6}
                          height="100%"
                          position="relative"
                          overflow="hidden"
                          transition="all 0.25s ease"
                          _hover={{
                            borderColor: 'rgba(77, 184, 212, 0.3)',
                            boxShadow: '0 8px 32px rgba(77, 184, 212, 0.08)',
                          }}
                        >
                          {/* Ice accent top line */}
                          <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            h="1px"
                            bgGradient="linear(to-r, transparent, #4db8d4, transparent)"
                            opacity={0.5}
                          />

                          <VStack spacing={4} align="start" height="100%">
                            {/* Icon */}
                            <Box
                              w="48px"
                              h="48px"
                              border="1px solid #1e2d42"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              fontSize="xl"
                              bg="rgba(13, 21, 37, 0.8)"
                            >
                              {skill.icon}
                            </Box>

                            <Heading
                              size="sm"
                              color="#e8eef4"
                              fontFamily="heading"
                              letterSpacing="0.06em"
                            >
                              {skill.title}
                            </Heading>

                            <Text
                              color="#4a6580"
                              lineHeight="tall"
                              fontSize="sm"
                              flex={1}
                            >
                              {skill.description}
                            </Text>

                            {/* Tech tags */}
                            <HStack spacing={2} wrap="wrap" pt={1}>
                              {(Array.isArray(skill.techs) ? skill.techs : []).map((tech, i) => (
                                <Box
                                  key={i}
                                  px={2}
                                  py={0.5}
                                  bg="rgba(13, 21, 37, 0.9)"
                                  color="#4db8d4"
                                  fontSize="xs"
                                  border="1px solid #1e2d42"
                                  fontFamily="mono"
                                  letterSpacing="0.04em"
                                  transition="all 0.2s ease"
                                  _hover={{ borderColor: '#4db8d4' }}
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

            {/* ── Timeline ─────────────────────────────────────── */}
            <Box position="relative" mb={20} mt={8}>
              <SectionHeader
                subtitle={t('home.timelineSection.subheading')}
                delay={0}
                gradient="linear(to-r, #c4a55a, #4db8d4)"
              >
                {t('home.timelineSection.heading')}
              </SectionHeader>

              <Box
                bg="rgba(8, 12, 20, 0.6)"
                border="1px solid #1e2d42"
                p={{ base: 6, md: 10 }}
                position="relative"
                overflow="hidden"
              >
                {/* Corner array decoration */}
                {mounted && (
                  <Box
                    position="absolute"
                    bottom="-30px"
                    right="-30px"
                    pointerEvents="none"
                    opacity={0.08}
                  >
                    <MagicArray size="lg" opacity={1} animate />
                  </Box>
                )}
                <ElegantTimeline>
                  {timelineItems.map((item, i) => (
                    <ElegantTimelineItem
                      key={i}
                      year={item.year}
                      title={item.title}
                      description={item.description}
                      delay={i * 0.1}
                    />
                  ))}
                </ElegantTimeline>
              </Box>
            </Box>

            {/* ── CTA ──────────────────────────────────────────── */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...crystalline, delay: 0.2 }}
              viewport={{ once: true }}
              textAlign="center"
              py={16}
              mb={8}
            >
              <Box
                bg="rgba(8, 12, 20, 0.8)"
                border="1px solid #1e2d42"
                p={{ base: 8, md: 16 }}
                position="relative"
                overflow="hidden"
                transition="all 0.3s ease"
                _hover={{
                  borderColor: 'rgba(77, 184, 212, 0.25)',
                  boxShadow: '0 20px 60px rgba(77, 184, 212, 0.06)',
                }}
              >
                {/* Top accent line */}
                <Box
                  position="absolute"
                  top={0}
                  left="15%"
                  right="15%"
                  h="1px"
                  bgGradient="linear(to-r, transparent, #4db8d4, #c4a55a, transparent)"
                />
                {/* Bottom accent line */}
                <Box
                  position="absolute"
                  bottom={0}
                  left="15%"
                  right="15%"
                  h="1px"
                  bgGradient="linear(to-r, transparent, #c4a55a, #4db8d4, transparent)"
                />

                {/* Corner bracket marks */}
                {mounted && (
                  <>
                    <Text position="absolute" top={3} left={4} color="#1e2d42" fontSize="lg" fontFamily="mono">⌐</Text>
                    <Text position="absolute" top={3} right={4} color="#1e2d42" fontSize="lg" fontFamily="mono" transform="scaleX(-1)">⌐</Text>
                    <Text position="absolute" bottom={3} left={4} color="#1e2d42" fontSize="lg" fontFamily="mono" transform="scaleY(-1)">⌐</Text>
                    <Text position="absolute" bottom={3} right={4} color="#1e2d42" fontSize="lg" fontFamily="mono" transform="scale(-1)">⌐</Text>
                  </>
                )}

                <VStack spacing={8}>
                  {/* Badge */}
                  <Box
                    display="inline-flex"
                    alignItems="center"
                    px={3}
                    py={1}
                    border="1px solid #1e2d42"
                    fontSize="xs"
                    color="#4db8d4"
                    fontFamily="mono"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                  >
                    {t('home.ctaSection.badge')}
                  </Box>

                  <Heading
                    fontSize={{ base: '2xl', md: '4xl' }}
                    fontFamily="heading"
                    letterSpacing="0.04em"
                  >
                    <Box
                      as="span"
                      bgGradient="linear(135deg, #e8eef4 0%, #4db8d4 40%, #c4a55a 70%, #e8eef4 100%)"
                      bgSize="200% 200%"
                      bgClip="text"
                      style={{ animation: 'gradient 6s ease infinite' }}
                    >
                      {t('home.ctaSection.heading')}
                    </Box>
                  </Heading>

                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    color="#4a6580"
                    maxW="500px"
                    lineHeight="tall"
                  >
                    {t('home.ctaSection.body')}
                  </Text>

                  <HStack spacing={4} flexWrap="wrap" justify="center" pt={2}>
                    <MagneticButton magnetStrength={0.15}>
                      <Box
                        as={NextLink}
                        href="/contact"
                        display="inline-flex"
                        alignItems="center"
                        gap={2}
                        px={6}
                        py={3}
                        border="1px solid #4db8d4"
                        color="#4db8d4"
                        fontSize="xs"
                        fontFamily="mono"
                        letterSpacing="0.1em"
                        textTransform="uppercase"
                        textDecoration="none"
                        bg="transparent"
                        transition="all 0.2s ease"
                        _hover={{
                          bg: 'rgba(77, 184, 212, 0.08)',
                          boxShadow: '0 4px 24px rgba(77, 184, 212, 0.2)',
                          transform: 'translateY(-2px)',
                        }}
                      >
                        {t('home.ctaSection.startProject')}
                      </Box>
                    </MagneticButton>

                    <MagneticButton magnetStrength={0.12}>
                      <Box
                        as="a"
                        href="https://drive.google.com/file/d/1oWOw_YBpAOkuspCKvnnyOlLTcXwI-dmG/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        display="inline-flex"
                        alignItems="center"
                        gap={2}
                        px={6}
                        py={3}
                        border="1px solid #c4a55a"
                        color="#c4a55a"
                        fontSize="xs"
                        fontFamily="mono"
                        letterSpacing="0.1em"
                        textTransform="uppercase"
                        textDecoration="none"
                        bg="transparent"
                        transition="all 0.2s ease"
                        _hover={{
                          bg: 'rgba(196, 165, 90, 0.08)',
                          boxShadow: '0 4px 24px rgba(196, 165, 90, 0.2)',
                          transform: 'translateY(-2px)',
                        }}
                      >
                        {t('home.resumeButton')}
                      </Box>
                    </MagneticButton>
                  </HStack>

                  {/* Social icons row */}
                  <Box pt={2}>
                    <Text fontSize="xs" color="#2a3a4e" letterSpacing="0.1em" mb={4}>
                      {t('home.ctaSection.socialHint')}
                    </Text>
                    <HStack spacing={2} justify="center">
                      {socialLinks.map((social) => (
                        <Box
                          key={social.label}
                          as={Link}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          p={2}
                          border="1px solid #1e2d42"
                          color="#4a6580"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          transition="all 0.2s ease"
                          _hover={{
                            color: '#4db8d4',
                            borderColor: '#4db8d4',
                            bg: 'rgba(77, 184, 212, 0.04)',
                            transform: 'translateY(-2px)',
                          }}
                        >
                          <social.icon size={15} aria-hidden />
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
