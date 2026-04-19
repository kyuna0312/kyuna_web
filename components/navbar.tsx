import { forwardRef, useState, useEffect } from 'react';
import Logo from './logo';
import NextLink from 'next/link';
import type { LinkItemProps, MenuLinkProps, NavbarProps } from '@/types';
import LanguageSwitcher from './language-switcher';
import ColorModeToggle from './color-mode-toggle';
import {
  Container,
  Box,
  Link,
  Stack,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  HStack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { IoLogoGithub } from 'react-icons/io5';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionLink = motion(Link);

const LinkItem = ({ href, path, target, children, ...props }: LinkItemProps) => {
  const active = path === href;

  return (
    <NextLink href={href} scroll={false} passHref legacyBehavior>
      <MotionLink
        px={4}
        py={2}
        borderRadius="none"
        bg="transparent"
        color={active ? '#4db8d4' : '#7899b0'}
        target={target}
        fontWeight="500"
        fontSize="sm"
        letterSpacing="0.06em"
        textTransform="uppercase"
        display="inline-flex"
        alignItems="center"
        gap={2}
        position="relative"
        borderBottom="1px solid"
        borderColor={active ? '#4db8d4' : 'transparent'}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
        _hover={{
          color: '#4db8d4',
          borderColor: 'rgba(77, 184, 212, 0.4)',
          textDecoration: 'none',
        }}
        {...props}
      >
        {children}
      </MotionLink>
    </NextLink>
  );
};

const MenuLink = forwardRef<HTMLAnchorElement, MenuLinkProps>((props, ref) => {
  const { href, ...rest } = props;
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Link ref={ref} {...rest} />
    </NextLink>
  );
});

MenuLink.displayName = 'MenuLink';

const Navbar = (props: NavbarProps) => {
  const { path } = props;
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initialBg = mounted ? 'rgba(8, 12, 20, 0.92)' : 'transparent';
  const initialBorder = mounted ? '#1e2d42' : 'transparent';

  return (
    <MotionBox
      position="fixed"
      as="nav"
      w="100%"
      bg={initialBg}
      css={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      borderBottom="1px solid"
      borderColor={initialBorder}
      zIndex={1000}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      {...props}
    >
      <Container
        display="flex"
        maxW="container.lg"
        alignItems="center"
        py={3}
        px={{ base: 4, md: 6 }}
      >
        {/* Logo */}
        <MotionBox display="flex" alignItems="center" whileHover={{ scale: 1.02 }}>
          <Logo />
        </MotionBox>

        {/* Desktop Navigation */}
        <Stack
          direction="row"
          display={{ base: 'none', md: 'flex' }}
          alignItems="center"
          spacing={1}
          ml={8}
        >
          <LinkItem href="/projects" path={path}>
            {t('navigation.projects')}
          </LinkItem>
          <LinkItem href="/contact" path={path}>
            {t('navbar.contact')}
          </LinkItem>
          <MotionLink
            href="https://github.com/kyuna0312"
            target="_blank"
            px={4}
            py={2}
            color="#7899b0"
            fontWeight="500"
            fontSize="sm"
            letterSpacing="0.06em"
            textTransform="uppercase"
            display="inline-flex"
            alignItems="center"
            gap={2}
            borderBottom="1px solid transparent"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            _hover={{
              color: '#4db8d4',
              borderColor: 'rgba(77, 184, 212, 0.4)',
              textDecoration: 'none',
            }}
          >
            <IoLogoGithub size={15} />
            <Text fontSize="sm">GitHub</Text>
          </MotionLink>
        </Stack>

        <Box flex={1} />

        {/* Right Section */}
        <HStack spacing={2}>
          <ColorModeToggle />
          <LanguageSwitcher />

          {/* Mobile Menu */}
          <Box display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="ghost"
                aria-label="Navigation Menu"
                size="md"
                color="#7899b0"
                borderRadius="none"
                border="1px solid #1e2d42"
                bg="transparent"
                _hover={{
                  bg: 'rgba(77, 184, 212, 0.06)',
                  color: '#4db8d4',
                  borderColor: '#4db8d4',
                }}
                _active={{ bg: 'rgba(77, 184, 212, 0.1)' }}
                transition="all 0.2s ease"
              />
              <MenuList
                bg="#0d1525"
                borderColor="#1e2d42"
                borderRadius="none"
                border="1px solid"
                boxShadow="0 20px 60px rgba(0, 0, 0, 0.5)"
                p={2}
                minW="200px"
              >
                <MenuItem
                  as={MenuLink}
                  href="/"
                  bg="transparent"
                  color="#7899b0"
                  _hover={{ bg: 'rgba(77, 184, 212, 0.06)', color: '#4db8d4' }}
                  borderRadius="none"
                  mb={1}
                  p={3}
                  fontSize="xs"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  fontWeight="500"
                >
                  {t('navigation.home')}
                </MenuItem>
                <MenuItem
                  as={MenuLink}
                  href="/projects"
                  bg="transparent"
                  color="#7899b0"
                  _hover={{ bg: 'rgba(77, 184, 212, 0.06)', color: '#4db8d4' }}
                  borderRadius="none"
                  mb={1}
                  p={3}
                  fontSize="xs"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  fontWeight="500"
                >
                  {t('navigation.projects')}
                </MenuItem>
                <MenuItem
                  as={MenuLink}
                  href="/contact"
                  bg="transparent"
                  color="#7899b0"
                  _hover={{ bg: 'rgba(77, 184, 212, 0.06)', color: '#4db8d4' }}
                  borderRadius="none"
                  mb={1}
                  p={3}
                  fontSize="xs"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  fontWeight="500"
                >
                  {t('navbar.contact')}
                </MenuItem>
                <MenuItem
                  as={Link}
                  href="https://github.com/kyuna0312"
                  target="_blank"
                  bg="transparent"
                  color="#7899b0"
                  _hover={{ bg: 'rgba(77, 184, 212, 0.06)', color: '#4db8d4' }}
                  borderRadius="none"
                  p={3}
                  fontSize="xs"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  fontWeight="500"
                >
                  <HStack spacing={2}>
                    <IoLogoGithub size={14} />
                    <Text>GitHub</Text>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </Container>
    </MotionBox>
  );
};

export default Navbar;
