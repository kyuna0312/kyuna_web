import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '../lib/theme';
import { locales } from '../lib/site';

// The html lang follows the active locale, mapped through the locale
// registry so the site's 'jp' code becomes the valid BCP 47 tag 'ja'.
export default function Document({ locale }) {
  const lang = locales.find(l => l.code === locale)?.hreflang || 'en';
  return (
    <Html lang={lang}>
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async ctx => ({
  ...(await NextDocument.getInitialProps(ctx)),
  locale: ctx.locale,
});
