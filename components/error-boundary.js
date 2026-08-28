import React from 'react'
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          minHeight="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          px={4}
          bg="paper"
        >
          <VStack spacing={5} maxWidth="440px">
            <Text
              fontFamily="mono"
              fontSize="xs"
              color="ice"
              letterSpacing="0.22em"
              textTransform="uppercase"
            >
              Something went wrong
            </Text>
            <Heading size="lg">The page hit an error</Heading>
            <Text color="rime">
              Refresh to try again, or head back to the start.
            </Text>
            <Button variant="frost" onClick={() => window.location.reload()}>
              Refresh page
            </Button>
          </VStack>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
