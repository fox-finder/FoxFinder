
import { merge } from 'lodash';
import { observable, computed, action } from 'mobx';
import { Position } from 'react-rnd'
import { mockUserApplications } from 'mock/application'
import { GLOBAL_OPTIONS } from 'stores/option'
import { runLinkApp } from 'bases/renderers/Link'
import {
  INecessaryApplication,
  IStandardApplication,
  ICompleteApplication,
  ApplicationType,
  ApplicationWindowState,
  IApplicationWindowSize,
  IApplicationWindow,
  ApplicationState
} from 'types/application'

import { FinderPackage } from 'natives/finder'
import { SettingPackage } from 'natives/setting'
import { CloudStorePackage } from 'natives/store'
import { TerminalPackage } from 'natives/terminal'

const nativeApps = [
  FinderPackage,
  SettingPackage,
  CloudStorePackage,
  TerminalPackage
]

function getDefaultCompletetOptions(): INecessaryApplication {
  const nativeCount = nativeApps.length
  const allCount = applicationStore.allApps.length
  const defaultOrder = allCount < nativeCount
    ? nativeCount + 1
    : allCount + 1

  return {
    autorun: false,
    protected: false,
    pinDesktop: true,
    pinBerth: true,
    pinPosition: false as false,
    berthOrder: defaultOrder,
    desktopOrder: defaultOrder
  }
}

function getDefaultWindowOptions(app: ICompleteApplication): IApplicationWindow {
  return {
    visible: false,
    zIndex: 1,
    state: ApplicationWindowState.Normal,
    // TODO: 这里的 lockPosition 需要判断桌面的方向
    position: app.pinPosition || GLOBAL_OPTIONS.defaultWindowPosition,
    size: app.window && app.window.defaultSize || GLOBAL_OPTIONS.defaultWindowSIze,
    $_keepRigid: false
  }
}

export class App {

  @observable $!: ICompleteApplication
   // 应用状态
  @observable state!: ApplicationState
   // 窗口配置
  @observable window!: IApplicationWindow

  @computed get isRunning(): boolean {
    return this.state !== ApplicationState.Dormancy
  }

  @computed get isErring(): boolean {
    return this.state === ApplicationState.Error
  }

  @computed get isLockng(): boolean {
    return !!this.$.pinPosition
  }

  @computed get isActivated(): boolean {
    return applicationStore.activeAppId === this.$.id
  }

  @computed get isWindowVisible(): boolean {
    return this.window.visible
  }

  @computed get isWindowMax(): boolean {
    return this.window.state === ApplicationWindowState.Maximized
  }

  @computed get isWindowNormal(): boolean {
    return this.window.state === ApplicationWindowState.Normal
  }

  @computed get isLinkType(): boolean {
    return App.verifyType(this, ApplicationType.Link)
  }

  @computed get isShortcutType(): boolean {
    return App.verifyType(this, ApplicationType.Shortcut)
  }

  @computed get isExtAppType(): boolean {
    return App.verifyType(this, ApplicationType.ExtApp)
  }

  @computed get isIframeType(): boolean {
    return App.verifyType(this, ApplicationType.Iframe)
  }

  @computed get isNativeType(): boolean {
    return App.verifyType(this, ApplicationType.Native)
  }

  constructor(app: ICompleteApplication) {
    this.init(app)
  }

  @action private init(app: ICompleteApplication) {
    this.$ = { ...app }
    this.state = ApplicationState.Dormancy
    this.window = {
      ...getDefaultWindowOptions(app),
      state: this.getDefaultWindowSize()
    }
  }

  @action private getDefaultWindowSize(): ApplicationWindowState {
    return this.$.window && this.$.window.defaultFullScreen
      ? ApplicationWindowState.Maximized
      : ApplicationWindowState.Normal
  }

  @action.bound run(): void {

    // 链接形式的应用
    if (this.isLinkType) {
      runLinkApp(this)
      return
    }

    // 快捷方式 -> 打开 finder | 对应的文件处理器，并给予参数
    if (this.isShortcutType) {
      runLinkApp(this)
      return
    }

    // 程序已在运行中 && 窗口已激活 && 可见 -> 则缩小
    if (this.isRunning && this.isActivated && this.isWindowVisible) {
      this.hiddenWindow()
      return
    }

    // 首次运行 -> 重置窗口
    if (!this.isRunning) {
      this.window.state = this.getDefaultWindowSize()
    }
    // 运行（打开窗口）-> 显示窗口 -> 激活窗口及 zindex
    this.state = ApplicationState.Running
    this.visibleWindow()
    this.activate()
  }

  @action.bound close() {
    // 休眠状态（关闭窗口） -> 重置窗口
    // TODO: 要失去焦点
    this.state = ApplicationState.Dormancy
  }

  @action.bound activate() {
    this.updateZIndex(applicationStore.maxDesktopZIndex)
    applicationStore.activateApp(this)
  }

  @action.bound lock() {
    this.$.pinPosition = { ...this.window.position }
  }

  @action.bound unlock() {
    this.$.pinPosition = false
  }

  @action.bound visibleWindow() {
    this.window.visible = true
  }

  @action.bound hiddenWindow() {
    this.window.visible = false
  }

  @action.bound toggleWindowVisible() {
    this.isWindowVisible
      ? this.hiddenWindow()
      : this.visibleWindow()
  }

  @action.bound resizeWindow(size: IApplicationWindowSize) {
    this.window.size = size
  }

  @action.bound repositionWindow(position: Position) {
    this.window.position = position
  }

  @action.bound redrawWindowState(windowSize: ApplicationWindowState) {
    this.window.state = windowSize
  }

  @action.bound updateKeepRigid(value: boolean) {
    this.window.$_keepRigid = value
  }

  @action.bound updateZIndex(zIndex: number) {
    this.window.zIndex = zIndex
  }

  @action.bound maximizedWindow() {
    this.updateKeepRigid(false)
    this.redrawWindowState(ApplicationWindowState.Maximized)
  }

  @action.bound recoverWindow() {
    this.updateKeepRigid(false)
    this.redrawWindowState(ApplicationWindowState.Normal)
  }

  @action.bound toggleWindowSize() {
    this.updateKeepRigid(false)
    this.isWindowMax
      ? this.recoverWindow()
      : this.maximizedWindow()
  }

  static verifyType(app: App, type: ApplicationType): boolean {
    return app.$.type === type
  }
}


export class ApplicationStore {

  // 所有应用
  @observable allApps: App[] = []

  // 历史打开的应用
  @observable.shallow historyApps: App[] = []

  // 已激活的应用 ID（窗口激活，事件映射）
  @observable activeAppId: string | null = null

  constructor() {
    this.initNativeApps(nativeApps)
    setTimeout(() => {
      // TODO: mock promise
      require('mock/store.json').map(this.registerStandardApp)
      mockUserApplications.map(this.registerCompleteApp)
      // this.getApps().then(apps => plugins.map(this.registerCompleteApp))
    }, 500)
    setTimeout(this.bootstrap, 800)
  }

  // 任务栏固定应用
  @computed get pinBerthApps(): App[] {
    return this.allApps.filter(app => app.$.pinBerth)
  }

  // 运行中的应用
  @computed get runningApps(): App[] {
    return this.allApps.filter(app => app.state !== ApplicationState.Dormancy)
  }

  // 运行时应用 -> 除去任务栏固定应用
  @computed get runningAppsWithoutBerthApps(): App[] {
    return this.runningApps.filter(app => !this.pinBerthApps.includes(app))
  }

  // 窗口应用 -> 运行中（无论窗口是否可见，都应该在 dom 中）
  @computed get windowViewApps(): App[] {
    return this.runningApps.filter(app => app.isRunning)
  }

  // 桌面应用
  @computed get disktopViewApps(): App[] {
    return this.allApps.filter(app => app.$.pinDesktop)
  }

  // 任务栏应用
  @computed get berthViewApps(): App[] {
    return [
      ...this.pinBerthApps.slice(),
      ...this.runningAppsWithoutBerthApps.slice(),
    ]
  }

  // 可见应用
  @computed get windowVisibleApps(): App[] {
    return this.windowViewApps.filter(app => app.window.visible)
  }

  @computed get maxDesktopZIndex(): number {
    return this.windowVisibleApps.length
  }

  // 启动
  @action.bound private bootstrap() {
    this.allApps.filter(app => app.$.autorun).map(app => app.run())
  }

  // 更新历史应用
  @action private pushHistory(app: App) {
    this.historyApps.unshift(app)
    this.historyApps.splice(18, 1000)
  }

  // 初始化系统应用
  @action private initNativeApps(apps: ICompleteApplication[]) {
    apps.map(this.registerCompleteApp)
  }

  // 激活某个应用 -> 更新 ID -> 更新所有窗的 zIndex - 1
  @action.bound activateApp(app: App) {
    if (app.isActivated) {
      return
    }
    this.activeAppId = app.$.id
    this.windowVisibleApps.forEach(app => {
      const targetZIndex = app.window.zIndex - 1
      app.updateZIndex(targetZIndex < 0 ? 0 : targetZIndex)
    })
    app.updateZIndex(this.maxDesktopZIndex)
  }

  // 注册完整应用
  @action.bound registerCompleteApp(app: ICompleteApplication) {
    this.allApps.push(
      ApplicationStore.normalizeCompleteApp(app)
    )
  }

  // 注册标准应用
  @action.bound registerStandardApp(app: IStandardApplication) {
    this.allApps.push(
      ApplicationStore.normalizeCompleteApp(
        ApplicationStore.normalizeStandardApp(app)
      )
    )
  }

  static normalizeStandardApp(app: IStandardApplication): ICompleteApplication {
    return { ...getDefaultCompletetOptions(), ...app }
  }

  static normalizeCompleteApp(app: ICompleteApplication): App {
    return new App(app)
  }
}

export const applicationStore = new ApplicationStore()
