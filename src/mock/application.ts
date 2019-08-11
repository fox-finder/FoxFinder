
import { IApplication, ApplicationType, ApplicationStatus, ApplicationWindowStatus } from 'types/application'

export const mockApplications: IApplication[] = [
  {
    name: 'Finder',
    type: ApplicationType.App,
    icon: 'https://quietshu.github.io/cssosx/images/Finder.png',
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
    icon: "https://quietshu.github.io/cssosx/images/Launchpad.png",
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: false,
    pinBerth: true,
    protected: true,
  },
  {
    name: "Chrome",
    type: ApplicationType.App,
    icon: "https://quietshu.github.io/cssosx/images/Chrome.png",
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
    name: "AppLauncher",
    type: ApplicationType.App,
    icon: "https://quietshu.github.io/cssosx/images/AppLauncher.png",
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: false,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "AppStore",
    type: ApplicationType.App,
    icon: "https://quietshu.github.io/cssosx/images/AppStore.png",
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: true,
    pinBerth: true,
    protected: true,
  },
  {
    name: "iBooks",
    type: ApplicationType.App,
    icon: "https://quietshu.github.io/cssosx/images/iBooks.png",
    status: ApplicationStatus.Normal,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: false,
    pinBerth: false,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Messages",
    type: ApplicationType.App,
    icon: "https://quietshu.github.io/cssosx/images/Messages.png",
    status: ApplicationStatus.Running,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: false,
    pinBerth: false,
    protected: false,
    iconContextMenu: []
  },
  {
    name: "Evernote",
    type: ApplicationType.App,
    icon: "https://quietshu.github.io/cssosx/images/Evernote.png",
    status: ApplicationStatus.Error,
    window: {
      status: ApplicationWindowStatus.Normal,
    },
    pinDesktop: false,
    pinBerth: false,
    protected: false,
    iconContextMenu: []
  }
]
