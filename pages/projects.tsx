import { Container, SimpleGrid, Text, VStack, Badge, HStack, Box, Heading, Image, Link, keyframes } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';
import { useState, useEffect } from 'react';
import { ElegantBackground } from '../components/elegant-elements';
import { ConstellationBackground } from '../components/projects-background-effects';
import { motion } from 'framer-motion';
import type { CuteProjectCardProps } from '@/types';
import { IoLogoGithub, IoEyeOutline } from 'react-icons/io5';

const MotionBox = motion(Box);

// Cute animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Cute Project Card Component
const CuteProjectCard = ({
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      bg="rgba(26, 32, 44, 0.8)"
      backdropFilter="blur(10px)"
      borderRadius="24px"
      overflow="hidden"
      border="2px solid"
      borderColor={isHovered ? "pink.400" : "rgba(236, 72, 153, 0.2)"}
      boxShadow={isHovered ? "0 20px 40px rgba(236, 72, 153, 0.3)" : "0 10px 30px rgba(0, 0, 0, 0.2)"}
      position="relative"
      sx={{ transition: "all 0.3s ease" }}
    >
      {/* Featured Badge */}
      {featured && (
        <Box
          position="absolute"
          top={4}
          left={4}
          zIndex={10}
          px={3}
          py={1}
          bg="linear-gradient(135deg, #ec4899, #a855f7)"
          borderRadius="full"
          fontSize="xs"
          fontWeight="bold"
          color="white"
        >
          ⭐ Featured
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
          transition="transform 0.5s ease"
          transform={isHovered ? "scale(1.1)" : "scale(1)"}
        />
        {/* Overlay on hover */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(236, 72, 153, 0.8)"
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.3s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={4}
        >
          {url && (
            <Link
              href={url}
              target="_blank"
              p={3}
              bg="white"
              borderRadius="full"
              color="pink.500"
              _hover={{ transform: "scale(1.1)" }}
              transition="transform 0.2s"
            >
              <IoEyeOutline size={24} />
            </Link>
          )}
          {github && (
            <Link
              href={github}
              target="_blank"
              p={3}
              bg="white"
              borderRadius="full"
              color="pink.500"
              _hover={{ transform: "scale(1.1)" }}
              transition="transform 0.2s"
            >
              <IoLogoGithub size={24} />
            </Link>
          )}
        </Box>
      </Box>

      {/* Content */}
      <Box p={6}>
        <Heading
          fontSize="xl"
          fontFamily="heading"
          color="white"
          mb={2}
        >
          {title}
        </Heading>
        <Text color="gray.400" fontSize="sm" mb={4} noOfLines={2}>
          {description}
        </Text>

        {/* Tech Tags */}
        <HStack spacing={2} flexWrap="wrap">
          {tech.slice(0, 4).map((t, i) => (
            <Badge
              key={i}
              bg="rgba(236, 72, 153, 0.15)"
              color="pink.300"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
              border="1px solid"
              borderColor="rgba(236, 72, 153, 0.3)"
            >
              {t}
            </Badge>
          ))}
        </HStack>
      </Box>
    </MotionBox>
  );
};

const Projects = () => {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Featured order aligned with github.com/kyuna0312/kyuna0312 profile README
  const projects = [
    {
      title: t('projects.kyunaWeb'),
      description: t('projects.kyunaWebDescription'),
      thumbnail: '/images/霜花.png',
      url: 'https://kyuna-web.vercel.app',
      github: 'https://github.com/kyuna0312/kyuna_web',
      tech: ['▲ Next.js', '⚛️ React', '🌍 i18n', '💜 Chakra UI'],
      featured: true,
    },
    {
      title: t('projects.amaneSite'),
      description: t('projects.amaneSiteDescription'),
      thumbnail: '/images/amane.jpg',
      url: 'https://amane312.vercel.app',
      tech: ['▲ Vercel', '🌐 Web', '✨ Alt front', '💜 Personal'],
      featured: true,
    },
    {
      title: t('projects.dotfiles'),
      description: t('projects.dotfilesDescription'),
      thumbnail: '/images/works/nyanvim.png',
      url: 'https://github.com/kyuna0312/dotfiles',
      github: 'https://github.com/kyuna0312/dotfiles',
      tech: ['🐚 Shell', '💜 zsh', '🐧 Linux', '⚙️ Dev env'],
      featured: true,
    },
    {
      title: t('projects.inariWrite'),
      description: t('projects.inariWriteDescription'),
      thumbnail: '/images/works/nyanmarkdown.png',
      url: 'https://github.com/kyuna0312/InariWrite',
      github: 'https://github.com/kyuna0312/InariWrite',
      tech: ['✍️ Writing', '🦊 Creative', '💝 OSS'],
      featured: true,
    },
    {
      title: t('projects.NomadX'),
      description: t('projects.NomadXDescription'),
      thumbnail: '/images/works/nomadx.png',
      url: 'https://nomadx.world',
      github: 'https://github.com/kyuna0312/nomadx',
      tech: ['⚛️ React', '▲ Next.js', '💙 TypeScript', '🎨 Chakra UI'],
      featured: true,
    },
    {
      title: t('projects.mongolnet'),
      description: t('projects.mongolnetDescription'),
      thumbnail: '/images/works/mongolnet.png',
      url: 'https://mongol.net',
      github: 'https://github.com/kyuna0312/mongolnet',
      tech: ['🌐 Full Stack', '🟢 Node.js', '🍃 MongoDB'],
    },
    {
      title: t('projects.madoka_react'),
      description: t('projects.madoka_reactDescription'),
      thumbnail: '/images/works/madoka_react.png',
      url: 'https://madoka-kappa.vercel.app',
      github: 'https://github.com/kyuna0312/madoka-react',
      tech: ['⚛️ React', '💫 CSS3', '✨ Animation', '🎬 GSAP'],
    },
    {
      title: t('projects.nyanvim'),
      description: t('projects.nyanvimDescription'),
      thumbnail: '/images/works/nyanvim.png',
      url: 'https://github.com/kyuna0312/NyanVim',
      github: 'https://github.com/kyuna0312/NyanVim',
      tech: ['📝 NeoVim', '🌙 Lua', '💝 Open Source'],
    },
  ];

  // Cute project statistics
  const projectStats = [
    { value: "15+", label: "✨ Projects", emoji: "🌸" },
    { value: "5+", label: "💻 Technologies", emoji: "🎨" },
    { value: "3+", label: "🌟 Years", emoji: "⭐" },
    { value: "∞", label: "💖 Passion", emoji: "💝" }
  ];

  return (
    <Layout title={t('projects.title')}>
      <ElegantBackground>
        <ConstellationBackground />
        <Container maxW="container.xl" paddingTop={20} position="relative" pb={20}>
          {/* Cute floating decorations */}
          {mounted && (
            <>
              <Box position="absolute" top="5%" left="5%" fontSize="2xl" opacity={0.3} animation={`${floatAnimation} 3s ease-in-out infinite`}>
                ✨
              </Box>
              <Box position="absolute" top="15%" right="8%" fontSize="xl" opacity={0.4} animation={`${floatAnimation} 4s ease-in-out 0.5s infinite`}>
                🌸
              </Box>
              <Box position="absolute" top="30%" left="10%" fontSize="lg" opacity={0.35} animation={`${floatAnimation} 3.5s ease-in-out 1s infinite`}>
                🎀
              </Box>
              <Box position="absolute" bottom="40%" right="5%" fontSize="lg" opacity={0.35} animation={`${floatAnimation} 3.2s ease-in-out 0.7s infinite`}>
                💫
              </Box>
              <Box position="absolute" bottom="20%" left="8%" fontSize="xl" opacity={0.3} animation={`${floatAnimation} 4.2s ease-in-out 1.2s infinite`}>
                🌟
              </Box>
              <Box position="absolute" top="50%" right="12%" fontSize="sm" opacity={0.4} animation={`${floatAnimation} 2.8s ease-in-out 0.3s infinite`}>
                💝
              </Box>
            </>
          )}

          {/* Hero Section */}
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            textAlign="center"
            mb={12}
          >
            {/* Cute Badge */}
            <Box
              display="inline-flex"
              alignItems="center"
              gap={2}
              px={5}
              py={2}
              bg="rgba(236, 72, 153, 0.1)"
              borderRadius="full"
              border="1px solid"
              borderColor="pink.400"
              mb={6}
            >
              <Text fontSize="sm" color="pink.300" fontFamily="mono">
                {t('projects.heroBadge')}
              </Text>
            </Box>

            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontFamily="heading"
              mb={6}
            >
              <Box
                as="span"
                bgGradient="linear(135deg, #ff6b8a 0%, #a855f7 50%, #ff6b8a 100%)"
                bgSize="200% 200%"
                bgClip="text"
                animation={`${gradientShift} 4s ease infinite`}
              >
                {t('projects.heroTitle')}
              </Box>
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color="gray.400" maxW="700px" mx="auto">
              {t('projects.heroDescription')}
            </Text>
            <Text fontSize="sm" color="teal.300" maxW="640px" mx="auto" mt={4} fontStyle="italic">
              {t('projects.recruiterLine')}
            </Text>

            {/* Cute divider */}
            <HStack justify="center" spacing={4} mt={6}>
              <Box h="1px" w="40px" bgGradient="linear(to-r, transparent, pink.400)" />
              <Text color="pink.400">♡</Text>
              <Box h="1px" w="40px" bgGradient="linear(to-r, pink.400, purple.400)" />
              <Text color="purple.400">♡</Text>
              <Box h="1px" w="40px" bgGradient="linear(to-r, purple.400, transparent)" />
            </HStack>
          </MotionBox>

          {/* Stats Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            mb={16}
          >
            <Box
              bg="rgba(26, 32, 44, 0.5)"
              backdropFilter="blur(10px)"
              borderRadius="24px"
              p={8}
              border="1px solid"
              borderColor="rgba(236, 72, 153, 0.2)"
            >
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
                {projectStats.map((stat, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <VStack spacing={2}>
                      <Box
                        fontSize="3xl"
                        animation={`${floatAnimation} ${3 + index * 0.5}s ease-in-out infinite`}
                      >
                        {stat.emoji}
                      </Box>
                      <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="bold"
                        bgGradient="linear(to-r, pink.400, purple.400)"
                        bgClip="text"
                      >
                        {stat.value}
                      </Text>
                      <Text color="gray.400" fontSize="sm" textAlign="center">
                        {stat.label}
                      </Text>
                    </VStack>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </Box>
          </MotionBox>

          {/* Section Header */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
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
              <Text fontSize="sm" color="purple.300">💻 Code & Creativity 💻</Text>
            </Box>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "4xl" }}
              fontFamily="heading"
              bgGradient="linear(to-r, purple.400, pink.400)"
              bgClip="text"
              mb={3}
            >
              ✨ Featured Projects ✨
            </Heading>
            <Text color="gray.400" fontSize="lg">
              Projects I&apos;m most proud of 💖
            </Text>
          </MotionBox>

          {/* Projects Grid */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={16}>
            {projects.map((project, index) => (
              <CuteProjectCard
                key={index}
                {...project}
              />
            ))}
          </SimpleGrid>

          {/* Cosplay Section Teaser */}
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box
              bg="rgba(26, 32, 44, 0.6)"
              backdropFilter="blur(20px)"
              borderRadius="32px"
              p={{ base: 8, md: 12 }}
              border="2px solid"
              borderColor="rgba(236, 72, 153, 0.3)"
              textAlign="center"
              position="relative"
              overflow="hidden"
            >
              {/* Decorative gradient */}
              <Box
                position="absolute"
                top={0}
                left="10%"
                right="10%"
                h="4px"
                bgGradient="linear(to-r, transparent, pink.400, purple.400, pink.400, transparent)"
              />

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
                mb={6}
              >
                <Text fontSize="sm" color="pink.300">🎭 Other Interests 🎭</Text>
              </Box>

              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                fontFamily="heading"
                bgGradient="linear(to-r, pink.400, purple.400)"
                bgClip="text"
                mb={4}
              >
                Cosplay & Creative Arts ✨
              </Heading>

              <Text color="gray.400" maxW="600px" mx="auto" mb={6}>
                Besides coding, I love expressing creativity through cosplay!
                Check out my Instagram for photos and behind-the-scenes content 🌸
              </Text>

              <Box
                as="a"
                href="https://www.instagram.com/kyuna0312/"
                target="_blank"
                display="inline-block"
                px={6}
                py={3}
                bgGradient="linear(135deg, #ff6b8a, #a855f7)"
                borderRadius="full"
                color="white"
                fontWeight="bold"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 35px rgba(236, 72, 153, 0.4)"
                }}
              >
                📸 View Cosplay Gallery
              </Box>
            </Box>
          </MotionBox>

          {/* Bottom Quote */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            mt={16}
          >
            <Box
              p={8}
              bg="rgba(26, 32, 44, 0.3)"
              borderRadius="24px"
              border="1px dashed"
              borderColor="rgba(236, 72, 153, 0.3)"
            >
              <Text
                fontSize="lg"
                color="gray.300"
                fontStyle="italic"
                maxW="600px"
                mx="auto"
              >
                &quot;Every project is a journey of discovery, where challenges become
                opportunities and ideas transform into digital reality~ ✨&quot;
              </Text>
              <Text color="pink.400" mt={4} fontSize="sm">
                — Kyuna / 霜花 💖
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
