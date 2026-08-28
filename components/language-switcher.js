import { useRouter } from 'next/router'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { locales } from '../lib/site'

const LanguageSwitcher = () => {
  const router = useRouter()

  const currentLanguage = locales.find(lang => lang.code === router.locale) || locales[0]

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
        fontFamily="mono"
        fontWeight="400"
        fontSize="sm"
      >
        {currentLanguage.name}
      </MenuButton>
      <MenuList minW="140px">
        {locales.map(language => (
          <MenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
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
