import NextLink from 'next/link';
import { Box, Container, Button, Text, Heading } from '@chakra-ui/react';
import Layout from '../components/layouts/page';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config';
import { FrostCrystal } from '../components/frost';

const MotionBox = motion(Box);

const NotFound = () => {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('notFound.title')}>
      <Container maxW="container.lg" px={{ base: 4, md: 6 }}>
        <Box
          minH="60vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <FrostCrystal
            size={380}
            opacity={0.25}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          />

          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            textAlign="center"
            position="relative"
          >
            <Text
              fontFamily="mono"
              fontSize="xs"
              color="ice"
              letterSpacing="0.22em"
              textTransform="uppercase"
              mb={4}
            >
              {t('notFound.label')}
            </Text>
            <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }} mb={4}>
              {t('notFound.heading')}
            </Heading>
            <Text maxW="42ch" mx="auto" mb={8}>
              {t('notFound.body')}
            </Text>
            <Button as={NextLink} href="/" variant="frost">
              {t('notFound.back')}
            </Button>
          </MotionBox>
        </Box>
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'], nextI18NextConfig)),
    },
  };
}

export default NotFound;
