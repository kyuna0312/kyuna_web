import { useRouter } from 'next/router'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  HStack,
  Box
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

const LanguageSwitcher = () => {
  const router = useRouter()

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'jp', name: '日本語', flag: '🇯🇵' },
    { code: 'mn', name: 'Монгол', flag: '🇲🇳' }
  ]

  const currentLanguage = languages.find(lang => lang.code === router.locale) || languages[0]

  const changeLanguage = (locale) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale })
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="ghost"
        size="sm"
        borderRadius="full"
        bg="transparent"
        border="1px solid"
        borderColor="rgba(236, 72, 153, 0.2)"
        color="gray.600"
        _hover={{
          bg: 'rgba(236, 72, 153, 0.1)',
          borderColor: 'pink.300',
          transform: 'scale(1.02)'
        }}
        _active={{
          bg: 'rgba(236, 72, 153, 0.15)',
        }}
        transition="all 0.2s ease"
      >
        <HStack spacing={2}>
          <Text fontSize="sm">{currentLanguage.flag}</Text>
          <Text fontSize="sm" fontWeight="medium">
            {currentLanguage.name}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList
        bg="white"
        border="2px solid"
        borderColor="pink.200"
        borderRadius="xl"
        boxShadow="0 10px 40px rgba(236, 72, 153, 0.15)"
        minW="150px"
        p={2}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            bg="transparent"
            color="gray.700"
            borderRadius="lg"
            _hover={{
              bg: 'rgba(236, 72, 153, 0.1)',
              color: 'pink.500',
            }}
            _focus={{
              bg: 'rgba(236, 72, 153, 0.1)'
            }}
            transition="all 0.2s ease"
            isDisabled={language.code === router.locale}
            mb={1}
          >
            <HStack spacing={3}>
              <Text fontSize="lg">{language.flag}</Text>
              <Box>
                <Text fontSize="sm" fontWeight="medium">
                  {language.name}
                </Text>
              </Box>
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default LanguageSwitcher
