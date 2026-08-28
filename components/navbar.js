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
	HStack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { IoLogoGithub } from 'react-icons/io5';
import { useTranslation } from 'next-i18next';

const LinkItem = ({ href, path, target, children, ...props }) => {
	const active = path === href;

	return (
		<Link
			as={NextLink}
			href={href}
			scroll={false}
			px={3}
			py={2}
			target={target}
			fontFamily="mono"
			fontSize="sm"
			letterSpacing="0.06em"
			color={active ? 'frost' : 'rime'}
			borderBottom="1px solid"
			borderColor={active ? 'ice' : 'transparent'}
			_hover={{
				color: 'frost',
				borderColor: 'hairline',
				textDecoration: 'none',
			}}
			transition="color 0.2s ease, border-color 0.2s ease"
			{...props}
		>
			{children}
		</Link>
	);
};

const Navbar = (props) => {
	const { path } = props;
	const { t } = useTranslation('common');

	return (
		<Box
			as="nav"
			w="100%"
			borderBottom="1px solid"
			borderColor="hairline"
			zIndex={10}
			{...props}
		>
			<Container
				display="flex"
				maxW="container.lg"
				alignItems="center"
				py={4}
				px={{ base: 4, md: 6 }}
			>
				<Logo />

				<Box flex={1} />

				{/* Desktop navigation */}
				<Stack
					direction="row"
					display={{ base: 'none', md: 'flex' }}
					alignItems="center"
					spacing={1}
					mr={4}
				>
					<LinkItem href="/projects" path={path}>
						{t('navigation.projects')}
					</LinkItem>
					<LinkItem href="/contact" path={path}>
						{t('navbar.contact')}
					</LinkItem>
					<Link
						href="https://github.com/kyuna0312"
						target="_blank"
						px={3}
						py={2}
						fontFamily="mono"
						fontSize="sm"
						letterSpacing="0.06em"
						color="rime"
						display="inline-flex"
						alignItems="center"
						gap={2}
						_hover={{ color: 'frost', textDecoration: 'none' }}
						transition="color 0.2s ease"
					>
						<IoLogoGithub size={15} />
						github
					</Link>
				</Stack>

				<HStack spacing={1}>
					<ColorModeToggle />
					<LanguageSwitcher />

					{/* Mobile menu */}
					<Box display={{ base: 'inline-block', md: 'none' }}>
						<Menu isLazy>
							<MenuButton
								as={IconButton}
								icon={<HamburgerIcon />}
								variant="ghost"
								aria-label="Navigation menu"
								size="md"
								color="frost"
								borderRadius="2px"
								_hover={{ bg: 'iceDim' }}
							/>
							<MenuList
								bg="pane"
								borderColor="hairline"
								borderRadius="2px"
								py={2}
							>
								<MenuItem as={NextLink} href="/" bg="transparent" color="rime" fontFamily="mono" fontSize="sm" py={2.5} _hover={{ bg: 'iceDim', color: 'frost' }}>
									{t('navigation.home')}
								</MenuItem>
								<MenuItem as={NextLink} href="/projects" bg="transparent" color="rime" fontFamily="mono" fontSize="sm" py={2.5} _hover={{ bg: 'iceDim', color: 'frost' }}>
									{t('navigation.projects')}
								</MenuItem>
								<MenuItem as={NextLink} href="/contact" bg="transparent" color="rime" fontFamily="mono" fontSize="sm" py={2.5} _hover={{ bg: 'iceDim', color: 'frost' }}>
									{t('navbar.contact')}
								</MenuItem>
								<MenuItem as={Link} href="https://github.com/kyuna0312" target="_blank" bg="transparent" color="rime" fontFamily="mono" fontSize="sm" py={2.5} _hover={{ bg: 'iceDim', color: 'frost' }}>
									GitHub
								</MenuItem>
							</MenuList>
						</Menu>
					</Box>
				</HStack>
			</Container>
		</Box>
	);
};

export default Navbar;
