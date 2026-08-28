import {
  Box,
  HStack,
  Text,
  Link,
  Container,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { IoLogoGithub, IoLogoTwitter, IoLogoInstagram } from 'react-icons/io5';
import { CrystalMark } from './frost';

const footerQuotes = {
  en: 'One step, two steps — the road to the future is under your feet.',
  jp: '一歩、二歩…「未来」への道は足元にある。',
  mn: 'Нэг алхам, хоёр алхам — ирээдүй рүү чиглэх зам хөл дор байна.',
};

const socialLinks = [
  { icon: IoLogoGithub, href: 'https://github.com/kyuna312', label: 'GitHub' },
  { icon: IoLogoTwitter, href: 'https://twitter.com/m1or3n', label: 'Twitter' },
  { icon: IoLogoInstagram, href: 'https://instagram.com/m1or3n', label: 'Instagram' },
];

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <Box as="footer" borderTop="1px solid" borderColor="hairline" mt={24} py={12}>
      <Container maxW="container.lg" px={{ base: 4, md: 6 }}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          spacing={8}
        >
          <Box>
            <HStack spacing={2.5} mb={2}>
              <Box color="ice" display="flex">
                <CrystalMark size={12} />
              </Box>
              <Text fontFamily="heading" fontSize="lg" color="frost">
                霜花
              </Text>
              <Text fontFamily="mono" fontSize="xs" color="rime" letterSpacing="0.12em">
                shimoka · ulaanbaatar
              </Text>
            </HStack>
            <Text fontSize="sm" color="rime" fontStyle="italic" maxW="420px">
              {footerQuotes[t('locale')] || footerQuotes.en}
            </Text>
          </Box>

          <HStack spacing={5}>
            {socialLinks.map(social => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                color="rime"
                aria-label={social.label}
                _hover={{ color: 'bloom' }}
                transition="color 0.2s ease"
              >
                <social.icon size={18} />
              </Link>
            ))}
          </HStack>
        </Stack>

        <Text fontFamily="mono" fontSize="xs" color="rime" opacity={0.7} mt={10} letterSpacing="0.06em">
          © {new Date().getFullYear()} 霜花 (Shimoka)
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
