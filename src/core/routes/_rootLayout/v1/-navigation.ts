import { type NavbarMap, NavItemModel } from '@/features/navigation'

export const navigation: NavbarMap = new Map([
  ['spacer-top', null],
  [
    'main',
    new Set([
      new NavItemModel({ id: 'nav-person', icon: 'person', to: '/v1' }),
      new NavItemModel({ id: 'nav-emailme', icon: 'email', to: '/v2' }),
    ]),
  ],
  [
    'actions',
    new Set([
      new NavItemModel({
        id: 'nav-share-website',
        icon: 'share',
      }),
      new NavItemModel({
        id: 'nav-personal-cv',
        icon: 'download',
      }),
    ]),
  ],
])
