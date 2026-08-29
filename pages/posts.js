import { Container, Box, Text, Heading } from '@chakra-ui/react';
import Layout from '../components/layouts/page';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';
import { motion } from 'framer-motion';
import { Eyebrow } from '../components/frost';
import { sql, ensureSchema } from '../lib/db';

const MotionBox = motion.create(Box);

const Posts = ({ posts }) => {
  const { t } = useTranslation('common');

  return (
    <Layout title={t('posts.title')} description={t('posts.description')}>
      <Container maxW="container.md" px={{ base: 4, md: 6 }} pt={{ base: 6, md: 14 }} pb={10}>
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          mb={12}
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

        {posts.map(post => (
          <Box
            key={post.id}
            as="article"
            pt={5}
            pb={8}
            borderTop="1px solid"
            borderColor="hairline"
          >
            <Text fontFamily="mono" fontSize="xs" color="ice" letterSpacing="0.08em" mb={2}>
              {post.date}
            </Text>
            {post.title && (
              <Heading as="h2" fontSize="xl" mb={2}>
                {post.title}
              </Heading>
            )}
            <Text fontSize="sm" whiteSpace="pre-wrap">
              {post.content}
            </Text>
          </Box>
        ))}
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  let posts = [];
  try {
    await ensureSchema();
    const { rows } = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
    posts = rows.map(r => ({
      id: r.id,
      title: r.title,
      content: r.content,
      date: new Date(r.created_at).toISOString().slice(0, 10),
    }));
  } catch {
    // No database configured (local build) — render the empty state.
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
      posts,
    },
    revalidate: 60,
  };
}

export default Posts;
