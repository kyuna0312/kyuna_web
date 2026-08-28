import { useRouter } from 'next/router'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'jp', name: '日本語' },
  { code: 'mn', name: 'Монгол' },
]

const LanguageSwitcher = () => {
  const router = useRouter()

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
        borderRadius="2px"
        fontFamily="mono"
        fontWeight="400"
        fontSize="sm"
        color="rime"
        _hover={{ bg: 'iceDim', color: 'frost' }}
        _active={{ bg: 'iceDim' }}
      >
        {currentLanguage.name}
      </MenuButton>
      <MenuList bg="pane" borderColor="hairline" borderRadius="2px" minW="140px" py={2}>
        {languages.map(language => (
          <MenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            bg="transparent"
            color="rime"
            fontFamily="mono"
            fontSize="sm"
            _hover={{ bg: 'iceDim', color: 'frost' }}
            _focus={{ bg: 'iceDim' }}
            isDisabled={language.code === router.locale}
          >
            {language.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default LanguageSwitcher
