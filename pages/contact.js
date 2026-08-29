import { Container, Box, Text, Heading, HStack, Link } from '@chakra-ui/react'
import Layout from '../components/layouts/page'
import ContactForm from '../components/contact-form'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { site, socialLinks } from '../lib/site'
import { IoMailOutline } from 'react-icons/io5'
import { Eyebrow } from '../components/frost'

const MotionBox = motion.create(Box)

const Contact = () => {
  const { t } = useTranslation('common')

  return (
    <Layout title={t('contact.title')} description={t('contact.seo.description')}>
      <Container maxW="container.md" px={{ base: 4, md: 6 }} pt={{ base: 6, md: 14 }} pb={10}>
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          mb={10}
        >
          <Eyebrow kanji="便">{t('navbar.contact')}</Eyebrow>
          <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }} mb={4}>
            {t('contact.title')}
          </Heading>
          <Text maxW="56ch">{t('contact.description')}</Text>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          bg="pane"
          border="1px solid"
          borderColor="hairline"
          borderRadius="2px"
          p={{ base: 6, md: 10 }}
          mb={12}
        >
          <ContactForm />
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Text fontFamily="mono" fontSize="xs" color="ice" letterSpacing="0.18em" textTransform="uppercase" mb={4}>
            {t('contact.social.title')}
          </Text>
          <HStack spacing={6} flexWrap="wrap">
            <Link
              href={`mailto:${site.email}`}
              display="inline-flex"
              alignItems="center"
              gap={2}
              fontFamily="mono"
              fontSize="sm"
              color="rime"
              _hover={{ color: 'bloom' }}
              transition="color 0.2s ease"
            >
              <IoMailOutline size={16} />
              {site.email}
            </Link>
            {socialLinks.map(social => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                display="inline-flex"
                alignItems="center"
                gap={2}
                fontFamily="mono"
                fontSize="sm"
                color="rime"
                _hover={{ color: 'bloom' }}
                transition="color 0.2s ease"
              >
                <social.icon size={16} />
                {social.label}
              </Link>
            ))}
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

export default Contact
