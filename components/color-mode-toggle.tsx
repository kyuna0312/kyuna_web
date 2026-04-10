import { useState, useEffect } from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use static colors to avoid hydration mismatch
  const isDark = mounted ? colorMode === 'dark' : false;

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      color="gray.600"
      bg="transparent"
      borderRadius="full"
      _hover={{
        bg: 'rgba(236, 72, 153, 0.1)',
        color: 'pink.500',
        transform: 'scale(1.1)',
      }}
      _active={{
        transform: 'scale(0.95)',
      }}
      transition="all 0.3s ease"
    />
  );
};

export default ColorModeToggle;
