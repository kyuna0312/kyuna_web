import en from '../public/locales/en/common.json';
import jp from '../public/locales/jp/common.json';
import mn from '../public/locales/mn/common.json';

// The default project lineup: order, links, tech, thumbnails. Prose lives in
// the locale files under projects.<key> / projects.<key>Description. The live
// site reads projects from the database; this file is the fallback when the
// database is empty or unreachable, and the seed the admin panel starts from.
// Ordered per the portfolio audit: environments and tooling first, then a
// low-level experiment, then shipped products.
export const projectLineup = [
  {
    key: 'dotfiles',
    github: 'https://github.com/kyuna0312/dotfiles',
    tech: 'Shell · Nushell · Linux · macOS',
    featured: true,
  },
  {
    key: 'nyanvim',
    thumbnail: '/images/works/nyanmarkdown.png',
    github: 'https://github.com/kyuna0312/NyanVim',
    tech: 'Lua · Neovim · CI',
  },
  {
    key: 'kitvcs',
    github: 'https://github.com/kyuna0312/kit-vcs',
    tech: 'C++ · object storage · CLI',
  },
  {
    key: 'madoka_react',
    thumbnail: '/images/works/madoka_react.png',
    url: 'https://madoka-kappa.vercel.app',
    github: 'https://github.com/kyuna0312/madoka',
    tech: 'CSS · SCSS · animation',
  },
  {
    key: 'NomadX',
    thumbnail: '/images/works/nomadx.png',
    url: 'https://nomadx.world',
    tech: 'React · Next.js · TypeScript · Chakra UI',
  },
  {
    key: 'mongolnet',
    thumbnail: '/images/works/mongolnet.png',
    url: 'https://mongol.net',
    tech: 'React · NestJS · GraphQL · Flutter',
  },
];

// The lineup in the same row shape the projects table uses.
export const defaultProjects = () =>
  projectLineup.map((p, i) => ({
    key: p.key,
    title: en.projects[p.key],
    descriptions: {
      en: en.projects[`${p.key}Description`],
      jp: jp.projects[`${p.key}Description`],
      mn: mn.projects[`${p.key}Description`],
    },
    tech: p.tech,
    url: p.url || null,
    github: p.github || null,
    thumbnail: p.thumbnail || null,
    featured: !!p.featured,
    sort: i,
  }));
