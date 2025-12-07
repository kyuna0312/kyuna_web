import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'

// Simple client-side hook to check if we're in the browser
const useClientSide = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

const KeyboardNavigation = ({ children }) => {
  const isClient = useClientSide();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Skip to main content with Alt + M
      if (event.altKey && event.key === 'm') {
        event.preventDefault()
        const mainContent = document.getElementById('main-content')
        if (mainContent) {
          mainContent.focus()
          mainContent.scrollIntoView({ behavior: 'smooth' })
        }
      }

      // Skip to navigation with Alt + N
      if (event.altKey && event.key === 'n') {
        event.preventDefault()
        const navigation = document.querySelector('nav')
        if (navigation) {
          const firstLink = navigation.querySelector('a, button')
          if (firstLink) {
            firstLink.focus()
          }
        }
      }

      // Toggle focus outline visibility with Alt + F
      if (event.altKey && event.key === 'f') {
        event.preventDefault()
        document.body.classList.toggle('show-focus-outlines')
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Add focus outline styles
    const style = document.createElement('style')
    style.textContent = `
      .show-focus-outlines *:focus {
        outline: 2px solid #9f7aea !important;
        outline-offset: 2px !important;
      }

      /* High contrast focus indicators */
      @media (prefers-contrast: high) {
        *:focus {
          outline: 3px solid #000000 !important;
          outline-offset: 2px !important;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* Skip links */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #9f7aea;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
      }

      .skip-link:focus {
        top: 6px;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.head.removeChild(style)
    }
  }, [])

  // Only render interactive elements on client-side to prevent hydration mismatch
  return (
    <>
      {/* Skip Navigation Links */}
      {isClient && (
        <>
          <Box
            as="a"
            href="#main-content"
            className="skip-link"
            position="absolute"
            top="-40px"
            left="6px"
            bg="purple.500"
            color="white"
            p={2}
            textDecoration="none"
            borderRadius="md"
            zIndex={1000}
            _focus={{
              top: '6px',
            }}
          >
            Skip to main content
          </Box>

          <Box
            as="a"
            href="#navigation"
            className="skip-link"
            position="absolute"
            top="-40px"
            left="140px"
            bg="purple.500"
            color="white"
            p={2}
            textDecoration="none"
            borderRadius="md"
            zIndex={1000}
            _focus={{
              top: '6px',
            }}
          >
            Skip to navigation
          </Box>
        </>
      )}

      {children}
    </>
  )
}

export default KeyboardNavigation
