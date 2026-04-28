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
])
