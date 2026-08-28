import Link from 'next/link';
import { Box, Text, HStack } from '@chakra-ui/react';

const Logo = () => (
  <Link href="/" passHref legacyBehavior>
    <Box as="a" display="inline-flex" alignItems="center" _hover={{ textDecoration: 'none' }}>
      <HStack spacing={2.5} align="center">
        <Text fontFamily="heading" fontWeight="500" fontSize="xl" lineHeight="1">
          <Box as="span" color="ice">霜</Box>
          <Box as="span" color="bloom">花</Box>
        </Text>
        <Text fontFamily="mono" fontSize="xs" color="rime" letterSpacing="0.12em" display={{ base: 'none', sm: 'block' }}>
          shimoka
        </Text>
      </HStack>
    </Box>
  </Link>
);

export default Logo;
