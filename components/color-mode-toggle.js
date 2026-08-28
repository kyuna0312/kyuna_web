import { useState, useEffect } from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Static icon before mount to avoid hydration mismatch
  const isDark = mounted ? colorMode === 'dark' : false;

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      color="rime"
      borderRadius="2px"
      _hover={{ bg: 'iceDim', color: 'frost' }}
    />
  );
};

export default ColorModeToggle;
