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
import { site } from '../lib/site'

const ContactForm = () => {
  const { t } = useTranslation('common')
  const toast = useToast()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    // The form composes a mailto: draft in the visitor's own mail app — there
    // is no send API, so the toast says what actually happened and the typed
    // message is kept in case no mail app opened.
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`

    toast({
      title: t('contact.success.title'),
      description: t('contact.success.description', { email: site.email }),
      status: 'info',
      duration: 8000,
      isClosable: true,
    })
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

      <Button type="submit" variant="frost" alignSelf="flex-start">
        {t('contact.form.send')}
      </Button>
    </VStack>
  )
}

export default ContactForm
