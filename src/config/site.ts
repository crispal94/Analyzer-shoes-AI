export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'RunWise AI',
  description: 'Photograph the side, sole, and top of a running shoe so wear can be reviewed.',
  navItems: [
    {
      label: 'Start',
      href: '/',
    },
    {
      label: 'Photos',
      href: '/upload',
    },
    {
      label: 'Review',
      href: '/analyze',
    },
  ],
  navMenuItems: [
    {
      label: 'Start',
      href: '/',
    },
    {
      label: 'Photos',
      href: '/upload',
    },
    {
      label: 'Review',
      href: '/analyze',
    },
  ],
  links: {
    github: 'https://github.com/crispal94/Analyzer-shoes-AI',
  },
}
