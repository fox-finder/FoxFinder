
import { IApplication, ApplicationType, ApplicationStatus, ApplicationWindowStatus } from 'types/application'
import { Exploer, ExploerElement } from 'modules/exploer'

export const mockApplications: IApplication[] = [
  {
    name: 'Exploer',
    type: ApplicationType.App,
    icon: '/images/icons/exploer.svg',
    status: ApplicationStatus.Running,
    component: ExploerElement,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: true,
    protected: true,
    iconContextMenu: []
  },
  {
    name: "Launchpad",
    type: ApplicationType.App,
    icon: "/images/icons/launchpad.svg",
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: false,
    pinBerth: true,
    protected: true,
  },
  {
    name: "Setting",
    type: ApplicationType.App,
    icon: "/images/icons/settings.svg",
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: true,
    protected: true,
    iconContextMenu: []
  },
  {
    name: "Cloud Store",
    type: ApplicationType.App,
    icon: "/images/icons/store.svg",
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: true,
    protected: true,
  },
  {
    name: "Terminal",
    type: ApplicationType.App,
    icon: "/images/icons/terminal.svg",
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: true,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "TickTick",
    type: ApplicationType.Iframe,
    icon: "/images/icons/todo.svg",
    data: 'https://dida365.com/#q/all/tasks',
    status: ApplicationStatus.Running,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: false,
    pinBerth: true,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Mail",
    type: ApplicationType.Iframe,
    icon: "/images/icons/mail.svg",
    data: 'https://mail.qq.com',
    status: ApplicationStatus.Running,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: false,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "PhotoShop",
    type: ApplicationType.Iframe,
    icon: "/images/icons/photoshop.svg",
    data: 'https://ps.gaoding.com',
    status: ApplicationStatus.Error,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: false,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Clock",
    type: ApplicationType.Widget,
    icon: "/images/icons/clock.svg",
    status: ApplicationStatus.Running,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    autoRun: true,
    pinDesktop: true,
    pinBerth: false,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Weibo",
    type: ApplicationType.Link,
    icon: "/images/icons/weibo.svg",
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    autoRun: false,
    pinDesktop: false,
    pinBerth: true,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Monitor",
    type: ApplicationType.Widget,
    icon: "/images/icons/cpu.svg",
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    autoRun: false,
    pinDesktop: false,
    pinBerth: true,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Github",
    type: ApplicationType.Link,
    icon: "/images/icons/github.svg",
    data: 'https://github.com/surmon-china',
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    autoRun: false,
    pinDesktop: false,
    pinBerth: true,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Weather",
    type: ApplicationType.Widget,
    icon: "/images/icons/weather.svg",
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    autoRun: false,
    pinDesktop: false,
    pinBerth: true,
    protected: false,
    iconContextMenu: []
  }
]
