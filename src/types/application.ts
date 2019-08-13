
export enum ApplicationType {
  Native = 'app', // 系统自带应用
  Link = 'link', // 外链
  Shortcut = 'shortcut', // 快捷方式
  Iframe = 'iframe', // 框架
  Plugin = 'plugin', // 扩展插件
}

export enum ApplicationStatus {
  Dormancy = 0,
  Running = 1,
  Error = -1,
}

export enum ApplicationWindowStatus {
  Minimize = 0,
  Normal = 1,
  Maximize = 2,
}

export interface IApplicationWindow {
  status: ApplicationWindowStatus // 窗口状态
  // defaultSize?: { width: number, height: number } // 默认尺寸
  // defaultPosition?: { x: number, y: number } // 默认位置
}

/**
 * @description Standard interface for -> third app | store app | base app
 */
export interface IApplicationStandard {
  name: string
  description?: string // App description (markdown format string)
  icon: string // Icon resource src | Base64 string
  type: ApplicationType
  data?: string // App data -> url | path | jscode |other
  autorun?: boolean // Autorun when bootstrap
  hideBerthActiveStatus?: boolean // Hide active status when active
  iconContextMenu?: [] // Icon context menu list
  window?: {
    border: boolean // 是否有边框
    resize: boolean // 是否可以调整窗口尺寸
    defaultFullScreen?: boolean // 是否默认全屏打开
    defaultSize?: { // 指定尺寸
      width?: string
      height?: string
    }
  }
}

export interface IApplicationNative extends IApplicationStandard {
  component?: React.ComponentClass<any> | React.FunctionComponent<any> | React.ReactElement // Native app component
}

export interface IApplication extends IApplicationNative {
  protected: boolean // 是否是系统 app，受到操作保护，保证应用不被删除，仅可执行有限操作...
  pinDesktop: boolean // 是否贴在桌面
  pinBerth: boolean // 是否贴在任务栏
  status: ApplicationStatus // 应用状态
  windowStatus: IApplicationWindow // 窗口配置
}
