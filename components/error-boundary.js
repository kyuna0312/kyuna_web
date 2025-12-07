import React from 'react'
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={() => this.setState({ hasError: false, error: null })} />
    }

    return this.props.children
  }
}

const ErrorFallback = () => {
  const router = useRouter()

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={4}
    >
      <VStack
        spacing={6}
        maxWidth="500px"
        p={8}
        borderRadius="lg"
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.2)"
      >
        <Text fontSize="6xl" role="img" aria-label="broken">
          💥
        </Text>
        <VStack spacing={2}>
          <Heading size="lg" color="white">
            Oops! Something went wrong
          </Heading>
          <Text color="gray.300" textAlign="center">
            We&apos;re sorry for the inconvenience. Please try refreshing the page or go back to the homepage.
          </Text>
        </VStack>
        <VStack spacing={3}>
          <Button
            onClick={() => window.location.reload()}
            colorScheme="purple"
            variant="solid"
            size="lg"
          >
            Refresh Page
          </Button>
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            color="white"
            _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
          >
            Go to Homepage
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}

// Hook for error handling
export const useErrorHandler = () => {
  const [error, setError] = React.useState(null)

  const resetError = () => setError(null)

  const throwError = (error) => {
    setError(error)
    throw error
  }

  return { error, resetError, throwError }
}

export default ErrorBoundary
