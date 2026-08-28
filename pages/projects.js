import { Container, SimpleGrid, Text, HStack, Box, Heading, Link } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../components/layouts/page';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config';
import { motion } from 'framer-motion';
import { IoLogoGithub, IoArrowForward } from 'react-icons/io5';
import { site } from '../lib/site';
import { defaultProjects } from '../lib/project-defaults';
import { sql, ensureSchema } from '../lib/db';
import { Eyebrow, CrystalDivider } from '../components/frost';

const MotionBox = motion(Box);

// Cards render statically — the page-load fade is the only animated moment.
const riseInView = {};

const ProjectCard = ({ title, description, thumbnail, url, github, tech, featured, t }) => (
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
    {thumbnail && (
      <Box position="relative" h="210px" overflow="hidden" borderBottom="1px solid" borderColor="hairline">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
        />
      </Box>
    )}
    <Box p={6}>
      <HStack justify="space-between" align="baseline" mb={2}>
        <Heading as="h3" fontSize="xl">
          {title}
        </Heading>
        {featured && (
          <Text fontFamily="mono" fontSize="xs" color="bloom" letterSpacing="0.14em" textTransform="uppercase">
            {t('projects.featured')}
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
            {t('projects.visit')} <IoArrowForward size={13} />
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
            <IoLogoGithub size={14} /> {t('projects.source')}
          </Link>
        )}
      </HStack>
    </Box>
  </MotionBox>
);

const Projects = ({ rows }) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  const projects = rows.map(p => ({
    ...p,
    description: p.descriptions?.[locale] || p.descriptions?.en || '',
  }));

  return (
    <Layout title={t('projects.title')} description={t('projects.seo.description')}>
      <Container maxW="container.lg" px={{ base: 4, md: 6 }} pt={{ base: 6, md: 14 }} pb={10}>
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          mb={12}
        >
          <Eyebrow kanji="作" color="ice">{t('projects.selectedWork')}</Eyebrow>
          <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }} mb={4}>
            {t('projects.title')}
          </Heading>
          <Text maxW="56ch">{t('projects.description')}</Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {projects.map(project => (
            <ProjectCard key={project.key} {...project} t={t} />
          ))}
        </SimpleGrid>

        <CrystalDivider my={{ base: 16, md: 20 }} />

        {/* Off the keyboard */}
        <MotionBox {...riseInView}>
          <Eyebrow kanji="芸" color="gold">{t('projects.offKeyboard.label')}</Eyebrow>
          <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} mb={4} maxW="24ch">
            {t('projects.offKeyboard.heading')}
          </Heading>
          <Text maxW="52ch" mb={6}>
            {t('projects.offKeyboard.body')}
          </Text>
          <Link
            href={site.instagram}
            target="_blank"
            fontFamily="mono"
            fontSize="sm"
            color="ice"
            borderBottom="1px solid"
            borderColor="hairline"
            pb="2px"
            _hover={{ color: 'bloom', borderColor: 'bloom' }}
          >
            instagram.com/{site.handle}
          </Link>
        </MotionBox>
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  // Projects live in the database (edited from /admin); the lineup file is
  // the fallback when the table is empty or no database is configured.
  let rows = null;
  try {
    await ensureSchema();
    const result = await sql`SELECT * FROM projects ORDER BY sort`;
    if (result.rows.length) {
      rows = result.rows.map(({ key, title, descriptions, tech, url, github, thumbnail, featured }) => ({
        key, title, descriptions, tech, url, github, thumbnail, featured,
      }));
    }
  } catch {
    // fall through to defaults
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
      rows: rows || defaultProjects(),
    },
    revalidate: 60,
  };
}

export default Projects;
