import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  VStack,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

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

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid')
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.errors.subjectRequired')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired')
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.errors.messageMinLength')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const mailtoLink = `mailto:hello@hattanzorg.dev?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`
      window.open(mailtoLink, '_blank')

      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.description'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const labelProps = {
    fontFamily: 'mono',
    fontSize: 'xs',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rime',
  }

  return (
    <VStack spacing={6} as="form" onSubmit={handleSubmit} align="stretch">
      <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel {...labelProps}>{t('contact.form.name')}</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('contact.form.namePlaceholder')}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel {...labelProps}>{t('contact.form.email')}</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('contact.form.emailPlaceholder')}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
      </Stack>

      <FormControl isInvalid={!!errors.subject}>
        <FormLabel {...labelProps}>{t('contact.form.subject')}</FormLabel>
        <Input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={t('contact.form.subjectPlaceholder')}
        />
        <FormErrorMessage>{errors.subject}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.message}>
        <FormLabel {...labelProps}>{t('contact.form.message')}</FormLabel>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t('contact.form.messagePlaceholder')}
          rows={6}
          resize="vertical"
        />
        <FormErrorMessage>{errors.message}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        variant="frost"
        alignSelf="flex-start"
        isLoading={isSubmitting}
        loadingText={t('contact.form.sending')}
      >
        {t('contact.form.send')}
      </Button>
    </VStack>
  )
}

export default ContactForm
