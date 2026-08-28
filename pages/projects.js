import { Container, SimpleGrid, Text, HStack, Box, Heading, Link } from '@chakra-ui/react';
import Image from 'next/image';
import Layout from '../components/layouts/article';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config';
import { motion } from 'framer-motion';
import { IoLogoGithub, IoArrowForward } from 'react-icons/io5';
import { Eyebrow, CrystalDivider } from '../components/frost';

const MotionBox = motion(Box);

// Cards render statically — the page-load fade is the only animated moment.
const riseInView = {};

const ProjectCard = ({ title, description, thumbnail, url, github, tech, featured }) => (
  <MotionBox
    {...riseInView}
    as="article"
    bg="pane"
    border="1px solid"
    borderColor="hairline"
    borderRadius="2px"
    overflow="hidden"
    transition="border-color 0.25s ease"
    _hover={{ borderColor: 'ice', '& img': { transform: 'scale(1.03)' } }}
  >
    <Box position="relative" h="210px" overflow="hidden" borderBottom="1px solid" borderColor="hairline">
      <Image
        src={thumbnail}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
      />
    </Box>
    <Box p={6}>
      <HStack justify="space-between" align="baseline" mb={2}>
        <Heading as="h3" fontSize="xl">
          {title}
        </Heading>
        {featured && (
          <Text fontFamily="mono" fontSize="xs" color="bloom" letterSpacing="0.14em" textTransform="uppercase">
            featured
          </Text>
        )}
      </HStack>
      <Text fontSize="sm" mb={4}>
        {description}
      </Text>
      <Text fontFamily="mono" fontSize="xs" color="ice" letterSpacing="0.08em" mb={5}>
        {tech}
      </Text>
      <HStack spacing={5}>
        {url && (
          <Link
            href={url}
            target="_blank"
            fontFamily="mono"
            fontSize="sm"
            display="inline-flex"
            alignItems="center"
            gap={2}
            _hover={{ color: 'bloom' }}
          >
            visit <IoArrowForward size={13} />
          </Link>
        )}
        {github && (
          <Link
            href={github}
            target="_blank"
            fontFamily="mono"
            fontSize="sm"
            display="inline-flex"
            alignItems="center"
            gap={2}
            _hover={{ color: 'bloom' }}
          >
            <IoLogoGithub size={14} /> source
          </Link>
        )}
      </HStack>
    </Box>
  </MotionBox>
);

const Projects = () => {
  const { t } = useTranslation('common');

  const projects = [
    {
      title: t('projects.NomadX'),
      description: t('projects.NomadXDescription'),
      thumbnail: '/images/works/nomadx.png',
      url: 'https://nomadx.world',
      github: 'https://github.com/kyuna0312/nomadx',
      tech: 'React · Next.js · TypeScript · Chakra UI',
      featured: true,
    },
    {
      title: t('projects.madoka_react'),
      description: t('projects.madoka_reactDescription'),
      thumbnail: '/images/works/madoka_react.png',
      url: 'https://madoka-kappa.vercel.app',
      github: 'https://github.com/kyuna0312/madoka-react',
      tech: 'React · CSS · GSAP',
    },
    {
      title: t('projects.mongolnet'),
      description: t('projects.mongolnetDescription'),
      thumbnail: '/images/works/mongolnet.png',
      url: 'https://mongol.net',
      github: 'https://github.com/kyuna0312/mongolnet',
      tech: 'React · NestJS · GraphQL · Flutter',
    },
    {
      title: t('projects.NyanMarkDown'),
      description: t('projects.NyanMarkDownDescription'),
      thumbnail: '/images/works/nyanmarkdown.png',
      url: 'https://github.com/kyuna0312/NyanVim',
      github: 'https://github.com/kyuna0312/NyanVim',
      tech: 'Vim · Lua · open source',
    },
  ];

  return (
    <Layout title={t('projects.title')}>
      <Container maxW="container.lg" px={{ base: 4, md: 6 }} pt={{ base: 6, md: 14 }} pb={10}>
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          mb={12}
        >
          <Eyebrow kanji="作" color="ice">Selected work</Eyebrow>
          <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }} mb={4}>
            {t('projects.title')}
          </Heading>
          <Text maxW="56ch">{t('projects.description')}</Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {projects.map(project => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </SimpleGrid>

        <CrystalDivider my={{ base: 16, md: 20 }} />

        {/* Off the keyboard */}
        <MotionBox {...riseInView}>
          <Eyebrow kanji="芸" color="gold">Off the keyboard</Eyebrow>
          <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} mb={4} maxW="24ch">
            Cosplay and costume craft
          </Heading>
          <Text maxW="52ch" mb={6}>
            The same making instinct, away from the screen — patterns, props, and
            photography. Work in progress and finished builds live on Instagram.
          </Text>
          <Link
            href="https://instagram.com/kyuna0312"
            target="_blank"
            fontFamily="mono"
            fontSize="sm"
            color="ice"
            borderBottom="1px solid"
            borderColor="hairline"
            pb="2px"
            _hover={{ color: 'bloom', borderColor: 'bloom' }}
          >
            instagram.com/kyuna0312
          </Link>
        </MotionBox>
      </Container>
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
