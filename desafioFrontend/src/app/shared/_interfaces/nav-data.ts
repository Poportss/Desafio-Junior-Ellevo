import { INavBarData } from 'src/app/shared/_interfaces/helper';

export const navbarData: INavBarData[] = [
  {
    routerLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard',
  },
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
