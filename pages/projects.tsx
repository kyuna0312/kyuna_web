import { Container, SimpleGrid, Text, VStack, HStack, Box, Heading, Image, Link } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';
import { useState } from 'react';
import { ElegantBackground } from '../components/elegant-elements';
import { motion } from 'framer-motion';
import type { CuteProjectCardProps } from '@/types';
import { IoLogoGithub, IoEyeOutline } from 'react-icons/io5';
import { SectionHeader } from '../components/advanced-theme-elements';
import { MagicArray } from '../components/magic-array';

const MotionBox = motion(Box);

const crystalline = { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const };

// Yotsuba Array project card
const ArrayProjectCard = ({
  title,
  description,
  thumbnail,
  url,
  github,
  tech = [],
  featured = false,
}: CuteProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={crystalline}
      whileHover={{ y: -6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      bg="#0d1525"
      overflow="hidden"
      border="1px solid"
      borderColor={isHovered ? 'rgba(77, 184, 212, 0.4)' : '#1e2d42'}
      boxShadow={isHovered ? '0 16px 48px rgba(77, 184, 212, 0.1)' : '0 4px 20px rgba(0, 0, 0, 0.3)'}
      position="relative"
      sx={{ transition: 'all 0.25s ease' }}
    >
      {/* Top accent line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="1px"
        bgGradient={isHovered
          ? 'linear(to-r, transparent, #4db8d4, #c4a55a, transparent)'
          : 'linear(to-r, transparent, #1e2d42, transparent)'}
        transition="all 0.25s ease"
        zIndex={1}
      />

      {/* Featured Badge */}
      {featured && (
        <Box
          position="absolute"
          top={4}
          left={4}
          zIndex={10}
          px={3}
          py={1}
          border="1px solid #c4a55a"
          fontSize="xs"
          fontWeight="600"
          color="#c4a55a"
          fontFamily="mono"
          letterSpacing="0.08em"
          textTransform="uppercase"
          bg="rgba(13, 21, 37, 0.9)"
        >
          [ FEATURED ]
        </Box>
      )}

      {/* Image */}
      <Box position="relative" overflow="hidden" h="200px">
        <Image
          src={thumbnail}
          alt={title}
          w="100%"
          h="100%"
          objectFit="cover"
          transition="transform 0.4s ease, filter 0.4s ease"
          transform={isHovered ? 'scale(1.06)' : 'scale(1)'}
          style={{ filter: isHovered ? 'brightness(0.5) saturate(0.6)' : 'brightness(0.8) saturate(0.7)' }}
        />
        {/* Link overlay on hover */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.25s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={3}
          zIndex={2}
        >
          {url && (
            <Link
              href={url}
              target="_blank"
              p={2}
              border="1px solid #4db8d4"
              color="#4db8d4"
              bg="rgba(8, 12, 20, 0.8)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="all 0.2s ease"
              _hover={{ bg: 'rgba(77, 184, 212, 0.15)' }}
            >
              <IoEyeOutline size={20} />
            </Link>
          )}
          {github && (
            <Link
              href={github}
              target="_blank"
              p={2}
              border="1px solid #c4a55a"
              color="#c4a55a"
              bg="rgba(8, 12, 20, 0.8)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="all 0.2s ease"
              _hover={{ bg: 'rgba(196, 165, 90, 0.15)' }}
            >
              <IoLogoGithub size={20} />
            </Link>
          )}
        </Box>
      </Box>

      {/* Content */}
      <Box p={5}>
        <Heading
          fontSize="md"
          fontFamily="heading"
          color="#e8eef4"
          mb={2}
          letterSpacing="0.04em"
        >
          {title}
        </Heading>
        <Text color="#4a6580" fontSize="sm" mb={4} noOfLines={2} lineHeight="tall">
          {description}
        </Text>

        <HStack spacing={2} flexWrap="wrap">
          {tech.slice(0, 4).map((techItem, i) => (
            <Box
              key={i}
              px={2}
              py={0.5}
              bg="rgba(8, 12, 20, 0.8)"
              color="#4db8d4"
              fontSize="xs"
              border="1px solid #1e2d42"
              fontFamily="mono"
              letterSpacing="0.04em"
              transition="border-color 0.2s ease"
              _hover={{ borderColor: '#4db8d4' }}
            >
              {techItem}
            </Box>
          ))}
        </HStack>
      </Box>
    </MotionBox>
  );
};

const Projects = () => {
  const { t } = useTranslation('common');

  const projects = [
    {
      title: t('projects.kyunaWeb'),
      description: t('projects.kyunaWebDescription'),
      thumbnail: '/images/霜花.png',
      url: 'https://kyuna-web.vercel.app',
      github: 'https://github.com/kyuna0312/kyuna_web',
      tech: ['Next.js', 'React', 'i18n', 'Chakra UI'],
      featured: true,
    },
    {
      title: t('projects.amaneSite'),
      description: t('projects.amaneSiteDescription'),
      thumbnail: '/images/amane.jpg',
      url: 'https://amane312.vercel.app',
      tech: ['Vercel', 'Web', 'Alt front'],
      featured: true,
    },
    {
      title: t('projects.dotfiles'),
      description: t('projects.dotfilesDescription'),
      thumbnail: '/images/works/nyanvim.png',
      url: 'https://github.com/kyuna0312/dotfiles',
      github: 'https://github.com/kyuna0312/dotfiles',
      tech: ['Shell', 'zsh', 'Linux', 'Dev env'],
      featured: true,
    },
    {
      title: t('projects.inariWrite'),
      description: t('projects.inariWriteDescription'),
      thumbnail: '/images/works/nyanmarkdown.png',
      url: 'https://github.com/kyuna0312/InariWrite',
      github: 'https://github.com/kyuna0312/InariWrite',
      tech: ['Writing', 'OSS'],
      featured: true,
    },
    {
      title: t('projects.NomadX'),
      description: t('projects.NomadXDescription'),
      thumbnail: '/images/works/nomadx.png',
      url: 'https://nomadx.world',
      github: 'https://github.com/kyuna0312/nomadx',
      tech: ['React', 'Next.js', 'TypeScript', 'Chakra UI'],
      featured: true,
    },
    {
      title: t('projects.mongolnet'),
      description: t('projects.mongolnetDescription'),
      thumbnail: '/images/works/mongolnet.png',
      url: 'https://mongol.net',
      github: 'https://github.com/kyuna0312/mongolnet',
      tech: ['Full Stack', 'Node.js', 'MongoDB'],
    },
    {
      title: t('projects.madoka_react'),
      description: t('projects.madoka_reactDescription'),
      thumbnail: '/images/works/madoka_react.png',
      url: 'https://madoka-kappa.vercel.app',
      github: 'https://github.com/kyuna0312/madoka-react',
      tech: ['React', 'CSS3', 'Animation', 'GSAP'],
    },
    {
      title: t('projects.nyanvim'),
      description: t('projects.nyanvimDescription'),
      thumbnail: '/images/works/nyanvim.png',
      url: 'https://github.com/kyuna0312/NyanVim',
      github: 'https://github.com/kyuna0312/NyanVim',
      tech: ['NeoVim', 'Lua', 'OSS'],
    },
  ];

  const projectStats = [
    { value: '15+', label: 'Projects' },
    { value: '5+', label: 'Technologies' },
    { value: '3+', label: 'Years' },
    { value: '∞', label: 'Passion' },
  ];

  return (
    <Layout title={t('projects.title')}>
      <ElegantBackground>
        <Container maxW="container.xl" paddingTop={20} position="relative" pb={20}>

          {/* Hero */}
          <MotionBox
            initial={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={crystalline}
            textAlign="center"
            mb={14}
          >
            {/* Badge */}
            <Box
              display="inline-flex"
              alignItems="center"
              px={4}
              py={1}
              border="1px solid #1e2d42"
              fontSize="xs"
              color="#4db8d4"
              fontFamily="mono"
              letterSpacing="0.1em"
              textTransform="uppercase"
              mb={6}
            >
              {t('projects.heroBadge')}
            </Box>

            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '6xl' }}
              fontFamily="heading"
              mb={6}
              letterSpacing="0.04em"
            >
              <Box
                as="span"
                bgGradient="linear(135deg, #e8eef4 0%, #4db8d4 40%, #c4a55a 70%, #e8eef4 100%)"
                bgSize="200% 200%"
                bgClip="text"
                style={{ animation: 'gradient 6s ease infinite' }}
              >
                {t('projects.heroTitle')}
              </Box>
            </Heading>

            <Text fontSize={{ base: 'md', md: 'lg' }} color="#4a6580" maxW="640px" mx="auto" lineHeight="tall">
              {t('projects.heroDescription')}
            </Text>
            <Text fontSize="sm" color="#4db8d4" maxW="600px" mx="auto" mt={3} fontFamily="mono" letterSpacing="0.02em">
              {t('projects.recruiterLine')}
            </Text>

            {/* Thin divider */}
            <Box
              h="1px"
              maxW="120px"
              mx="auto"
              mt={6}
              bgGradient="linear(to-r, transparent, #4db8d4, #c4a55a, transparent)"
            />
          </MotionBox>

          {/* Stats */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...crystalline, delay: 0.2 }}
            mb={14}
          >
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={0}>
              {projectStats.map((stat, index) => (
                <Box
                  key={index}
                  py={8}
                  px={6}
                  textAlign="center"
                  border="1px solid #1e2d42"
                  borderLeft={index === 0 ? '1px solid #1e2d42' : 'none'}
                  position="relative"
                >
                  <Text
                    fontSize={{ base: '3xl', md: '4xl' }}
                    fontFamily="heading"
                    color="#4db8d4"
                    letterSpacing="0.04em"
                    mb={1}
                  >
                    {stat.value}
                  </Text>
                  <Text color="#4a6580" fontSize="xs" letterSpacing="0.1em" textTransform="uppercase">
                    {stat.label}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </MotionBox>

          {/* Projects header */}
          <SectionHeader delay={0.1}>
            {t('projects.heroTitle')}
          </SectionHeader>

          {/* Projects Grid */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={16}>
            {projects.map((project, index) => (
              <ArrayProjectCard key={index} {...project} />
            ))}
          </SimpleGrid>

          {/* Cosplay / Instagram section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={crystalline}
            mb={14}
          >
            <Box
              bg="rgba(8, 12, 20, 0.8)"
              border="1px solid #1e2d42"
              p={{ base: 8, md: 12 }}
              textAlign="center"
              position="relative"
              overflow="hidden"
              transition="all 0.25s ease"
              _hover={{ borderColor: 'rgba(196, 165, 90, 0.3)' }}
            >
              <Box
                position="absolute"
                top={0}
                left="15%"
                right="15%"
                h="1px"
                bgGradient="linear(to-r, transparent, #c4a55a, transparent)"
              />
              {/* Background array */}
              <Box
                position="absolute"
                bottom="-40px"
                right="-40px"
                pointerEvents="none"
                opacity={0.06}
              >
                <MagicArray size="lg" opacity={1} animate />
              </Box>

              <Box
                display="inline-flex"
                alignItems="center"
                px={3}
                py={1}
                border="1px solid #c4a55a"
                fontSize="xs"
                color="#c4a55a"
                fontFamily="mono"
                letterSpacing="0.1em"
                textTransform="uppercase"
                mb={6}
              >
                Creative Arts
              </Box>

              <Heading
                fontSize={{ base: 'xl', md: '2xl' }}
                fontFamily="heading"
                color="#e8eef4"
                mb={4}
                letterSpacing="0.06em"
              >
                Cosplay & Commissions
              </Heading>

              <Text color="#4a6580" maxW="500px" mx="auto" mb={8} fontSize="sm" lineHeight="tall">
                Cosplay photography, creative direction, and brand collabs — open for commissions.
                DM on Instagram.
              </Text>

              <Box
                as="a"
                href="https://www.instagram.com/kyuna0312/"
                target="_blank"
                display="inline-flex"
                alignItems="center"
                gap={2}
                px={5}
                py={2}
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
                  boxShadow: '0 4px 20px rgba(196, 165, 90, 0.2)',
                  transform: 'translateY(-2px)',
                }}
              >
                @kyuna0312
              </Box>
            </Box>
          </MotionBox>

          {/* Bottom quote */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={crystalline}
            textAlign="center"
            mt={8}
          >
            <Box
              p={8}
              border="1px solid #1e2d42"
              bg="rgba(8, 12, 20, 0.5)"
              maxW="600px"
              mx="auto"
            >
              <Text
                fontSize="md"
                color="#4a6580"
                fontStyle="italic"
                maxW="500px"
                mx="auto"
                lineHeight="tall"
                letterSpacing="0.02em"
              >
                &quot;Every project is a journey of discovery — challenges become
                opportunities, ideas transform into systems.&quot;
              </Text>
              <Text color="#c4a55a" mt={4} fontSize="xs" fontFamily="mono" letterSpacing="0.1em">
                — Kyuna / 霜花
              </Text>
            </Box>
          </MotionBox>
        </Container>
      </ElegantBackground>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default Projects;
