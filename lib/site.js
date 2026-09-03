import { IoLogoGithub, IoLogoTwitter, IoLogoInstagram, IoLogoMedium } from 'react-icons/io5';

// The one place identity lives. Every handle, link, and address on the site
// comes from here — a rename is a one-file change.
export const site = {
  handle: 'kyuna0312',
  email: 'khatanzorigb@gmail.com',
  url: 'https://kyuna-web.vercel.app',
  github: 'https://github.com/kyuna0312',
  twitter: 'https://twitter.com/kyuna0312',
  instagram: 'https://instagram.com/kyuna0312',
  medium: 'https://medium.com/@kyuna312',
};

// Locale registry: one row per language the site speaks. The switcher and
// SEO alternates both derive from this — adding a locale is one row here
// plus the code in next-i18next.config.js and a common.json file.
export const locales = [
  { code: 'en', name: 'English', hreflang: 'en', ogLocale: 'en_US' },
  { code: 'jp', name: '日本語', hreflang: 'ja', ogLocale: 'ja_JP' },
  { code: 'mn', name: 'Монгол', hreflang: 'mn', ogLocale: 'mn_MN' },
];

export const socialLinks = [
  { icon: IoLogoGithub, href: site.github, label: 'GitHub' },
  { icon: IoLogoTwitter, href: site.twitter, label: 'Twitter' },
  { icon: IoLogoInstagram, href: site.instagram, label: 'Instagram' },
  { icon: IoLogoMedium, href: site.medium, label: 'Medium' },
];

// "3 September 2026" / "2026年9月3日" / "2026 оны 9-р сарын 3", from an ISO date.
export const postDate = (iso, locale) =>
  new Date(iso).toLocaleDateString(locales.find(l => l.code === locale)?.hreflang || 'en', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
