import NextLink from 'next/link';
import { Container, Box, Text, Heading, Link, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Layout from '../../components/layouts/page';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { CrystalDivider } from '../../components/frost';
import { postDate } from '../../lib/site';
import { sql, ensureSchema } from '../../lib/db';

const navLink = {
  as: NextLink,
  fontFamily: 'mono',
  fontSize: 'sm',
  color: 'ice',
  maxW: '45%',
  _hover: { color: 'bloom' },
};

const Post = ({ post, older, newer }) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const label = p => p.title || postDate(p.date, locale);

  return (
    <Layout title={post.title || t('posts.title')} description={post.content.slice(0, 160)}>
      <Container maxW="container.md" px={{ base: 4, md: 6 }} pt={{ base: 6, md: 14 }} pb={10}>
        <Link {...navLink} href="/posts" display="inline-block" mb={{ base: 10, md: 14 }}>
          {t('posts.back')}
        </Link>

        <Box as="article">
          <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} lineHeight="1.15" maxW="22ch" mb={4}>
            {post.title || postDate(post.date, locale)}
          </Heading>
          {post.title && (
            <Text
              as="time"
              dateTime={post.date}
              display="block"
              fontFamily="heading"
              fontStyle="italic"
              fontSize="lg"
              color="ice"
            >
              {postDate(post.date, locale)}
            </Text>
          )}
          <Text mt={{ base: 8, md: 12 }} fontSize={{ base: 'md', md: '17px' }} lineHeight="1.8" whiteSpace="pre-wrap" maxW="64ch">
            {post.content}
          </Text>
        </Box>

        {(older || newer) && (
          <Box as="nav" aria-label={t('posts.title')}>
            <CrystalDivider my={{ base: 12, md: 16 }} />
            <HStack justify="space-between" align="flex-start" spacing={6}>
              {older ? (
                <Link {...navLink} href={`/posts/${older.id}`}>
                  <Text as="span" display="block" color="rime" fontSize="xs" mb={1}>
                    {t('posts.older')}
                  </Text>
                  {label(older)}
                </Link>
              ) : <Box />}
              {newer && (
                <Link {...navLink} href={`/posts/${newer.id}`} textAlign="right">
                  <Text as="span" display="block" color="rime" fontSize="xs" mb={1}>
                    {t('posts.newer')}
                  </Text>
                  {label(newer)}
                </Link>
              )}
            </HStack>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Posts are rendered on first request and cached (ISR); nothing to prebuild.
  return { paths: [], fallback: 'blocking' };
}

const shape = r => r && { id: r.id, title: r.title, date: new Date(r.created_at).toISOString().slice(0, 10) };

export async function getStaticProps({ locale, params }) {
  const id = Number(params.id);
  let post = null;
  let older = null;
  let newer = null;
  if (id) {
    try {
      await ensureSchema();
      const { rows } = await sql`SELECT * FROM posts WHERE id = ${id}`;
      const r = rows[0];
      if (r) {
        post = { ...shape(r), content: r.content };
        const [o, n] = await Promise.all([
          sql`SELECT id, title, created_at FROM posts WHERE created_at < ${r.created_at} ORDER BY created_at DESC LIMIT 1`,
          sql`SELECT id, title, created_at FROM posts WHERE created_at > ${r.created_at} ORDER BY created_at ASC LIMIT 1`,
        ]);
        older = shape(o.rows[0]) || null;
        newer = shape(n.rows[0]) || null;
      }
    } catch {
      // No database configured (local build) — 404.
    }
  }
  if (!post) return { notFound: true, revalidate: 60 };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
      post,
      older,
      newer,
    },
    revalidate: 60,
  };
}

export default Post;
