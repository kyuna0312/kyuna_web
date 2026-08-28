// The project lineup: order, links, tech, thumbnails. Prose (titles and
// descriptions) lives in the locale files under projects.<key> /
// projects.<key>Description. Ordered per the portfolio audit: environments
// and tooling first, then a low-level experiment, then shipped products.
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
