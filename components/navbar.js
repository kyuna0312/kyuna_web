import { forwardRef, useState, useEffect } from 'react';
import Logo from './logo';
import NextLink from 'next/link';
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
	useColorModeValue,
	HStack,
	Text,
	keyframes,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { IoLogoGithub, IoSparkles, IoHeart } from 'react-icons/io5';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionLink = motion(Link);

// Cute floating animation
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

// Sparkle animation
const sparkleAnimation = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
`;

const LinkItem = ({ href, path, target, children, icon, ...props }) => {
	const active = path === href;

	return (
		<NextLink href={href} scroll={false} passHref legacyBehavior>
			<MotionLink
				px={4}
				py={2}
				borderRadius="full"
				bg={active ? 'rgba(236, 72, 153, 0.1)' : 'transparent'}
				color={active ? 'pink.500' : 'inherit'}
				target={target}
				fontWeight="600"
				fontSize="sm"
				display="inline-flex"
				alignItems="center"
				gap={2}
				position="relative"
				border="2px solid"
				borderColor={active ? 'pink.300' : 'transparent'}
				whileHover={{ scale: 1.05, y: -2 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.2 }}
				_hover={{
					bg: 'rgba(236, 72, 153, 0.1)',
					color: 'pink.500',
					borderColor: 'pink.200',
					textDecoration: 'none',
				}}
				{...props}
			>
				{icon && <Box as={icon} size={14} />}
				{children}
				{active && (
					<Box
						as="span"
						position="absolute"
						top="-2px"
						right="-2px"
						fontSize="xs"
						animation={`${sparkleAnimation} 1.5s ease-in-out infinite`}
					>
						✨
					</Box>
				)}
			</MotionLink>
		</NextLink>
	);
};

const MenuLink = forwardRef((props, ref) => {
	return (
		<NextLink href={props.href} passHref legacyBehavior>
			<Link ref={ref} {...props} />
		</NextLink>
	);
});

MenuLink.displayName = 'MenuLink';

const Navbar = (props) => {
	const { path } = props;
	const { t } = useTranslation('common');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Call all hooks at top level
	const bgColor = useColorModeValue(
		'rgba(255, 255, 255, 0.85)',
		'rgba(26, 32, 44, 0.85)'
	);
	const borderColor = useColorModeValue(
		'rgba(236, 72, 153, 0.15)',
		'rgba(254, 128, 160, 0.2)'
	);
	const shadowColor = useColorModeValue(
		'0 8px 32px rgba(236, 72, 153, 0.1)',
		'0 8px 32px rgba(0, 0, 0, 0.3)'
	);

	return (
		<MotionBox
			position="fixed"
			as="nav"
			w="100%"
			bg={bgColor}
			css={{
				backdropFilter: 'blur(20px)',
				WebkitBackdropFilter: 'blur(20px)',
			}}
			borderBottom="1px solid"
			borderColor={borderColor}
			boxShadow={shadowColor}
			zIndex={1000}
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
			{...props}
		>
			{/* Cute decorative top border gradient */}
			<Box
				position="absolute"
				top={0}
				left={0}
				right={0}
				h="2px"
				bgGradient="linear(to-r, pink.300, purple.300, pink.400, purple.400, pink.300)"
				backgroundSize="200% 100%"
				animation="gradient 3s ease infinite"
				sx={{
					'@keyframes gradient': {
						'0%': { backgroundPosition: '0% 50%' },
						'50%': { backgroundPosition: '100% 50%' },
						'100%': { backgroundPosition: '0% 50%' },
					},
				}}
			/>

			<Container
				display="flex"
				maxW="container.lg"
				alignItems="center"
				py={3}
				px={{ base: 4, md: 6 }}
			>
				{/* Logo Section */}
				<MotionBox
					display="flex"
					alignItems="center"
					gap={2}
					whileHover={{ scale: 1.02 }}
				>
					<Logo />
				</MotionBox>

				{/* Desktop Navigation */}
				<Stack
					direction="row"
					display={{ base: 'none', md: 'flex' }}
					alignItems="center"
					spacing={2}
					ml={8}
					p={1}
					bg="rgba(0, 0, 0, 0.03)"
					borderRadius="full"
					border="1px solid"
					borderColor="rgba(0, 0, 0, 0.05)"
				>
					<LinkItem href="/projects" path={path} icon={IoSparkles}>
						{t('navigation.projects')}
					</LinkItem>
					<LinkItem href="/contact" path={path} icon={IoHeart}>
						{t('navbar.contact')}
					</LinkItem>
					<MotionLink
						href="https://github.com/kyuna312"
						target="_blank"
						px={4}
						py={2}
						borderRadius="full"
						bg="transparent"
						fontWeight="600"
						fontSize="sm"
						display="inline-flex"
						alignItems="center"
						gap={2}
						border="2px solid transparent"
						whileHover={{ scale: 1.05, y: -2 }}
						whileTap={{ scale: 0.95 }}
						_hover={{
							color: 'pink.500',
							bg: 'rgba(236, 72, 153, 0.1)',
							borderColor: 'pink.200',
							textDecoration: 'none',
						}}
					>
						<IoLogoGithub size={16} />
						<Text fontSize="sm">GitHub</Text>
					</MotionLink>
				</Stack>

				<Box flex={1} />

				{/* Right Section */}
				<HStack spacing={2}>
					{/* Cute decoration - only show on desktop after mount */}
					{mounted && (
						<Box
							display={{ base: 'none', lg: 'flex' }}
							alignItems="center"
							gap={1}
							mr={2}
							animation={`${floatAnimation} 3s ease-in-out infinite`}
						>
							<Text fontSize="sm" color="pink.400">♪</Text>
							<Text fontSize="xs" color="purple.400">♫</Text>
						</Box>
					)}

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
								color="pink.500"
								borderRadius="full"
								border="2px solid"
								borderColor="pink.200"
								bg="rgba(236, 72, 153, 0.05)"
								_hover={{
									bg: 'rgba(236, 72, 153, 0.15)',
									transform: 'scale(1.05)',
								}}
								_active={{
									bg: 'rgba(236, 72, 153, 0.2)',
									transform: 'scale(0.95)',
								}}
								transition="all 0.2s ease"
							/>
							<MenuList
								bg="white"
								borderColor="pink.200"
								borderRadius="2xl"
								border="2px solid"
								boxShadow="0 20px 60px rgba(236, 72, 153, 0.15)"
								p={3}
								overflow="hidden"
							>
								{/* Cute header in menu */}
								<Box
									textAlign="center"
									pb={3}
									mb={3}
									borderBottom="1px dashed"
									borderColor="pink.200"
								>
									<Text fontSize="sm" color="pink.500" fontWeight="600">
										✨ Navigation ✨
									</Text>
								</Box>

								<MenuItem
									as={MenuLink}
									href="/"
									bg="transparent"
									color="gray.700"
									_hover={{
										bg: 'rgba(236, 72, 153, 0.1)',
										color: 'pink.500',
									}}
									borderRadius="xl"
									mb={2}
									p={3}
									fontWeight="600"
									transition="all 0.2s ease"
								>
									<HStack spacing={2}>
										<Text>🏠</Text>
										<Text>{t('navigation.home')}</Text>
									</HStack>
								</MenuItem>
								<MenuItem
									as={MenuLink}
									href="/projects"
									bg="transparent"
									color="gray.700"
									_hover={{
										bg: 'rgba(236, 72, 153, 0.1)',
										color: 'pink.500',
									}}
									borderRadius="xl"
									mb={2}
									p={3}
									fontWeight="600"
									transition="all 0.2s ease"
								>
									<HStack spacing={2}>
										<Text>✨</Text>
										<Text>{t('navigation.projects')}</Text>
									</HStack>
								</MenuItem>
								<MenuItem
									as={MenuLink}
									href="/contact"
									bg="transparent"
									color="gray.700"
									_hover={{
										bg: 'rgba(236, 72, 153, 0.1)',
										color: 'pink.500',
									}}
									borderRadius="xl"
									mb={2}
									p={3}
									fontWeight="600"
									transition="all 0.2s ease"
								>
									<HStack spacing={2}>
										<Text>💌</Text>
										<Text>{t('navbar.contact')}</Text>
									</HStack>
								</MenuItem>
								<MenuItem
									as={Link}
									href="https://github.com/kyuna312"
									target="_blank"
									bg="transparent"
									color="gray.700"
									_hover={{
										bg: 'rgba(236, 72, 153, 0.1)',
										color: 'pink.500',
									}}
									borderRadius="xl"
									p={3}
									fontWeight="600"
									transition="all 0.2s ease"
								>
									<HStack spacing={2}>
										<IoLogoGithub size={18} />
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
