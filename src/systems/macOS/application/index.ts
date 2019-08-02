
export enum AppType {
  Iframe = 'iframe',
  Link = 'link',
  Url = 'url',
  Widget = 'widget',
}

export interface IApp {
  type: AppType
}