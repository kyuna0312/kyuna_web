import { IoLogoGithub, IoLogoTwitter, IoLogoInstagram } from 'react-icons/io5';

// The one place identity lives. Every handle, link, and address on the site
// comes from here — a rename is a one-file change.
export const site = {
  handle: 'kyuna0312',
  email: 'khatanzorigb@gmail.com',
  url: 'https://kyuna-web.vercel.app',
  github: 'https://github.com/kyuna0312',
  twitter: 'https://twitter.com/kyuna0312',
  instagram: 'https://instagram.com/kyuna0312',
};

export const socialLinks = [
  { icon: IoLogoGithub, href: site.github, label: 'GitHub' },
  { icon: IoLogoTwitter, href: site.twitter, label: 'Twitter' },
  { icon: IoLogoInstagram, href: site.instagram, label: 'Instagram' },
];
