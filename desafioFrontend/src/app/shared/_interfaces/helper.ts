export interface INavBarData {
  routerLink: string;
  icon?: string;
  label: string;
  expanded?: boolean;
  items?: INavBarData[];
}
