import NextLink from 'next/link';
import { Container, Box, Text, Heading, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Layout from '../../components/layouts/page';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { motion } from 'framer-motion';
import { Eyebrow, CrystalMark } from '../../components/frost';
import { site, postDate } from '../../lib/site';
import { mediumStories } from '../../lib/medium';
import { sql, ensureSchema } from '../../lib/db';

const MotionBox = motion.create(Box);

// Notes written here and stories on Medium share one ice spine, newest at
// the top — frost forming over time.
const Posts = ({ posts }) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  return (
    <Layout title={t('posts.title')} description={t('posts.description')}>
      <Container maxW="container.md" px={{ base: 4, md: 6 }} pt={{ base: 6, md: 14 }} pb={10}>
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          mb={{ base: 12, md: 16 }}
        >
          <Eyebrow kanji="記" color="ice">{t('posts.title')}</Eyebrow>
          <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }} mb={4}>
            {t('posts.title')}
          </Heading>
          <Text maxW="56ch">{t('posts.description')}</Text>
        </MotionBox>

        {posts.length === 0 && (
          <Text fontFamily="mono" fontSize="sm" color="rime">
            {t('posts.empty')}
          </Text>
        )}

        {posts.length > 0 && (
          <Box
            as="ol"
            listStyleType="none"
            position="relative"
            pl={{ base: 7, md: 10 }}
            _before={{
              content: '""',
              position: 'absolute',
              left: '5px',
              top: '10px',
              bottom: 0,
              width: '1px',
              bg: 'ice',
              opacity: 0.55,
              maskImage: 'linear-gradient(to bottom, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent)',
            }}
          >
            {posts.map(post => (
              <Box as="li" key={post.href} position="relative" pb={{ base: 10, md: 12 }}>
                <Box
                  position="absolute"
                  left={{ base: '-28px', md: '-40px' }}
                  top="7px"
                  w="11px"
                  h="11px"
                  bg="paper"
                  color="ice"
                  display="flex"
                  aria-hidden="true"
                >
                  <CrystalMark size={11} />
                </Box>
                {post.title && (
                  <Text
                    as="time"
                    dateTime={post.date}
                    display="block"
                    fontFamily="heading"
                    fontStyle="italic"
                    fontSize="md"
                    color="ice"
                    lineHeight="1.4"
                    mb={1}
                  >
                    {postDate(post.date, locale)}
                    {post.external && `, ${t('posts.onMedium')}`}
                  </Text>
                )}
                <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={2} maxW="30ch">
                  <Link
                    as={post.external ? undefined : NextLink}
                    href={post.href}
                    target={post.external ? '_blank' : undefined}
                    rel={post.external ? 'noopener' : undefined}
                    color="ink"
                    _hover={{ color: 'bloom' }}
                  >
                    {post.title || postDate(post.date, locale)}
                  </Link>
                </Heading>
                <Text fontSize="sm" noOfLines={3} maxW="60ch">
                  {post.excerpt}
                </Text>
              </Box>
            ))}
          </Box>
        )}

        <Link
          href={site.medium}
          target="_blank"
          rel="noopener"
          fontFamily="mono"
          fontSize="sm"
          display="inline-block"
          mt={{ base: 4, md: 6 }}
        >
          {t('posts.moreOnMedium')}
        </Link>
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  let notes = [];
  try {
    await ensureSchema();
    const { rows } = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
    notes = rows.map(r => ({
      href: `/posts/${r.id}`,
      title: r.title,
      excerpt: r.content.slice(0, 300),
      date: new Date(r.created_at).toISOString().slice(0, 10),
    }));
  } catch {
    // No database configured (local build) — Medium stories only.
  }
  const stories = (await mediumStories(site.medium)).map(s => ({ ...s, external: true }));
  const posts = [...notes, ...stories].sort((a, b) => (a.date < b.date ? 1 : -1));
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
      posts,
    },
    revalidate: 600,
  };
}

export default Posts;
