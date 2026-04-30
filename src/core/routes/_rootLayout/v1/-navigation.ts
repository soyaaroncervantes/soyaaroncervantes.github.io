import {
  DownloadNavItemModel,
  type NavbarMap,
  type NavItemModel,
  RouteNavItemModel,
  ShareNavItemModel,
} from '@/features/navigation'

export const navigation: NavbarMap = new Map([
  ['spacer-top', null],
  [
    'main',
    new Set<NavItemModel>([
      new RouteNavItemModel({ id: 'nav-person', icon: 'person', to: '/v1' }),
      new RouteNavItemModel({ id: 'nav-emailme', icon: 'email', to: '/v2' }),
    ]),
  ],
  [
    'actions',
    new Set<NavItemModel>([
      new ShareNavItemModel({
        id: 'nav-share-website',
        icon: 'share',
        title: 'Aaron Cervantes — Portfolio',
        text: 'Check out my portfolio',
        url: 'https://soyaaroncervantes.com',
      }),
      new DownloadNavItemModel({
        id: 'nav-personal-cv',
        icon: 'download',
        url: 'https://docs.google.com/document/d/16eI0g5Wvw4pyOMNm4QkEmLqXXqjPk_cz3OyqkjiQ8xg/export?format=pdf',
        filename: 'aaron-cv.pdf',
      }),
    ]),
  ],
])
