import { type NavbarMap, NavItemModel } from '@/features/navigation'

export const navigation: NavbarMap = new Map([
  ['spacer-top', null],
  [
    'main',
    new Set([
      new NavItemModel({ id: 'nav-person', icon: 'person', to: '/v1' }),
      new NavItemModel({ id: 'nav-v2', icon: 'email', to: '/v2' }),
    ]),
  ],
  [
    'actions',
    new Set([
      new NavItemModel({
        id: 'nav-github',
        icon: 'github',
        to: new URL('https://github.com/soyaaroncervantes'),
      }),
      new NavItemModel({
        id: 'nav-linkedin',
        icon: 'linkedin',
        to: new URL('https://linkedin.com/in/soyaaroncervantes'),
      }),
    ]),
  ],
])
