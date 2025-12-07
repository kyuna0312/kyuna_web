import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import {
  Link,
  Box,
  Text,
  VStack,
  SimpleGrid,
  Heading,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import OptimizedImage from '../components/optimized-image-v2'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  ElegantBackground,
  ElegantButton,
  ElegantTimeline,
} from '../components/elegant-elements'
import { SectionHeader, GlassCard } from '../components/advanced-theme-elements'
import {
  ResponsiveContainer,
} from '../components/responsive-design-system'
import {
  SEOHead,
  CriticalCSS
} from '../components/performance-optimization'
import { motion } from 'framer-motion'

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

  const timelineItems = [
    {
      year: '2000',
      title: t('home.timeline.2000'),
      description: 'Beginning of my journey'
    },
    {
      year: '2019',
      title: t('home.timeline.2019'),
      description: 'Started programming journey'
    },
    {
      year: '2021',
      title: t('home.timeline.2021'),
      description: 'Advanced programming skills'
    },
    {
      year: '2023',
      title: t('home.timeline.2023-01'),
      description: 'Professional development milestone'
    },
    {
      year: '2023',
      title: t('home.timeline.2023-02'),
      description: 'Current position and growth'
    }
  ]

  const socialLinks = [
    { icon: IoLogoGithub, href: 'https://github.com/kyuna312' },
    { icon: IoLogoTwitter, href: 'https://twitter.com/m1or3n' },
    { icon: IoLogoInstagram, href: 'https://instagram.com/m1or3n' },
  ]

  const skills = [
    {
      icon: "💻",
      title: "Frontend Development",
      description: "Creating stunning, responsive interfaces with React, Next.js, and modern CSS frameworks.",
      techs: ["React", "Next.js", "TypeScript", "Chakra UI"]
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Designing beautiful, intuitive experiences that users love and remember.",
      techs: ["Figma", "Adobe XD", "Framer", "Design Systems"]
    },
    {
      icon: "🚀",
      title: "Performance",
      description: "Optimizing applications for blazing fast load times and smooth interactions.",
      techs: ["Web Vitals", "PWA", "SEO", "Accessibility"]
    },
    {
      icon: "🌐",
      title: "Full Stack",
      description: "Building complete solutions from database to deployment.",
      techs: ["Node.js", "MongoDB", "PostgreSQL", "AWS"]
    },
    {
      icon: "📱",
      title: "Mobile First",
      description: "Creating responsive designs that work perfectly on any device.",
      techs: ["React Native", "Flutter", "Progressive Web Apps"]
    },
    {
      icon: "⚡",
      title: "Modern Tools",
      description: "Leveraging cutting-edge tools for efficient development workflows.",
      techs: ["Vite", "Docker", "GitHub Actions", "Vercel"]
    }
  ]

  // Color mode values - called at top level to avoid hooks in callbacks
  const textColor = useColorModeValue("gray.600", "gray.300")
  const headingColor = useColorModeValue("gray.800", "white")
  const socialBg = useColorModeValue("white", "gray.800")

  return (
    <>
      <SEOHead
        title="Kyuna | Creative Developer & Designer"
        description="Portfolio of Kyuna - Creative developer specializing in elegant web experiences with modern technologies, animations, and interactive design."
        keywords="creative developer, web designer, portfolio, react, next.js, framer motion, ui/ux, interactive design"
      />
      <CriticalCSS />

      <Layout>
        <ElegantBackground>
          <ConstellationBackground />
          <ResponsiveContainer maxWidth={{ base: '100%', xl: '1400px' }} paddingTop={20}>

            {/* Enhanced Hero Section */}
            <ScrollAnimationWrapper>
              <MotionBox
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                mb={20}
              >
                <Box
                  display={{ lg: 'flex' }}
                  alignItems="center"
                  gap={16}
                  minH="70vh"
                >
                  {/* Profile Image with Enhanced 3D Tilt */}
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
                          width={{ base: "200px", md: "300px" }}
                          height={{ base: "200px", md: "300px" }}
                          position="relative"
                          mx="auto"
                          mb={{ base: 8, lg: 0 }}
                        >
                          {/* Enhanced Floating Ring Effect */}
                          <MotionBox
                            position="absolute"
                            top="-20px"
                            left="-20px"
                            right="-20px"
                            bottom="-20px"
                            border="2px solid"
                            borderColor="feminine.400"
                            borderRadius="full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            opacity={0.3}
                          />

                          <OptimizedImage
                            src="/images/霜花.png"
                            width={300}
                            height={300}
                            alt="Picture of the author"
                            priority={true}
                            style={{
                              borderRadius: '50%',
                              filter: 'drop-shadow(0 20px 40px rgba(236, 72, 153, 0.4))',
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />

                          {/* Floating Particles around Image */}
                          {[...Array(6)].map((_, i) => (
                            <MotionBox
                              key={i}
                              position="absolute"
                              width="8px"
                              height="8px"
                              bg="feminine.400"
                              borderRadius="full"
                              animate={{
                                x: [0, 30 * Math.cos(i * 60 * Math.PI / 180), 0],
                                y: [0, 30 * Math.sin(i * 60 * Math.PI / 180), 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 4,
                                delay: i * 0.3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              style={{
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)"
                              }}
                            />
                          ))}
                        </Box>
                      </MotionBox>
                    </FloatingActionButton>
                  </TiltCard>

                  {/* Hero Content */}
                  <VStack align="start" spacing={8} flex={1}>
                    <MotionBox
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      <Heading
                        as="h1"
                        fontSize={{ base: "4xl", md: "5xl", lg: "7xl" }}
                        fontFamily="'Playfair Display', serif"
                        fontWeight="bold"
                        bgGradient="linear(to-r, pink.400, rose.400, purple.500)"
                        bgClip="text"
                        lineHeight="shorter"
                        mb={4}
                      >
                        {t('home.title')}
                      </Heading>
                    </MotionBox>

                    <MotionBox
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <Text
                        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                        color={textColor}
                        lineHeight="tall"
                        maxW="600px"
                      >
                        {t('home.description')}
                      </Text>
                    </MotionBox>

                    {/* Animated Call-to-Action */}
                    <HStack spacing={6} mt={8}>
                      <MagneticButton magnetStrength={0.2}>
                        <ElegantButton
                          as={NextLink}
                          href="/projects"
                          variant="elegant"
                          size="lg"
                          rightIcon={<ChevronRightIcon />}
                        >
                          {t('home.viewProjects')}
                        </ElegantButton>
                      </MagneticButton>

                      <MagneticButton magnetStrength={0.15}>
                        <ElegantButton
                          as={NextLink}
                          href="/contact"
                          variant="outline"
                          size="lg"
                        >
                          {t('home.getInTouch')}
                        </ElegantButton>
                      </MagneticButton>
                    </HStack>

                    {/* Enhanced Social Links */}
                    <MotionBox
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1.2 }}
                      mt={8}
                    >
                      <HStack spacing={6}>
                        {socialLinks.map((social, index) => (
                          <MagneticButton key={index} magnetStrength={0.3}>
                            <Box
                              as={Link}
                              href={social.href}
                              target="_blank"
                              p={3}
                              borderRadius="full"
                              bg={socialBg}
                              boxShadow="lg"
                              color="feminine.500"
                              _hover={{
                                transform: "scale(1.1)",
                                boxShadow: "xl",
                                color: "feminine.600"
                              }}
                              transition="all 0.3s ease"
                            >
                              <social.icon size={24} />
                            </Box>
                          </MagneticButton>
                        ))}
                      </HStack>
                    </MotionBox>
                  </VStack>
                </Box>
              </MotionBox>
            </ScrollAnimationWrapper>

            {/* Enhanced Skills Section */}
            <ParallaxElement speed={0.3} direction="vertical">
              <SectionHeader
                delay={1.4}
                subtitle="Technologies I love working with"
              >
                Technical Expertise
              </SectionHeader>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={16}>
                {skills.map((skill, index) => (
                  <TiltCard key={index} tiltStrength={6}>
                    <GlassCard
                      p={8}
                      height="100%"
                      opacity={0.15}
                      borderColor="rgba(236, 72, 153, 0.3)"
                    >
                      <MotionBox
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <VStack spacing={4} align="start" height="100%">
                          <Box fontSize="3xl">{skill.icon}</Box>
                          <Heading
                            size="md"
                            color={headingColor}
                            fontFamily="'Playfair Display', serif"
                          >
                            {skill.title}
                          </Heading>
                          <Text
                            color={textColor}
                            lineHeight="tall"
                            flex={1}
                          >
                            {skill.description}
                          </Text>
                          <HStack spacing={2} wrap="wrap">
                            {skill.techs.map((tech, i) => (
                              <Box
                                key={i}
                                px={2}
                                py={1}
                                bg="feminine.100"
                                color="feminine.600"
                                fontSize="xs"
                                borderRadius="full"
                                fontWeight="medium"
                              >
                                {tech}
                              </Box>
                            ))}
                          </HStack>
                        </VStack>
                      </MotionBox>
                    </GlassCard>
                  </TiltCard>
                ))}
              </SimpleGrid>
            </ParallaxElement>

            {/* Enhanced Timeline Section */}
            <SectionHeader
              delay={1.8}
              subtitle="My journey through code and creativity"
            >
              Professional Journey
            </SectionHeader>

            <GlassCard p={8} mb={16} opacity={0.1}>
              <ElegantTimeline items={timelineItems} />
            </GlassCard>

            {/* Call to Action Section */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              textAlign="center"
              py={20}
            >
              <GlassCard
                p={16}
                textAlign="center"
                opacity={0.2}
                borderColor="rgba(236, 72, 153, 0.4)"
              >
                <VStack spacing={8}>
                  <Heading
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontFamily="'Playfair Display', serif"
                    bgGradient="linear(to-r, pink.400, rose.400)"
                    bgClip="text"
                  >
                    Ready to Create Something Amazing?
                  </Heading>

                  <Text
                    fontSize="lg"
                    color={textColor}
                    maxW="600px"
                  >
                    Let's collaborate and bring your ideas to life with beautiful, functional solutions that make a difference.
                  </Text>

                  <HStack spacing={6}>
                    <MagneticButton magnetStrength={0.2}>
                      <ElegantButton
                        as={NextLink}
                        href="/contact"
                        variant="elegant"
                        size="xl"
                        px={12}
                      >
                        Start a Project
                      </ElegantButton>
                    </MagneticButton>

                    <MagneticButton magnetStrength={0.15}>
                      <ElegantButton
                        as={Link}
                        href="https://drive.google.com/file/d/1oWOw_YBpAOkuspCKvnnyOlLTcXwI-dmG/view?usp=sharing"
                        target="_blank"
                        variant="outline"
                        size="xl"
                        px={12}
                      >
                        View Resume
                      </ElegantButton>
                    </MagneticButton>
                  </HStack>
                </VStack>
              </GlassCard>
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
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Home
