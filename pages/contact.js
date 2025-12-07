import { Container, Box, Text, Heading, VStack, HStack, Link, keyframes } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import ContactForm from '../components/contact-form'
import SEOHead from '../components/seo-head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { ConstellationBackground } from '../components/projects-background-effects'
import { SectionHeader, GlassCard } from '../components/advanced-theme-elements'
import { TiltCard } from '../components/interactive-effects-v2'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { IoLogoGithub, IoLogoTwitter, IoLogoInstagram, IoMail, IoHeart } from 'react-icons/io5'

const MotionBox = motion(Box)

// Cute animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const heartbeat = keyframes`
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.1); }
  28% { transform: scale(1); }
  42% { transform: scale(1.1); }
  70% { transform: scale(1); }
`

const Contact = () => {
  const { t } = useTranslation('common')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const socialLinks = [
    { icon: IoLogoGithub, href: 'https://github.com/kyuna312', label: 'GitHub', color: 'gray.400' },
    { icon: IoLogoTwitter, href: 'https://twitter.com/m1or3n', label: 'Twitter', color: 'blue.400' },
    { icon: IoLogoInstagram, href: 'https://instagram.com/m1or3n', label: 'Instagram', color: 'pink.400' },
    { icon: IoMail, href: 'mailto:your.email@example.com', label: 'Email', color: 'purple.400' },
  ]

  return (
    <Layout title={t('contact.title') || 'Contact'}>
      <SEOHead
        title={t('contact.title') || 'Contact'}
        description={t('contact.seo.description') || 'Get in touch with me for your next project. Let\'s work together to bring your ideas to life.'}
      />
      <ConstellationBackground />

      <Container maxW="container.lg" paddingTop={20} position="relative">
        {/* Cute floating decorations */}
        {mounted && (
          <>
            <Box
              position="absolute"
              top="5%"
              left="5%"
              fontSize="2xl"
              animation={`${floatAnimation} 3s ease-in-out infinite`}
              opacity={0.3}
            >
              💌
            </Box>
            <Box
              position="absolute"
              top="15%"
              right="8%"
              fontSize="xl"
              animation={`${sparkleAnimation} 2.5s ease-in-out 0.5s infinite`}
              opacity={0.4}
            >
              ✨
            </Box>
            <Box
              position="absolute"
              top="40%"
              left="3%"
              fontSize="lg"
              animation={`${floatAnimation} 4s ease-in-out 1s infinite`}
              opacity={0.3}
            >
              🌸
            </Box>
            <Box
              position="absolute"
              bottom="20%"
              right="5%"
              fontSize="xl"
              animation={`${heartbeat} 2s ease-in-out infinite`}
              opacity={0.4}
            >
              💖
            </Box>
            <Box
              position="absolute"
              top="30%"
              right="12%"
              fontSize="md"
              animation={`${floatAnimation} 3.5s ease-in-out 0.7s infinite`}
              opacity={0.35}
            >
              🎀
            </Box>
            <Box
              position="absolute"
              bottom="40%"
              left="10%"
              fontSize="lg"
              animation={`${sparkleAnimation} 3s ease-in-out 1.2s infinite`}
              opacity={0.4}
            >
              💝
            </Box>
            <Box
              position="absolute"
              top="60%"
              right="3%"
              fontSize="sm"
              animation={`${floatAnimation} 2.8s ease-in-out 0.3s infinite`}
              opacity={0.3}
            >
              🌟
            </Box>
            <Box
              position="absolute"
              bottom="10%"
              left="5%"
              fontSize="lg"
              animation={`${sparkleAnimation} 3.2s ease-in-out 0.8s infinite`}
              opacity={0.35}
            >
              💫
            </Box>
          </>
        )}

        {/* Enhanced Header */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          mb={12}
          textAlign="center"
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
            <Text fontSize="sm" color="pink.300">💌 Say Hello! 💌</Text>
          </Box>

          <Heading
            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
            fontFamily="'Playfair Display', serif"
            mb={4}
          >
            <Box
              as="span"
              bgGradient="linear(135deg, #ff6b8a 0%, #a855f7 50%, #ff6b8a 100%)"
              bgSize="200% 200%"
              bgClip="text"
              animation={`${gradientShift} 4s ease infinite`}
            >
              Let&apos;s Create Together ✨
            </Box>
          </Heading>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.400"
            maxW="600px"
            mx="auto"
            lineHeight="tall"
          >
            Have a project in mind? Want to collaborate? Or just want to say hi?
            I&apos;d love to hear from you! 💖
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

        {/* Contact Form with 3D Effect */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          mb={16}
        >
          <Box
            bg="rgba(26, 32, 44, 0.6)"
            backdropFilter="blur(20px)"
            borderRadius="32px"
            p={{ base: 6, md: 12 }}
            border="2px solid"
            borderColor="rgba(236, 72, 153, 0.3)"
            maxW="800px"
            mx="auto"
            position="relative"
            overflow="hidden"
          >
            {/* Cute gradient top border */}
            <Box
              position="absolute"
              top={0}
              left="10%"
              right="10%"
              h="4px"
              bgGradient="linear(to-r, transparent, pink.400, purple.400, pink.400, transparent)"
              borderTopRadius="32px"
            />

            {/* Corner decorations */}
            {mounted && (
              <>
                <Box position="absolute" top={4} left={4} fontSize="lg" opacity={0.3}>
                  ✦
                </Box>
                <Box position="absolute" top={4} right={4} fontSize="lg" opacity={0.3}>
                  ✦
                </Box>
                <Box position="absolute" bottom={4} left={4} fontSize="lg" opacity={0.3}>
                  ✦
                </Box>
                <Box position="absolute" bottom={4} right={4} fontSize="lg" opacity={0.3}>
                  ✦
                </Box>
              </>
            )}

            <ContactForm />
          </Box>
        </MotionBox>

        {/* Social Links Section */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          mb={16}
        >
          <Box
            bg="rgba(26, 32, 44, 0.4)"
            backdropFilter="blur(10px)"
            borderRadius="24px"
            p={8}
            border="1px solid"
            borderColor="rgba(167, 139, 250, 0.2)"
            textAlign="center"
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
              mb={6}
            >
              <Text fontSize="sm" color="purple.300">🌐 Connect With Me 🌐</Text>
            </Box>

            <Text color="gray.400" mb={6} maxW="500px" mx="auto">
              You can also find me on these platforms~
            </Text>

            <HStack justify="center" spacing={4} flexWrap="wrap">
              {socialLinks.map((social, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <Box
                    as={Link}
                    href={social.href}
                    target="_blank"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    px={5}
                    py={3}
                    bg="rgba(255, 255, 255, 0.05)"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    color="gray.300"
                    transition="all 0.3s ease"
                    _hover={{
                      bg: "rgba(236, 72, 153, 0.1)",
                      borderColor: "pink.400",
                      color: "pink.400",
                      transform: "translateY(-3px)",
                      boxShadow: "0 10px 30px rgba(236, 72, 153, 0.2)"
                    }}
                  >
                    <social.icon size={20} />
                    <Text fontSize="sm" fontWeight="medium">{social.label}</Text>
                  </Box>
                </MotionBox>
              ))}
            </HStack>
          </Box>
        </MotionBox>

        {/* Cute Message */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          textAlign="center"
          mb={16}
        >
          <Box
            p={6}
            bg="rgba(26, 32, 44, 0.3)"
            borderRadius="20px"
            border="1px dashed"
            borderColor="rgba(236, 72, 153, 0.3)"
            maxW="500px"
            mx="auto"
          >
            <HStack justify="center" spacing={2} mb={3}>
              <IoHeart color="#ec4899" />
              <Text color="gray.400" fontStyle="italic">
                Looking forward to hearing from you!
              </Text>
              <IoHeart color="#ec4899" />
            </HStack>
            <Text color="pink.400" fontSize="sm">
              — 霜花 (Shimoka) ✨
            </Text>
          </Box>
        </MotionBox>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Contact
