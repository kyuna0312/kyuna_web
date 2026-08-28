import { Box } from '@chakra-ui/react'

// Skip link for keyboard users; everything else is native browser behavior.
const KeyboardNavigation = ({ children }) => (
  <>
    <Box
      as="a"
      href="#main-content"
      position="absolute"
      top="-40px"
      left="6px"
      bg="ink"
      color="paper"
      p={2}
      borderRadius="2px"
      zIndex={2000}
      _focus={{ top: '6px' }}
    >
      Skip to main content
    </Box>
    {children}
  </>
)

export default KeyboardNavigation
