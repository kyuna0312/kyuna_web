import { extendTheme } from '@chakra-ui/react';

// Yotsuba Maya — Mahouka-inspired palette
// Violet primary + crimson accent + purple-black backgrounds
// "feminine" key kept to avoid breaking existing JSX refs
const icePalette = {
  50: '#f5f0ff',
  100: '#ede0ff',
  200: '#d9bfff',
  300: '#b890f5',
  400: '#7c3aed',  // primary violet
  500: '#6d28d9',
  600: '#5b21b6',
  700: '#4c1d95',
  800: '#3b1678',
  900: '#2e1065',
};

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  colors: {
    // Primary accent — electric ice blue (replaces kawaii pink)
    ice: icePalette,
    // Keep "feminine" alias so existing JSX (navbar active states, etc.) still compiles
    feminine: icePalette,
    // Steel — lavender-grey secondary
    steel: {
      50: '#f7f4fc',
      100: '#ede6f8',
      200: '#d8cdf0',
      300: '#bfaee4',
      400: '#a088c0',
      500: '#846aa0',
      600: '#6a5280',
      700: '#523d64',
      800: '#3a2a48',
      900: '#241a30',
    },
    // Gold — crimson accent (Yotsuba clan danger)
    gold: {
      50: '#fff0f3',
      100: '#ffd6dd',
      200: '#ffa8b5',
      300: '#f06880',
      400: '#c41e3a',  // primary crimson
      500: '#a01830',
      600: '#861026',
      700: '#6e0c1e',
      800: '#580a18',
      900: '#3d0710',
    },
    // Midnight — purple-black background shades
    midnight: {
      50: '#1e0a30',
      100: '#120a1e',
      200: '#0d0818',
      300: '#0a0010',
      400: '#070008',
      500: '#040005',
    },
    // Keep lavender pointing to steel so any lavender.X refs don't break
    lavender: {
      50: '#f7f4fc',
      100: '#ede6f8',
      200: '#d8cdf0',
      300: '#bfaee4',
      400: '#a088c0',
      500: '#846aa0',
      600: '#6a5280',
      700: '#523d64',
      800: '#3a2a48',
      900: '#241a30',
    },
    // Kept for any remaining refs — mapped to purple neutral
    kawaii: {
      50: '#f7f4fc',
      100: '#ede6f8',
      200: '#d8cdf0',
      300: '#bfaee4',
      400: '#a088c0',
      500: '#846aa0',
      600: '#6a5280',
      700: '#523d64',
      800: '#3a2a48',
      900: '#241a30',
    },
    sakura: icePalette,
    elegant: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    rose: {
      50: '#f0f9fc',
      100: '#d0eef5',
      200: '#a1dceb',
      300: '#6cc6de',
      400: '#4db8d4',
      500: '#2a9dba',
      600: '#1e7d96',
      700: '#165e72',
      800: '#0f4050',
      900: '#082330',
    },
    brand: icePalette,
    glass: {
      light: 'rgba(255, 255, 255, 0.05)',
      dark: 'rgba(10, 0, 16, 0.85)',
      ice: 'rgba(124, 58, 237, 0.08)',
      steel: 'rgba(160, 136, 192, 0.08)',
    },
    // Explicit design tokens
    bg: {
      page: '#0a0010',
      card: '#0d0818',
      surface: '#120a1e',
      border: '#1e0a30',
    },
  },
  fonts: {
    heading: `var(--font-cinzel), 'Noto Serif JP', Georgia, serif`,
    body: `var(--font-raleway), 'Noto Sans JP', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    mono: `var(--font-mono), 'Fira Code', ui-monospace, monospace`,
    cute: `var(--font-raleway), sans-serif`,
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  shadows: {
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.08)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
    outline: '0 0 0 3px rgba(124, 58, 237, 0.5)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
    none: 'none',
    glass: '0 8px 32px 0 rgba(10, 0, 16, 0.6)',
    glow: '0 0 20px rgba(124, 58, 237, 0.35)',
    'glow-lg': '0 0 40px rgba(124, 58, 237, 0.5)',
    'glow-pink': '0 0 30px rgba(124, 58, 237, 0.4)',
    'glow-purple': '0 0 30px rgba(124, 58, 237, 0.4)',
    'glow-gold': '0 0 20px rgba(196, 30, 58, 0.4)',
    kawaii: '0 10px 40px rgba(124, 58, 237, 0.25)',
    soft: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    '4xl': '2rem',
    full: '9999px',
  },
  styles: {
    global: () => ({
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        bg: '#0a0010',
        color: '#e8e0f5',
        fontFamily: 'body',
        minHeight: '100vh',
        lineHeight: 'base',
        fontSize: 'md',
        transition: 'background 0.3s ease',
      },
      '*': {
        scrollBehavior: 'smooth',
        boxSizing: 'border-box',
      },
      '*::before, *::after': {
        boxSizing: 'border-box',
      },
      '::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },
      '::-webkit-scrollbar-track': {
        background: '#0a0010',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'linear-gradient(180deg, #7c3aed, #c41e3a)',
        borderRadius: '3px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: 'linear-gradient(180deg, #6d28d9, #a01830)',
      },
      '::selection': {
        background: 'rgba(124, 58, 237, 0.25)',
        color: '#e8e0f5',
      },
      // Keyframes
      '@keyframes fadeInUp': {
        '0%': { opacity: 0, transform: 'translateY(40px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' }
      },
      '@keyframes fadeInDown': {
        '0%': { opacity: 0, transform: 'translateY(-40px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' }
      },
      '@keyframes fadeInLeft': {
        '0%': { opacity: 0, transform: 'translateX(-40px)' },
        '100%': { opacity: 1, transform: 'translateX(0)' }
      },
      '@keyframes fadeInRight': {
        '0%': { opacity: 0, transform: 'translateX(40px)' },
        '100%': { opacity: 1, transform: 'translateX(0)' }
      },
      '@keyframes float': {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-12px)' }
      },
      '@keyframes floatSlow': {
        '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
        '50%': { transform: 'translateY(-8px) rotate(3deg)' }
      },
      '@keyframes shimmer': {
        '0%': { backgroundPosition: '-1000px 0' },
        '100%': { backgroundPosition: '1000px 0' }
      },
      '@keyframes pulse': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.4 }
      },
      '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      },
      '@keyframes gradient': {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' }
      },
      // Ice glow — replaces pink glow
      '@keyframes glow': {
        '0%, 100%': { boxShadow: '0 0 15px rgba(124, 58, 237, 0.3)' },
        '50%': { boxShadow: '0 0 35px rgba(124, 58, 237, 0.6)' }
      },
      // Magic array slow rotation
      '@keyframes arrayRotate': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      },
      // Crystalline reveal — blur clearance
      '@keyframes iceFade': {
        '0%': { opacity: 0, filter: 'blur(8px)', transform: 'translateY(16px)' },
        '100%': { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' }
      },
      // Circuit pulse for array decorations
      '@keyframes arrayPulse': {
        '0%, 100%': { opacity: 0.15, transform: 'scale(1)' },
        '50%': { opacity: 0.35, transform: 'scale(1.03)' }
      },
      // Keep for any remaining usage
      '@keyframes heartbeat': {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.05)' }
      },
      '@keyframes bounce': {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-8px)' }
      },
      '@keyframes wiggle': {
        '0%, 100%': { transform: 'rotate(-2deg)' },
        '50%': { transform: 'rotate(2deg)' }
      },
      '@keyframes twinkle': {
        '0%, 100%': { opacity: 0.2 },
        '50%': { opacity: 0.6 }
      },
      '@keyframes sparkle': {
        '0%, 100%': { opacity: 0, transform: 'scale(0)' },
        '50%': { opacity: 0.8, transform: 'scale(1)' }
      },
      '@keyframes gradientShift': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' }
      },
    }),
  },
  components: {
    Link: {
      baseStyle: {
        color: 'ice.400',
        textDecoration: 'none',
        fontWeight: 'medium',
        transition: 'all 0.25s ease',
        position: 'relative',
        _hover: {
          color: 'ice.300',
          textDecoration: 'none',
          _after: { width: '100%' },
        },
        _after: {
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          width: 0,
          height: '1px',
          background: 'linear-gradient(90deg, #7c3aed, #c41e3a)',
          transition: 'width 0.25s ease',
        }
      },
    },
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: 'sm',
        transition: 'all 0.25s ease',
        letterSpacing: '0.04em',
        _focus: { boxShadow: 'outline' },
        _active: { transform: 'scale(0.97)' }
      },
      variants: {
        glass: {
          bg: 'rgba(13, 21, 37, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid',
          borderColor: '#1e2d42',
          color: '#e8eef4',
          _hover: {
            bg: 'rgba(19, 30, 48, 0.9)',
            borderColor: '#4db8d4',
            color: '#4db8d4',
            transform: 'translateY(-2px)',
            boxShadow: 'glow',
          }
        },
        gradient: {
          bg: 'transparent',
          border: '1px solid #4db8d4',
          color: '#4db8d4',
          _hover: {
            bg: 'rgba(77, 184, 212, 0.1)',
            transform: 'translateY(-2px)',
            boxShadow: 'glow',
          }
        },
        kawaii: {
          bg: 'ice.500',
          color: 'white',
          borderRadius: 'sm',
          px: 8,
          _hover: {
            bg: 'ice.600',
            transform: 'translateY(-2px)',
            boxShadow: 'glow',
          },
        },
        cute: {
          bg: 'transparent',
          border: '1px solid',
          borderColor: '#c4a55a',
          color: '#c4a55a',
          borderRadius: 'sm',
          fontWeight: '500',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontSize: 'xs',
          _hover: {
            bg: 'rgba(196, 165, 90, 0.08)',
            transform: 'translateY(-2px)',
            boxShadow: 'glow-gold',
          }
        }
      }
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'sm',
          transition: 'all 0.25s ease',
          _focus: {
            borderColor: 'ice.400',
            boxShadow: 'glow',
          }
        }
      }
    },
    Textarea: {
      baseStyle: {
        borderRadius: 'sm',
        transition: 'all 0.25s ease',
        _focus: {
          borderColor: 'ice.400',
          boxShadow: 'glow',
        }
      }
    },
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: '700',
        lineHeight: 'shorter',
        letterSpacing: '0.02em',
      }
    },
    Badge: {
      variants: {
        kawaii: {
          bg: 'rgba(77, 184, 212, 0.1)',
          color: 'ice.400',
          borderRadius: 'sm',
          px: 3,
          py: 1,
          fontWeight: '500',
          border: '1px solid',
          borderColor: 'rgba(77, 184, 212, 0.25)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontSize: 'xs',
        },
        cute: {
          bg: 'rgba(196, 165, 90, 0.1)',
          color: 'gold.400',
          borderRadius: 'sm',
          px: 3,
          py: 1,
          border: '1px solid',
          borderColor: 'rgba(196, 165, 90, 0.25)',
        }
      }
    }
  },
  textStyles: {
    h1: {
      fontSize: ['48px', '72px'],
      fontWeight: '700',
      lineHeight: '110%',
      letterSpacing: '0.02em',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: '600',
      lineHeight: '110%',
      letterSpacing: '0.02em',
    },
    subtitle: {
      fontSize: ['18px', '24px'],
      fontWeight: '400',
      lineHeight: '130%',
      letterSpacing: '0.04em',
    },
    body: {
      fontSize: ['16px', '18px'],
      lineHeight: '160%',
    },
    cute: {
      fontFamily: 'body',
      fontWeight: '400',
      letterSpacing: '0.04em',
    }
  },
  layerStyles: {
    glass: {
      bg: 'rgba(13, 21, 37, 0.6)',
      backdropFilter: 'blur(16px)',
      border: '1px solid #1e2d42',
    },
    glassPink: {
      bg: 'rgba(77, 184, 212, 0.06)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(77, 184, 212, 0.15)',
    },
    gradient: {
      bgGradient: 'linear(to-r, ice.500, steel.500)',
    },
    card: {
      bg: '#0d1525',
      shadow: 'xl',
      rounded: 'sm',
      overflow: 'hidden',
      border: '1px solid #1e2d42',
    },
    kawaii: {
      bg: 'rgba(13, 21, 37, 0.7)',
      backdropFilter: 'blur(16px)',
      border: '1px solid #1e2d42',
      borderRadius: 'sm',
    }
  }
});

export default theme;
