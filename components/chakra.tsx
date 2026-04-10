import { ChakraProvider, cookieStorageManagerSSR, localStorageManager } from '@chakra-ui/react';
import theme from '../lib/theme';

export default function Chakra({ cookies, children }) {
  const colorModeManager = typeof cookies === 'string' ? cookieStorageManagerSSR(cookies) : localStorageManager;

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = req.headers.cookie || '';
  return {
    props: {
      cookies
    }
  };
}
