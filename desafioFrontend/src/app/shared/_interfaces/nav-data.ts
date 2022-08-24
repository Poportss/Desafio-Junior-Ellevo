import { INavBarData } from 'src/app/shared/_interfaces/helper';

export const navbarData: INavBarData[] = [
  {
    routerLink: 'callList',
    icon: 'fal fa-list-alt',
    label: 'Call List',
  },
  {
    routerLink: 'users',
    icon: 'fal fa-users',
    label: 'Users',
  },
  {
    routerLink: 'settings',
    icon: 'fal fa-cog',
    label: 'Settings',
  },
];
