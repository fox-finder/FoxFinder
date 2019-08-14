
import { IApplication, ApplicationType, ApplicationStatus, ApplicationWindowStatus } from 'types/application'
import { Finder } from 'natives/finder'

export const mockApplications: IApplication[] = [
  {
    name: 'Finder',
    type: ApplicationType.Native,
    icon: '/images/icons/exploer.svg',
    status: ApplicationStatus.Running,
    component: Finder,
    windowStatus: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: true,
    protected: true,
    iconContextMenu: []
  },
  {
    name: "Launchpad",
    type: ApplicationType.Native,
    icon: "/images/icons/launchpad.svg",
    status: ApplicationStatus.Dormancy,
    windowStatus: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: false,
    pinBerth: true,
    protected: true,
  },
  {
    name: "Setting",
    type: ApplicationType.Native,
    icon: "/images/icons/settings.svg",
    status: ApplicationStatus.Dormancy,
    windowStatus: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: true,
    protected: true,
    iconContextMenu: []
  },
  {
    name: "Cloud Store",
    type: ApplicationType.Native,
    icon: "/images/icons/store.svg",
    status: ApplicationStatus.Dormancy,
    windowStatus: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: true,
    protected: true,
  },
  {
    name: "Terminal",
    type: ApplicationType.Native,
    icon: "/images/icons/terminal.svg",
    status: ApplicationStatus.Dormancy,
    windowStatus: {
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
    status: ApplicationStatus.Dormancy,
    windowStatus: {
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
    status: ApplicationStatus.Dormancy,
    windowStatus: {
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
    status: ApplicationStatus.Dormancy,
    windowStatus: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: false,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Clock",
    type: ApplicationType.Plugin,
    icon: "/images/icons/clock.svg",
    status: ApplicationStatus.Dormancy,
    windowStatus: {
      status: ApplicationWindowStatus.Normal,
    },
    autorun: true,
    pinDesktop: true,
    pinBerth: false,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Weibo",
    type: ApplicationType.Link,
    icon: "/images/icons/weibo.svg",
    status: ApplicationStatus.Dormancy,
    windowStatus: {
      status: ApplicationWindowStatus.Normal,
    },
    autorun: false,
    pinDesktop: false,
    pinBerth: true,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Monitor",
    type: ApplicationType.Plugin,
    icon: "/images/icons/cpu.svg",
    status: ApplicationStatus.Dormancy,
    windowStatus: {
      status: ApplicationWindowStatus.Normal,
    },
    autorun: false,
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
    status: ApplicationStatus.Dormancy,
    windowStatus: {
      status: ApplicationWindowStatus.Normal,
    },
    autorun: false,
    pinDesktop: false,
    pinBerth: true,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Weather",
    type: ApplicationType.Plugin,
    icon: "/images/icons/weather.svg",
    status: ApplicationStatus.Dormancy,
    windowStatus: {
      status: ApplicationWindowStatus.Normal,
    },
    autorun: false,
    pinDesktop: false,
    pinBerth: true,
    protected: false,
    iconContextMenu: []
  }
]
