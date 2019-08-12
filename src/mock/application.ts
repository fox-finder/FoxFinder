
import { IApplication, ApplicationType, ApplicationStatus, ApplicationWindowStatus } from 'types/application'

export const mockApplications: IApplication[] = [
  {
    name: 'Finder',
    type: ApplicationType.App,
    icon: '/images/icons/finder.png',
    status: ApplicationStatus.Running,
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
    icon: "/images/icons/launchpad.png",
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
    icon: "/images/icons/settings.png",
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
    name: "App Store",
    type: ApplicationType.App,
    icon: "/images/icons/app-store.png",
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
    icon: "/images/icons/icons8-command_line.png",
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
    icon: "/images/icons/dida-logo.png",
    data: 'https://dida365.com/#q/all/tasks',
    status: ApplicationStatus.Normal,
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
    type: ApplicationType.App,
    icon: "/images/icons/icons8-message_squared.png",
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
    icon: "/images/icons/icons8-adobe_photoshop.png",
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
    icon: "/images/icons/icons8-clock_8.png",
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
    icon: "/images/icons/icons8-weibo.png",
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
