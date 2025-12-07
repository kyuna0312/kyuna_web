import { extendTheme } from '@chakra-ui/react';

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
    feminine: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
    },
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
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
    },
    brand: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    }
  },
  fonts: {
    heading: `'Playfair Display', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    mono: `'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace`,
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
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    glow: '0 0 20px rgba(236, 72, 153, 0.4)',
    'glow-lg': '0 0 40px rgba(236, 72, 153, 0.6)',
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
    full: '9999px',
  },
  styles: {
    global: (props) => ({
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        bg: props.colorMode === 'dark'
          ? 'radial-gradient(ellipse at top, rgba(17, 24, 39, 1) 0%, rgba(0, 0, 0, 1) 100%)'
          : 'radial-gradient(ellipse at top, rgba(253, 242, 248, 1) 0%, rgba(248, 250, 252, 1) 50%, rgba(255, 241, 242, 1) 100%)',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'elegant.800',
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
      // Advanced Animations
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
        '50%': { transform: 'translateY(-15px)' }
      },
      '@keyframes shimmer': {
        '0%': { backgroundPosition: '-1000px 0' },
        '100%': { backgroundPosition: '1000px 0' }
      },
      '@keyframes pulse': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 }
      },
      '@keyframes bounce': {
        '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
        '40%, 43%': { transform: 'translateY(-30px)' },
        '70%': { transform: 'translateY(-15px)' },
        '90%': { transform: 'translateY(-4px)' }
      },
      '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      },
      '@keyframes gradient': {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' }
      },
      '@keyframes glow': {
        '0%, 100%': { boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)' },
        '50%': { boxShadow: '0 0 40px rgba(236, 72, 153, 0.8)' }
      }
    }),
  },
  components: {
    Link: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'feminine.300' : 'feminine.600',
        textDecoration: 'none',
        fontWeight: 'medium',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        _hover: {
          color: props.colorMode === 'dark' ? 'feminine.200' : 'feminine.700',
          textDecoration: 'none',
          transform: 'translateY(-1px)',
          _after: {
            width: '100%',
          }
        },
        _after: {
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          width: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #ec4899, #f43f5e)',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }
      }),
    },
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        _focus: {
          boxShadow: 'outline',
        },
        _active: {
          transform: 'scale(0.98)',
        }
      },
      variants: {
        glass: (props) => ({
          bg: props.colorMode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: props.colorMode === 'dark'
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(236, 72, 153, 0.2)',
          color: props.colorMode === 'dark' ? 'white' : 'elegant.800',
          _hover: {
            bg: props.colorMode === 'dark'
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(255, 255, 255, 0.9)',
            borderColor: 'feminine.400',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }
        }),
        gradient: {
          bgGradient: 'linear(to-r, feminine.500, rose.500)',
          color: 'white',
          _hover: {
            bgGradient: 'linear(to-r, feminine.600, rose.600)',
            transform: 'translateY(-2px)',
            boxShadow: 'glow',
          }
        }
      }
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'xl',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          _focus: {
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          }
        }
      }
    },
    Textarea: {
      baseStyle: {
        borderRadius: 'xl',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        _focus: {
          transform: 'translateY(-1px)',
          boxShadow: 'lg',
        }
      }
    },
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: 'bold',
        lineHeight: 'shorter',
      }
    }
  },
  textStyles: {
    h1: {
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    subtitle: {
      fontSize: ['18px', '24px'],
      fontWeight: 'medium',
      lineHeight: '130%',
    },
    body: {
      fontSize: ['16px', '18px'],
      lineHeight: '160%',
    }
  },
  layerStyles: {
    glass: {
      bg: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    gradient: {
      bgGradient: 'linear(to-r, feminine.500, rose.500)',
    },
    card: {
      bg: 'white',
      shadow: 'xl',
      rounded: '2xl',
      overflow: 'hidden',
    }
  }
});

export default theme;
