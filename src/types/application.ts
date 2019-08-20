
import { Position } from 'react-rnd'

export type ApplicationComponent = React.ComponentClass<any> | React.FunctionComponent<any>

export enum ApplicationType {
  Native = 'native', // 系统自带应用
  Shortcut = 'shortcut', // 快捷方式
  ExtApp = 'extApp', // 扩展插件
  Link = 'link', // 外链
  Iframe = 'iframe', // 框架
}

export enum ApplicationState {
  Dormancy = 0,
  Running = 1,
  Error = -1,
}

export enum ApplicationWindowState {
  Normal = 1,
  Maximized = 2,
}

export interface IApplicationWindowSize {
  width: string
  height: string
}

export interface IApplicationWindow {
  state: ApplicationWindowState // 窗口显示状态
  visible: boolean // 窗口隐藏状态
  zIndex: number // 窗口层级
  position: Position // 窗口位置
  size: IApplicationWindowSize // 窗口尺寸
  $_keepRigid: boolean // 不要动画
}

// Standard interface for -> third app | store app | base app
export interface IStandardApplication {
  name: string
  id: string // 唯一 ID
  description?: string // App description (markdown format string)
  icon: string // Icon resource src | Base64 string
  type: ApplicationType
  data?: string // App data -> url | path | htmlcode |other
  hideBerthActiveState?: boolean // Hide active status when active
  window?: {
    border: boolean // 是否有边框
    resize: boolean // 是否可以调整窗口尺寸
    defaultFullScreen?: boolean // 是否默认全屏打开
    defaultSize?: { // 指定尺寸
      width: string
      height: string
    }
  }
}

export interface INecessaryApplication {
  component?: ApplicationComponent // Native app component
  iconContextMenu?: [] // Icon context menu list
  autorun: boolean // Autorun when bootstrap
  protected: boolean // 是否是系统 app，受到操作保护，保证应用不被删除，仅可执行有限操作...
  pinDesktop: boolean // 是否贴在桌面
  pinBerth: boolean // 是否贴在任务栏
  pinPosition?: Position | false // 是否固定在桌面某个位置（不可调整尺寸，不可拖动）
  berthOrder: number // 任务栏顺序
  desktopOrder: number // 桌面顺序
}

// Complete interface for system
export type ICompleteApplication = IStandardApplication & INecessaryApplication
