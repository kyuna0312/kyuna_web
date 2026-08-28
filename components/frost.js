import { Box, HStack, Text } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'

// One branch of a six-fold ice dendrite: a spine with paired spurs.
const BRANCH_PATHS = [
  'M 0 0 L 0 -168',
  'M 0 -46 L -26 -72 M 0 -46 L 26 -72',
  'M 0 -88 L -34 -122 M 0 -88 L 34 -122',
  'M 0 -128 L -20 -148 M 0 -128 L 20 -148',
  'M 0 -168 L -8 -180 M 0 -168 L 8 -180 M 0 -168 L 0 -184',
]

// A frost dendrite that draws itself in once, then holds still.
export const FrostCrystal = ({ size = 420, delay = 0, opacity = 0.5, color = 'var(--chakra-colors-ice)', ...rest }) => {
  const reduced = useReducedMotion()

  return (
    <Box
      as={motion.svg}
      viewBox="-200 -200 400 400"
      width={`${size}px`}
      height={`${size}px`}
      opacity={opacity}
      pointerEvents="none"
      aria-hidden="true"
      {...rest}
    >
      {[0, 60, 120, 180, 240, 300].map(angle => (
        <g key={angle} transform={`rotate(${angle})`}>
          {BRANCH_PATHS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke={color}
              strokeWidth="1"
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.4,
                delay: delay + i * 0.25,
                ease: 'easeOut',
              }}
            />
          ))}
        </g>
      ))}
      <motion.path
        d="M 0 -14 L 12 -7 L 12 7 L 0 14 L -12 7 L -12 -7 Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      />
    </Box>
  )
}

// Small static crystal glyph — used in dividers and the logo. Never emoji.
export const CrystalMark = ({ size = 12, color = 'currentColor' }) => (
  <svg viewBox="-10 -10 20 20" width={size} height={size} aria-hidden="true">
    {[0, 60, 120].map(angle => (
      <line
        key={angle}
        x1="0" y1="-8" x2="0" y2="8"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        transform={`rotate(${angle})`}
      />
    ))}
  </svg>
)

// The Magia stage frame: a thin ink rectangle around the viewport with
// dashed elliptical arcs sweeping along the left and right edges —
// lifted from Shimoka's own 魔法少女まどか☆マギカ CSS project.
export const PageFrame = () => (
  <Box
    position="fixed"
    inset={{ base: '6px', md: '12px' }}
    border="1.5px solid"
    borderColor="ink"
    opacity={0.75}
    pointerEvents="none"
    zIndex={1400}
    aria-hidden="true"
  >
    <Box
      as="svg"
      position="absolute"
      inset={0}
      w="100%"
      h="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      display={{ base: 'none', md: 'block' }}
    >
      <path
        d="M 7 0 Q 1.5 50 7 100"
        fill="none"
        stroke="var(--chakra-colors-ink)"
        strokeWidth="1"
        strokeDasharray="5 4"
        opacity="0.4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 93 0 Q 98.5 50 93 100"
        fill="none"
        stroke="var(--chakra-colors-ink)"
        strokeWidth="1"
        strokeDasharray="5 4"
        opacity="0.4"
        vectorEffect="non-scaling-stroke"
      />
    </Box>
  </Box>
)

// The name, set like the MAGIA title: rules either side, one color per kanji —
// 霜 (frost) in Sayaka blue, 花 (flower) in Madoka pink.
export const ShimokaTitle = ({ fontSize = { base: '6xl', md: '8xl' }, ruleW = { base: '36px', md: '90px' } }) => (
  <HStack spacing={{ base: 4, md: 7 }} justify="center" align="center">
    <Box h="2px" w={ruleW} bg="ink" />
    <Text as="h1" fontFamily="heading" fontWeight="500" fontSize={fontSize} lineHeight="1.1" whiteSpace="nowrap">
      <Box as="span" color="ice">霜</Box>
      <Box as="span" color="bloom">花</Box>
    </Text>
    <Box h="2px" w={ruleW} bg="ink" />
  </HStack>
)

// Bilingual section eyebrow: a kanji in one soul-gem color, a hairline, a mono label.
export const Eyebrow = ({ kanji, color = 'bloom', children }) => (
  <HStack spacing={3} mb={5}>
    <Text fontFamily="heading" fontSize="lg" color={color} lineHeight="1">
      {kanji}
    </Text>
    <Box w="24px" h="1px" bg="hairline" />
    <Text
      fontFamily="mono"
      fontSize="xs"
      color="rime"
      textTransform="uppercase"
      letterSpacing="0.22em"
    >
      {children}
    </Text>
  </HStack>
)

// Quiet divider between sections.
export const CrystalDivider = ({ my = 20 }) => (
  <HStack my={my} spacing={4} aria-hidden="true">
    <Box flex={1} h="1px" bg="hairline" />
    <Box color="ice" opacity={0.7} display="flex">
      <CrystalMark size={11} />
    </Box>
    <Box flex={1} h="1px" bg="hairline" />
  </HStack>
)
