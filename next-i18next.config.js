const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'jp', 'mn'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  serializeConfig: false,
  strictMode: true,
  react: {
    useSuspense: false
  }
}
