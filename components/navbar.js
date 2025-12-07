import { forwardRef } from 'react';
import Logo from './logo';
import NextLink from 'next/link';
import LanguageSwitcher from './language-switcher';
import ColorModeToggle from './color-mode-toggle';
import { MagneticButton, RippleEffect, HoverCard } from './interactive-effects-v2';
import {
	Container,
	Box,
	Link,
	Stack,
	Heading,
	Flex,
	Menu,
	MenuItem,
	MenuList,
	MenuButton,
	IconButton,
	useColorModeValue,
	HStack,
	Text,
	Avatar
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { IoLogoGithub } from 'react-icons/io5';
import { useTranslation } from 'next-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useClientSide } from './use-client-side';
import ClientOnly from './client-only';

const MotionBox = motion(Box);
const MotionContainer = motion(Container);

const LinkItem = ({ href, path, target, children, ...props }) => {
	const isClient = useClientSide();
	const active = path === href;
	const { scrollY } = useScroll();

	const linkBg = useColorModeValue(
		active ? 'glass.light' : 'glass.subtle',
		active ? 'glass.dark' : 'glass.darkSubtle'
	);

	const linkColor = useColorModeValue(
		active ? 'feminine.600' : 'elegant.700',
		active ? 'feminine.300' : 'elegant.300'
	);

	const borderColor = useColorModeValue(
		active ? 'rgba(236, 72, 153, 0.3)' : 'rgba(255, 255, 255, 0.1)',
		active ? 'rgba(254, 128, 160, 0.3)' : 'rgba(255, 255, 255, 0.05)'
	);

	// During SSR, use a minimal version without interactive elements
	if (!isClient) {
		return (
			<Box px={2} py={1}>
				<NextLink href={href} scroll={false} passHref legacyBehavior>
					<Link px={6} py={3} color={linkColor} target={target}>{children}</Link>
				</NextLink>
			</Box>
		);
	}

	// Enhanced interactive version only on client-side
	return (
		<div suppressHydrationWarning>
			<MagneticButton strength={0.2}>
				<HoverCard
					hoverScale={1.02}
					glowEffect={active}
					shadowEffect={true}
				>
					<NextLink href={href} scroll={false} passHref legacyBehavior>
						<MotionBox
							as={Link}
							px={6}
							py={3}
							borderRadius="xl"
							bg={linkBg}
							color={linkColor}
							target={target}
							fontWeight="600"
							fontSize="sm"
							position="relative"
							border="1px solid"
							borderColor={borderColor}
							backdropFilter="blur(10px)"
							whileHover={{
								y: -2,
								boxShadow: active
									? '0 8px 32px rgba(236, 72, 153, 0.3)'
									: '0 8px 32px rgba(0, 0, 0, 0.1)'
							}}
							transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
							{...props}
						>
							{children}
							<RippleEffect color={active ? 'rgba(236, 72, 153, 0.3)' : 'rgba(255, 255, 255, 0.2)'} />
						</MotionBox>
					</NextLink>
				</HoverCard>
			</MagneticButton>
		</div>
	);
};

const MenuLink = forwardRef((props, ref) => {
  // Use NextLink directly to avoid hydration issues
  return (
    <NextLink href={props.href} passHref legacyBehavior>
      <Link ref={ref} {...props} suppressHydrationWarning />
    </NextLink>
  );
});

const Navbar = (props) => {
	const { path } = props;
	const { t } = useTranslation('common');
	const isClient = useClientSide();
	const { scrollY } = useScroll();

	const bgColor = useColorModeValue('glass.light', 'glass.dark');
	const borderColor = useColorModeValue('rgba(236, 72, 153, 0.1)', 'rgba(254, 128, 160, 0.2)');

	// Default values for SSR
	const defaultNavStyle = {
		opacity: 0.95,
		backdropFilter: 'blur(20px)',
	};

	// Dynamic navbar effects based on scroll - these will only be active on client
	const navOpacity = isClient ? useTransform(scrollY, [0, 100], [0.95, 1]) : undefined;
	const navBlur = isClient ? useTransform(scrollY, [0, 100], [20, 30]) : undefined;
	const navScale = isClient ? useTransform(scrollY, [0, 100], [1, 0.98]) : undefined;

	// Use different rendering strategies for SSR vs client
	if (!isClient) {
		// Simple version for SSR to avoid hydration mismatches
		return (
			<Box
				as="nav"
				position="fixed"
				w="100%"
				bg={bgColor}
				css={{
					backdropFilter: 'blur(20px)',
					WebkitBackdropFilter: 'blur(20px)',
				}}
				opacity={0.95}
				borderBottom={`1px solid ${borderColor}`}
				boxShadow="0 4px 32px rgba(0, 0, 0, 0.1)"
				zIndex={1000}
				{...props}
			>
				{/* SSR-friendly navbar content will go here */}
				<Container
					display="flex"
					p={2}
					maxW="container.md"
					flexWrap="wrap"
					alignItems="center"
					justifyContent="space-between"
				>
					<Logo />
					{/* Minimal navigation for SSR */}
				</Container>
			</Box>
		);
	}

	// Enhanced version only rendered on client
	return (
		<div suppressHydrationWarning>
			<MotionBox
				position="fixed"
				as="nav"
				w="100%"
				bg={bgColor}
				style={{
					opacity: navOpacity,
					scale: navScale,
					backdropFilter: `blur(${navBlur ? navBlur.get() : 20}px)`,
				}}
				css={{
					WebkitBackdropFilter: 'blur(20px)',
				}}
				borderBottom={`1px solid ${borderColor}`}
				boxShadow="0 4px 32px rgba(0, 0, 0, 0.1)"
				zIndex={1000}
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			{...props}
		>
			<Container display="flex" maxW="container.lg" alignItems="center" py={4}>
				<MagneticButton>
					<MotionBox
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.2 }}
						display="flex"
						alignItems="center"
						gap={3}
					>
						<Avatar
							size="sm"
							name="Kyuna"
							src="/images/amane.jpg"
							border="2px solid"
							borderColor="rgba(236, 72, 153, 0.2)"
							_hover={{
								transform: 'scale(1.1) rotate(5deg)',
								borderColor: 'feminine.400',
								boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)'
							}}
							transition="all 0.3s ease"
						/>
						<Heading
							as="h1"
							size="lg"
							letterSpacing="tight"
							fontWeight="700"
							fontFamily="'Playfair Display', serif"
							bgGradient="linear(to-r, feminine.500, rose.400, purple.500)"
							bgClip="text"
							_hover={{
								bgGradient: "linear(to-r, feminine.600, rose.500, purple.600)"
							}}
							transition="all 0.3s ease"
						>
							<Logo />
						</Heading>
					</MotionBox>
				</MagneticButton>

				<Stack
					direction={{ base: 'column', md: 'row' }}
					display={{ base: 'none', md: 'flex' }}
					width={{ base: 'full', md: 'auto' }}
					alignItems="center"
					spacing={3}
					ml={8}
				>
					<LinkItem href="/projects" path={path}>
						{t('navigation.projects')}
					</LinkItem>
					<LinkItem href="/contact" path={path}>
						{t('navbar.contact')}
					</LinkItem>
					<MagneticButton>
						<Link
							href="https://github.com/kyuna312"
							target="_blank"
							px={6}
							py={3}
							borderRadius="16px"
							bg="rgba(255, 255, 255, 0.05)"
							color="elegant.700"
							fontWeight="600"
							fontSize="sm"
							border="1px solid"
							borderColor="transparent"
							backdropFilter="blur(10px)"
							display="inline-flex"
							alignItems="center"
							gap={2}
							transition="all 0.3s ease"
							_hover={{
								color: 'feminine.600',
								bg: 'rgba(236, 72, 153, 0.1)',
								borderColor: 'rgba(236, 72, 153, 0.3)',
								transform: 'translateY(-2px)',
								boxShadow: '0 8px 25px rgba(236, 72, 153, 0.2)'
							}}
						>
							<IoLogoGithub size={18} />
							<Text fontSize="sm">GitHub</Text>
						</Link>
					</MagneticButton>
				</Stack>

				<Box flex={1} />

				<HStack spacing={4}>
					<MagneticButton>
						<ColorModeToggle />
					</MagneticButton>
					<MagneticButton>
						<LanguageSwitcher />
					</MagneticButton>
					<Box display={{ base: 'inline-block', md: 'none' }}>
						<Menu isLazy>
							<MagneticButton>
								<MenuButton
									as={IconButton}
									icon={<HamburgerIcon />}
									variant="ghost"
									aria-label="Navigation Menu"
									size="md"
									color="feminine.600"
									borderRadius="12px"
									border="1px solid"
									borderColor="transparent"
									bg="rgba(255, 255, 255, 0.05)"
									backdropFilter="blur(10px)"
									_hover={{
										bg: 'rgba(236, 72, 153, 0.1)',
										borderColor: 'rgba(236, 72, 153, 0.3)',
										transform: 'scale(1.1) translateY(-2px)',
										boxShadow: '0 8px 25px rgba(236, 72, 153, 0.2)'
									}}
									_active={{
										bg: 'rgba(236, 72, 153, 0.2)',
										transform: 'scale(0.95)'
									}}
									transition="all 0.3s ease"
								/>
							</MagneticButton>
							<MenuList
								bg={useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)')}
								borderColor="feminine.200"
								borderRadius="20px"
								border="1px solid"
								boxShadow="0 20px 60px rgba(0, 0, 0, 0.15)"
								backdropFilter="blur(30px)"
								p={3}
								overflow="hidden"
							>
								<MenuItem
									as={MenuLink}
									href="/"
									bg="transparent"
									color={useColorModeValue('elegant.700', 'whiteAlpha.900')}
									_hover={{
										bg: 'rgba(236, 72, 153, 0.1)',
										color: 'feminine.600',
										transform: 'translateX(4px)'
									}}
									borderRadius="12px"
									mb={2}
									p={3}
									fontWeight="600"
									transition="all 0.3s ease"
								>
									{t('navigation.home')}
								</MenuItem>
								<MenuItem
									as={MenuLink}
									href="/projects"
									bg="transparent"
									color={useColorModeValue('elegant.700', 'whiteAlpha.900')}
									_hover={{
										bg: 'rgba(236, 72, 153, 0.1)',
										color: 'feminine.600',
										transform: 'translateX(4px)'
									}}
									borderRadius="12px"
									mb={2}
									p={3}
									fontWeight="600"
									transition="all 0.3s ease"
								>
									{t('navigation.projects')}
								</MenuItem>
								<MenuItem
									as={MenuLink}
									href="/contact"
									bg="transparent"
									color={useColorModeValue('elegant.700', 'whiteAlpha.900')}
									_hover={{
										bg: 'rgba(236, 72, 153, 0.1)',
										color: 'feminine.600',
										transform: 'translateX(4px)'
									}}
									borderRadius="12px"
									mb={2}
									p={3}
									fontWeight="600"
									transition="all 0.3s ease"
								>
									{t('navbar.contact')}
								</MenuItem>
								<MenuItem
									as={Link}
									href="https://github.com/kyuna312"
									target="_blank"
									bg="transparent"
									color={useColorModeValue('elegant.700', 'whiteAlpha.900')}
									_hover={{
										bg: 'rgba(236, 72, 153, 0.1)',
										color: 'feminine.600',
										transform: 'translateX(4px)'
									}}
									borderRadius="12px"
									display="flex"
									alignItems="center"
									gap={2}
									p={3}
									fontWeight="600"
									transition="all 0.3s ease"
								>
									<IoLogoGithub size={18} />
									GitHub
								</MenuItem>
							</MenuList>
            </Menu>
          </Box>
        </HStack>
			</Container>
		</MotionBox>
		</div>
	);
};

export default Navbar;
