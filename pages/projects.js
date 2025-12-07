import { Container, SimpleGrid, Text, VStack, Badge, HStack, Box, Heading, Flex } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import { ProjectGridItem} from '../components/grid-item';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  ElegantBackground,
  ElegantSection,
  ElegantText,
} from '../components/elegant-elements';
import {
  HexagonProjectCard,
  MasonryProjectGrid,
  ProjectStats,
  SectionDivider,
} from '../components/unique-project-elements';
import { ConstellationBackground } from '../components/projects-background-effects';
import { motion } from 'framer-motion';

import nomadx from '../public/images/works/nomadx.png';
import mongolnet from '../public/images/works/mongolnet.png';
import nyanmarkdown from '../public/images/works/nyanmarkdown.png';
import madoka_react from '../public/images/works/madoka_react.png';

const MotionBox = motion(Box);

// Elegant Project Card Component
const ElegantProjectCard = ({ children, title, thumbnail, url, tags = [], delay = 0, ...props }) => {
	return (
		<ElegantSection delay={delay} {...props}>
			<VStack spacing={4} align="start">
				<ProjectGridItem
					title={title}
					thumbnail={thumbnail}
					url={url}
					{...props}
				>
					{children}
				</ProjectGridItem>
				{tags.length > 0 && (
					<HStack spacing={2} wrap="wrap">
						{tags.map((tag, index) => (
							<Badge
								key={index}
								colorScheme="pink"
								variant="subtle"
								borderRadius="full"
								px={3}
								py={1}
								fontSize="xs"
								fontWeight="semibold"
							>
								{tag}
							</Badge>
						))}
					</HStack>
				)}
			</VStack>
		</ElegantSection>
	);
};

const Projects = () => {
	const { t } = useTranslation('common');

	// Project statistics for visual impact
	const projectStats = [
		{ value: "15+", label: "Projects" },
		{ value: "5+", label: "Technologies" },
		{ value: "3+", label: "Years Experience" },
		{ value: "∞", label: "Passion" }
	];

 	return (
		<Layout title={t('projects.title')}>
			<ElegantBackground>
				<ConstellationBackground />
				<Container maxW="container.xl" paddingTop={20}>
					{/* Hero Section with Enhanced Animation */}
					<MotionBox
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: "easeOut" }}
						textAlign="center"
						mb={16}
					>
						<Heading
							as="h1"
							fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
							fontFamily="'Playfair Display', serif"
							bgGradient="linear(to-r, pink.400, rose.400, purple.500)"
							bgClip="text"
							mb={6}
							fontWeight="bold"
						>
							Creative Universe
						</Heading>
						<Text
							fontSize={{ base: "lg", md: "xl" }}
							maxW="800px"
							mx="auto"
							lineHeight="tall"
							opacity={0.9}
						>
							Explore a curated collection of digital masterpieces where innovation
							meets artistry. Each project tells a unique story of creativity,
							technical excellence, and passionate craftsmanship.
						</Text>
					</MotionBox>

					{/* Project Statistics */}
					<ProjectStats stats={projectStats} delay={0.3} />

					{/* Section Divider */}
					<SectionDivider delay={0.5} />

					{/* Featured Projects Section */}
					<VStack spacing={12} align="stretch">
						<MotionBox
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.7 }}
						>
							<Heading
								as="h2"
								fontSize={{ base: "2xl", md: "3xl" }}
								fontFamily="'Playfair Display', serif"
								mb={8}
								textAlign="center"
							>
								Featured Projects
							</Heading>
						</MotionBox>

						{/* Unique Masonry Grid Layout */}
						<MasonryProjectGrid>
							<HexagonProjectCard
								delay={0.8}
								featured
								title={t('projects.NomadX')}
								description={t('projects.NomadXDescription')}
								thumbnail={nomadx}
								url='https://nomadx.world'
								github='https://github.com/kyuna312/nomadx'
								tech={['React', 'Next.js', 'TypeScript', 'Chakra UI', 'Framer Motion']}
								gridColumn={{ lg: "span 2" }}
							/>

							<HexagonProjectCard
								delay={0.9}
								title={t('projects.madoka_react')}
								description={t('projects.madoka_reactDescription')}
								thumbnail={madoka_react}
								url='https://madoka-kappa.vercel.app'
								github='https://github.com/kyuna312/madoka-react'
								tech={['React', 'CSS3', 'Animation', 'GSAP']}
							/>

							<HexagonProjectCard
								delay={1.0}
								title={t('projects.mongolnet')}
								description={t('projects.mongolnetDescription')}
								thumbnail={mongolnet}
								url='https://mongol.net'
								github='https://github.com/kyuna312/mongolnet'
								tech={['Full Stack', 'Node.js', 'MongoDB', 'Express']}
							/>

							<HexagonProjectCard
								delay={1.1}
								title={t('projects.NyanMarkDown')}
								description={t('projects.NyanMarkDownDescription')}
								thumbnail={nyanmarkdown}
								url='https://github.com/kyuna312/NyanVim'
								github='https://github.com/kyuna312/NyanVim'
								tech={['Vim', 'Lua', 'Tools', 'Open Source']}
								gridColumn={{ md: "span 2", lg: "span 1" }}
							/>
						</MasonryProjectGrid>
					</VStack>

					{/* Bottom Section */}
					<MotionBox
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.3 }}
						textAlign="center"
						mt={20}
						mb={10}
					>
						<Text
							fontSize="lg"
							opacity={0.8}
							maxW="600px"
							mx="auto"
							fontStyle="italic"
						>
							"Every project is a journey of discovery, where challenges become
							opportunities and ideas transform into digital reality."
						</Text>
					</MotionBox>
				</Container>
			</ElegantBackground>
		</Layout>
	);
};

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default Projects;
