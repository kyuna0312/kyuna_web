import NextLink from 'next/link'
import Image from 'next/image'
import {
  Link,
  Box,
  Text,
  SimpleGrid,
  Heading,
  HStack,
  VStack,
  Button,
  Container,
} from '@chakra-ui/react'
import Layout from '../components/layouts/page'
import { site, socialLinks } from '../lib/site'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config'
import { motion } from 'framer-motion'
import { ShimokaTitle, Eyebrow, CrystalDivider } from '../components/frost'

const MotionBox = motion.create(Box)

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

// Sections render statically — the hero entrance is the page's one animated moment.
const riseInView = {}

// The current English CV (Google Doc). Also linked from the CTA.
const resumeUrl =
  'https://docs.google.com/document/d/1B2Ivgc-ylD-D_m6cEIxxjJcdlO2YDHf6gsNL5v4YxQk/edit'

// Prose lives in the locale files under home.craft.<key>.
const craft = [
  { key: 'fullstack', tech: 'React · Next.js · TypeScript · Node.js · NestJS · Flutter', color: 'ice' },
  { key: 'systems', tech: 'Rust · C/C++ · Lua · Neovim · Linux', color: 'gold' },
  { key: 'backend', tech: 'Java Spring Boot · GraphQL · Elasticsearch · Docker · Kubernetes', color: 'bloom' },
  { key: 'design', tech: 'Figma · Design systems · Responsive UI · Motion', color: 'ice' },
]

// Freelance service areas; prose under home.services.<key>.
const services = ['web', 'mobile', 'backend', 'tooling']

const Home = () => {
  const { t } = useTranslation('common')

  const timelineItems = [
    { year: '2018–2020', text: t('home.timeline.internships') },
    { year: '2021', text: t('home.timeline.2021') },
    { year: '2021–2022', text: t('home.timeline.sodmongol') },
    { year: '2023–2024', text: t('home.timeline.mongolnet') },
    { year: '2025–2026', text: t('home.timeline.brexia') },
    { year: 'now', text: t('home.timeline.now') },
  ]

  return (
    <Layout title={t('home.pageTitle')}>
      {/* ——— Hero: the Magia stage ——— */}
      <Box position="relative" minH={{ base: '76vh', md: '82vh' }} display="flex" alignItems="center" overflow="hidden">
        {/* Washed-out portrait behind the title, like the Homura line art */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w={{ base: '320px', md: '480px' }}
          h={{ base: '380px', md: '560px' }}
          opacity={0.1}
          sx={{
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          }}
          pointerEvents="none"
          aria-hidden="true"
        >
          <Image
            src="/images/maya.png"
            alt=""
            fill
            priority
            sizes="480px"
            style={{ objectFit: 'contain', filter: 'grayscale(30%)' }}
          />
        </Box>

        <Container maxW="container.lg" px={{ base: 4, md: 6 }} position="relative">
          <VStack spacing={6} textAlign="center">
            <MotionBox {...rise(0)}>
              <Box
                display="inline-block"
                bg="pane"
                border="1px solid"
                borderColor="hairline"
                borderRadius="2px"
                px={4}
                py={2}
                fontFamily="mono"
                fontSize="xs"
                color="rime"
              >
                {t('home.greeting')}
              </Box>
            </MotionBox>

            <MotionBox {...rise(0.1)}>
              <Text
                fontFamily="mono"
                fontSize="xs"
                color="rime"
                letterSpacing="0.28em"
                textTransform="uppercase"
              >
                {t('home.location')}
              </Text>
            </MotionBox>

            <MotionBox {...rise(0.25)}>
              <ShimokaTitle />
              <Text
                fontFamily="mono"
                fontSize="sm"
                color="rime"
                letterSpacing="0.24em"
                textTransform="uppercase"
                mt={4}
              >
                {site.handle} — {t('home.frostFlower')}
              </Text>
            </MotionBox>

            <MotionBox {...rise(0.4)}>
              <Heading as="p" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="500" maxW="30ch" mx="auto" mb={4}>
                {t('home.title')}
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} maxW="56ch" mx="auto">
                {t('home.description')}
              </Text>
              <Text mt={3} fontFamily="mono" fontSize="sm" color="rime" opacity={0.85}>
                {t('home.subtitle')}
              </Text>
            </MotionBox>

            <MotionBox {...rise(0.55)}>
              <HStack spacing={4} justify="center" flexWrap="wrap">
                <Button as={NextLink} href="/projects" variant="frost">
                  {t('home.viewProjects')}
                </Button>
                <Button as={NextLink} href="/contact" variant="pane">
                  {t('home.startProject')}
                </Button>
                <Button as="a" href={resumeUrl} target="_blank" variant="pane">
                  {t('home.resumeButton')}
                </Button>
              </HStack>
              <Text mt={5} fontFamily="mono" fontSize="xs" color="ice" letterSpacing="0.08em">
                {t('home.availability')}
              </Text>
              <HStack spacing={7} mt={8} justify="center" flexWrap="wrap">
                {socialLinks.map(social => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    display="inline-flex"
                    alignItems="center"
                    gap="8px"
                    fontFamily="mono"
                    fontSize="sm"
                    color="ice"
                    py={2}
                    _hover={{ color: 'bloom' }}
                  >
                    <social.icon size={16} />
                    {social.label}
                  </Link>
                ))}
              </HStack>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.lg" px={{ base: 4, md: 6 }}>
        {/* ——— Craft ——— */}
        <MotionBox {...riseInView}>
          <Eyebrow kanji="業" color="ice">{t('home.craftLabel')}</Eyebrow>
          <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} mb={10} maxW="24ch">
            {t('home.craftHeading')}
          </Heading>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={12} spacingY={10}>
          {craft.map(item => (
            <MotionBox key={item.key} {...riseInView} pt={5} borderTop="1px solid" borderColor="hairline">
              <Heading as="h3" fontSize="xl" mb={2}>
                {t(`home.craft.${item.key}.title`)}
              </Heading>
              <Text fontSize="sm" mb={3} maxW="46ch">
                {t(`home.craft.${item.key}.description`)}
              </Text>
              <Text fontFamily="mono" fontSize="xs" color={item.color} letterSpacing="0.08em">
                {item.tech}
              </Text>
            </MotionBox>
          ))}
        </SimpleGrid>

        <CrystalDivider my={{ base: 16, md: 24 }} />

        {/* ——— The road ——— */}
        <MotionBox {...riseInView}>
          <Eyebrow kanji="道" color="gold">{t('home.roadLabel')}</Eyebrow>
          <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} mb={10}>
            {t('home.roadHeading')}
          </Heading>
        </MotionBox>

        <Box maxW="640px">
          {timelineItems.map((item, i) => (
            <MotionBox
              key={i}
              {...riseInView}
              display="grid"
              gridTemplateColumns={{ base: '84px 1fr', md: '100px 1fr' }}
              gap={{ base: 4, md: 8 }}
              pb={i === timelineItems.length - 1 ? 0 : 6}
              position="relative"
              _before={
                i === timelineItems.length - 1
                  ? undefined
                  : {
                      content: '""',
                      position: 'absolute',
                      left: { base: '83px', md: '99px' },
                      top: '10px',
                      bottom: 0,
                      width: '1px',
                      bg: 'hairline',
                    }
              }
            >
              <Text
                fontFamily="mono"
                fontSize="sm"
                color={item.year === 'now' ? 'bloom' : 'ice'}
                pt="1px"
              >
                {item.year === 'now' ? t('home.now') : item.year}
              </Text>
              <Text fontSize="sm" pl={{ base: 4, md: 8 }}>
                {item.text}
              </Text>
            </MotionBox>
          ))}
        </Box>

        <CrystalDivider my={{ base: 16, md: 24 }} />

        {/* ——— Services ——— */}
        <MotionBox {...riseInView}>
          <Eyebrow kanji="助" color="ice">{t('home.servicesLabel')}</Eyebrow>
          <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} mb={10} maxW="24ch">
            {t('home.servicesHeading')}
          </Heading>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={12} spacingY={10}>
          {services.map(key => (
            <MotionBox key={key} {...riseInView} pt={5} borderTop="1px solid" borderColor="hairline">
              <Heading as="h3" fontSize="xl" mb={2}>
                {t(`home.services.${key}.title`)}
              </Heading>
              <Text fontSize="sm" maxW="46ch">
                {t(`home.services.${key}.description`)}
              </Text>
            </MotionBox>
          ))}
        </SimpleGrid>

        <CrystalDivider my={{ base: 16, md: 24 }} />

        {/* ——— Write to me ——— */}
        <MotionBox {...riseInView} pb={{ base: 4, md: 10 }}>
          <Eyebrow kanji="便">{t('home.getInTouch')}</Eyebrow>
          <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }} maxW="20ch" mb={4}>
            {t('home.cta.pre')}
            <Box as="span" color="bloom">
              {t('home.cta.highlight')}
            </Box>
            {t('home.cta.post')}
          </Heading>
          <Text maxW="52ch" mb={8}>
            {t('home.cta.body')}
          </Text>
          <HStack spacing={4} flexWrap="wrap">
            <Button as={NextLink} href="/contact" variant="frost">
              {t('home.getInTouch')}
            </Button>
            <Link
              href={resumeUrl}
              target="_blank"
              fontFamily="mono"
              fontSize="sm"
              color="ice"
              borderBottom="1px solid"
              borderColor="hairline"
              pb="2px"
              _hover={{ color: 'bloom', borderColor: 'bloom' }}
            >
              {t('home.resumeButton')}
            </Link>
          </HStack>
        </MotionBox>
      </Container>
    </Layout>
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
