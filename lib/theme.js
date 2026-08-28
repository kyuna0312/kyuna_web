import { extendTheme } from '@chakra-ui/react';

// "Magia paper" (after Shimoka's own 魔法少女まどか☆マギカ project) × 霜花.
// Paper-white stage, thin ink frame, soul-gem accents used one at a time:
//   paper/pane: ground + surface · hairline: fine rules · ink: frame + headings
//   rime: body text · ice: Sayaka blue (frost, 霜) · bloom: Madoka pink-red (flower, 花)
//   gold: Mami yellow — used only where a third voice is truly needed.
// Dark mode is Homura's night violet, same rules inverted.
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  semanticTokens: {
    colors: {
      paper: { default: '#F7F4F0', _dark: '#17131C' },
      pane: { default: '#FFFFFF', _dark: '#1F1A26' },
      hairline: { default: '#DFD8D0', _dark: '#332B3E' },
      ink: { default: '#3B3442', _dark: '#EFEAF2' },
      rime: { default: '#6F6678', _dark: '#A99FB3' },
      // Light-mode accents darkened to hold WCAG AA (>=4.5:1) on paper for small text
      ice: { default: '#2F7489', _dark: '#96CEDA' },
      iceDim: { default: 'rgba(150, 206, 218, 0.18)', _dark: 'rgba(150, 206, 218, 0.10)' },
      bloom: { default: '#B04355', _dark: '#FDB6C6' },
      bloomDim: { default: 'rgba(253, 182, 198, 0.22)', _dark: 'rgba(253, 182, 198, 0.10)' },
      gold: { default: '#8A6531', _dark: '#FED29C' },
      // Aliases kept for older token names still in circulation
      night: { default: '#F7F4F0', _dark: '#17131C' },
      frost: { default: '#3B3442', _dark: '#EFEAF2' },
    },
  },
  fonts: {
    heading: `'Fraunces', 'Noto Serif JP', Georgia, serif`,
    body: `'IBM Plex Sans', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,
    mono: `'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace`,
  },
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        bg: 'paper',
        color: 'rime',
        backgroundImage: "url('/images/texture.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: '8rem',
        lineHeight: '1.7',
        fontSize: 'md',
      },
      '::selection': {
        background: 'bloomDim',
        color: 'ink',
      },
      '::-webkit-scrollbar': {
        width: '10px',
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'hairline',
        borderRadius: '10px',
      },
      ':focus-visible': {
        outline: '2px solid',
        outlineColor: 'ice',
        outlineOffset: '2px',
      },
      '@media (prefers-reduced-motion: reduce)': {
        '*, *::before, *::after': {
          animationDuration: '0.01ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.01ms !important',
          scrollBehavior: 'auto !important',
        },
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        color: 'ice',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        _hover: {
          color: 'bloom',
          textDecoration: 'none',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
        color: 'ink',
        fontWeight: '500',
        letterSpacing: '-0.01em',
      },
    },
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: '2px',
        transition: 'all 0.2s ease',
      },
      variants: {
        // Quiet control (navbar toggles, menu buttons)
        ghost: {
          color: 'rime',
          borderRadius: '2px',
          _hover: { bg: 'iceDim', color: 'frost' },
          _active: { bg: 'iceDim' },
        },
        // Primary: solid ink plate on paper
        frost: {
          bg: 'ink',
          color: 'paper',
          px: 7,
          py: 6,
          _hover: {
            bg: 'bloom',
            color: 'paper',
            transform: 'translateY(-1px)',
          },
        },
        // Secondary: hairline outline
        pane: {
          bg: 'transparent',
          color: 'ink',
          border: '1px solid',
          borderColor: 'hairline',
          px: 7,
          py: 6,
          _hover: {
            borderColor: 'ice',
            color: 'ice',
          },
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: 'pane',
          borderColor: 'hairline',
          borderRadius: '2px',
          py: 2,
        },
        item: {
          bg: 'transparent',
          color: 'rime',
          fontFamily: 'mono',
          fontSize: 'sm',
          py: 2.5,
          _hover: { bg: 'iceDim', color: 'frost' },
          _focus: { bg: 'iceDim' },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: 'pane',
            borderColor: 'hairline',
            borderRadius: '2px',
            _hover: { borderColor: 'ice' },
            _focus: { borderColor: 'ice', boxShadow: 'none' },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          bg: 'pane',
          borderColor: 'hairline',
          borderRadius: '2px',
          _hover: { borderColor: 'ice' },
          _focus: { borderColor: 'ice', boxShadow: 'none' },
        },
      },
    },
  },
});

export default theme;
