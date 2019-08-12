
export enum ApplicationType {
  App = 'app', // 正常应用
  Path = 'path', // 文件/文件夹
  Link = 'link', // 外链
  Iframe = 'iframe', // 框架
  Widget = 'widget', // 挂件
}

export enum ApplicationStatus {
  Normal = 0,
  Running = 1,
  Error = -1,
}

export enum ApplicationWindowStatus {
  Normal = 0,
  Minimize = 1,
  Maximize = 2,
  Fullscreen = 4,
}

export interface IApplicationWindow {
  status: ApplicationWindowStatus // 窗口状态
  defaultSize?: { width: number, height: number } // 默认尺寸
  defaultPosition?: { x: number, y: number } // 默认位置
}

export interface IApplicationBase<T = any> {
  name: string // 应用名称（必须是全局唯一的）
  desc?: string // 应用描述
  icon: string // 图标地址或 base64
  type: ApplicationType // 应用类型
  data?: string // 应用数据
  component?: React.ComponentClass<T> | React.FunctionComponent<T> | React.ReactElement // 应用组件
  autoRun?: boolean // 是否自动运行（开机启动）
  pinDesktop: boolean // 是否贴在桌面
  pinBerth: boolean // 是否贴在任务栏
  protected: boolean // 是否受到操作保护，保证应用不被删除，仅可执行有限操作...等等
  hideActiveStatus?: boolean // 启动后隐藏活动状态
  iconContextMenu?: [] // 图标上下文菜单
}

export interface IApplication<T = any> extends IApplicationBase<T> {
  status: ApplicationStatus // 应用状态
  window: IApplicationWindow // 窗口配置
}
