import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  useToast,
  Heading,
  Text,
  Icon,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { useTranslation } from 'next-i18next'
import { RippleEffect, MagneticButton } from './interactive-effects-v2'

const MotionBox = motion(Box)

const ContactForm = () => {
  const { t } = useTranslation('common')
  const toast = useToast()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const bg = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)')
  const borderColor = useColorModeValue('rgba(236, 72, 153, 0.2)', 'rgba(254, 128, 160, 0.3)')
  const inputBg = useColorModeValue('white', 'gray.800')
  const shadowColor = useColorModeValue('lg', 'dark-lg')

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired') || 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired') || 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid') || 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.errors.subjectRequired') || 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired') || 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.errors.messageMinLength') || 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call - replace with actual email service
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Create mailto link as fallback
      const mailtoLink = `mailto:hello@hattanzorg.dev?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`

      window.open(mailtoLink, '_blank')

      toast({
        title: t('contact.success.title') || 'Message sent!',
        description: t('contact.success.description') || 'Thank you for your message. I\'ll get back to you soon!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

    } catch (error) {
      toast({
        title: t('contact.error.title') || 'Error sending message',
        description: t('contact.error.description') || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      maxW="600px"
      mx="auto"
      position="relative"
    >
      <Box
        bg={bg}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={borderColor}
        borderRadius="24px"
        p={8}
        shadow={shadowColor}
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          borderRadius: '24px',
          zIndex: -1
        }}
      >
        <RippleEffect />

        <Heading
          size="lg"
          textAlign="center"
          mb={6}
          bgGradient="linear(to-r, pink.400, purple.600)"
          bgClip="text"
          fontWeight="bold"
        >
          {t('contact.form.title') || 'Get in Touch'}
        </Heading>

        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <HStack spacing={4} width="100%">
            <FormControl isInvalid={errors.name}>
              <FormLabel fontWeight="semibold" color="gray.600">
                {t('contact.form.name') || 'Name'}
              </FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.form.namePlaceholder') || 'Your name'}
                bg={inputBg}
                border="2px solid"
                borderColor="transparent"
                borderRadius="12px"
                p={4}
                _focus={{
                  borderColor: 'pink.400',
                  boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                  transform: 'translateY(-2px)'
                }}
                _hover={{
                  transform: 'translateY(-1px)',
                  borderColor: 'pink.200'
                }}
                transition="all 0.3s ease"
              />
              {errors.name && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.name}
                </Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel fontWeight="semibold" color="gray.600">
                {t('contact.form.email') || 'Email'}
              </FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.form.emailPlaceholder') || 'your@email.com'}
                bg={inputBg}
                border="2px solid"
                borderColor="transparent"
                borderRadius="12px"
                p={4}
                _focus={{
                  borderColor: 'purple.400',
                  boxShadow: '0 0 0 1px rgba(168, 85, 247, 0.3)',
                  transform: 'translateY(-2px)'
                }}
                _hover={{
                  transform: 'translateY(-1px)',
                  borderColor: 'purple.200'
                }}
                transition="all 0.3s ease"
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.email}
                </Text>
              )}
            </FormControl>
          </HStack>

          <FormControl isInvalid={errors.subject}>
            <FormLabel fontWeight="semibold" color="gray.600">
              {t('contact.form.subject') || 'Subject'}
            </FormLabel>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder={t('contact.form.subjectPlaceholder') || 'What is this about?'}
              bg={inputBg}
              border="2px solid"
              borderColor="transparent"
              borderRadius="12px"
              p={4}
              _focus={{
                borderColor: 'pink.400',
                boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                transform: 'translateY(-2px)'
              }}
              _hover={{
                transform: 'translateY(-1px)',
                borderColor: 'pink.200'
              }}
              transition="all 0.3s ease"
            />
            {errors.subject && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.subject}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={errors.message}>
            <FormLabel fontWeight="semibold" color="gray.600">
              {t('contact.form.message') || 'Message'}
            </FormLabel>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('contact.form.messagePlaceholder') || 'Your message here...'}
              bg={inputBg}
              border="2px solid"
              borderColor="transparent"
              borderRadius="12px"
              p={4}
              rows={5}
              resize="vertical"
              _focus={{
                borderColor: 'purple.400',
                boxShadow: '0 0 0 1px rgba(168, 85, 247, 0.3)',
                transform: 'translateY(-2px)'
              }}
              _hover={{
                transform: 'translateY(-1px)',
                borderColor: 'purple.200'
              }}
              transition="all 0.3s ease"
            />
            {errors.message && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.message}
              </Text>
            )}
          </FormControl>

          <MagneticButton>
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText={t('contact.form.sending') || 'Sending...'}
              size="lg"
              width="100%"
              bgGradient="linear(to-r, pink.400, purple.600)"
              color="white"
              borderRadius="12px"
              p={6}
              fontWeight="bold"
              fontSize="lg"
              _hover={{
                bgGradient: "linear(to-r, pink.500, purple.700)",
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 25px rgba(236, 72, 153, 0.3)'
              }}
              _active={{
                transform: 'translateY(0)',
                boxShadow: '0 5px 15px rgba(236, 72, 153, 0.3)'
              }}
              transition="all 0.3s ease"
              leftIcon={<Icon as={FiMail} />}
            >
              {t('contact.form.send') || 'Send Message'}
            </Button>
          </MagneticButton>
        </VStack>

        <Box mt={8} textAlign="center">
          <Text fontSize="sm" color="gray.500" mb={4}>
            {t('contact.form.orConnect') || 'Or connect with me on'}
          </Text>
          <HStack spacing={4} justify="center">
            {[
              { icon: FiGithub, href: 'https://github.com/kyuna312', label: 'GitHub' },
              { icon: FiTwitter, href: 'https://twitter.com/m1or3n', label: 'Twitter' },
              { icon: FiLinkedin, href: 'https://linkedin.com/in/hattanzorg', label: 'LinkedIn' },
              { icon: FiInstagram, href: 'https://instagram.com/m1or3n', label: 'Instagram' }
            ].map((social, index) => (
              <MagneticButton key={social.label}>
                <Link
                  href={social.href}
                  isExternal
                  p={3}
                  borderRadius="full"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  _hover={{
                    bg: 'whiteAlpha.200',
                    borderColor: 'pink.300',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 5px 15px rgba(236, 72, 153, 0.2)'
                  }}
                  transition="all 0.3s ease"
                  aria-label={social.label}
                >
                  <Icon as={social.icon} boxSize={5} />
                </Link>
              </MagneticButton>
            ))}
          </HStack>
        </Box>
      </Box>
    </MotionBox>
  )
}

export default ContactForm
