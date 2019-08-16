
import { merge } from 'lodash';
import { observable, computed, action } from 'mobx';
import { mockApplications } from 'mock/application'
import { runLinkApp } from 'bases/renderers/Link'
import {
  IStandardApplication,
  ICompleteApplication,
  ApplicationType,
  ApplicationWindowSize,
  IApplicationWindow,
  ApplicationStatus
} from 'types/application'

import { FinderPackage } from 'natives/finder'
import { SettingPackage } from 'natives/setting'
import { CloudStorePackage } from 'natives/store'
import { TerminalPackage } from 'natives/terminal'
const plugins = require('mock/store.json')

function getDefaultCompletetOptions() {
  return {
    autorun: false,
    protected: false,
    pinDesktop: true,
    pinBerth: true
  }
}

function getDefaultStatusOptions() {
  return {
    status: ApplicationStatus.Dormancy,
    windowStatus: {
      visible: false,
      size: ApplicationWindowSize.Normal,
    }
  }
}

export class App {

  @observable $!: ICompleteApplication
   // 应用状态
  @observable status!: ApplicationStatus
   // 窗口配置
  @observable windowStatus!: IApplicationWindow

  @computed get isRunning(): boolean {
    return this.status !== ApplicationStatus.Dormancy
  }

  @computed get isErring(): boolean {
    return this.status === ApplicationStatus.Error
  }

  @computed get isActivated(): boolean {
    return applicationStore.activeAppId === this.$.id
  }

  @computed get isWindowVisible(): boolean {
    return this.windowStatus.visible
  }

  @computed get isWindowMax(): boolean {
    return this.windowStatus.size === ApplicationWindowSize.Maximized
  }

  @computed get isWindowNormal(): boolean {
    return this.windowStatus.size === ApplicationWindowSize.Normal
  }

  @computed get isLinkType(): boolean {
    return App.verifyType(this, ApplicationType.Link)
  }

  @computed get isPluginType(): boolean {
    return App.verifyType(this, ApplicationType.Plugin)
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
    this.$ = app
    const { status, windowStatus } = getDefaultStatusOptions()
    this.status = status
    this.windowStatus = {
      ...windowStatus,
      size: this.getDefaultWindowSize()
    }
  }

  @action private getDefaultWindowSize(): ApplicationWindowSize {
    return this.$.window && this.$.window.defaultFullScreen
      ? ApplicationWindowSize.Maximized
      : ApplicationWindowSize.Normal
  }

  @action.bound run(): void {
    if (this.isLinkType) {
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
      this.windowStatus.size = this.getDefaultWindowSize()
    }
    // 运行（打开窗口）-> 显示窗口 -> 激活窗口
    this.status = ApplicationStatus.Running
    this.visibleWindow()
    this.activate()
  }

  @action.bound close() {
    // 休眠状态（关闭窗口） -> 重置窗口
    this.status = ApplicationStatus.Dormancy
    this.windowStatus.size = this.getDefaultWindowSize()
  }

  @action.bound activate() {
    applicationStore.activateApp(this)
  }

  @action.bound visibleWindow() {
    this.windowStatus.visible = true
  }

  @action.bound hiddenWindow() {
    this.windowStatus.visible = false
  }

  @action.bound toggleWindowVisible() {
    this.isWindowVisible
      ? this.hiddenWindow()
      : this.visibleWindow()
  }

  @action.bound redrawWindow(windowSize: ApplicationWindowSize) {
    this.windowStatus.size = windowSize
  }

  @action.bound maximizedWindow() {
    this.redrawWindow(ApplicationWindowSize.Maximized)
  }

  @action.bound recoverWindow() {
    this.redrawWindow(ApplicationWindowSize.Normal)
  }

  @action.bound toggleWindowSize() {
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
    this.initNativeApps([
      FinderPackage,
      SettingPackage,
      CloudStorePackage,
      TerminalPackage
    ])
    // TODO: mock
    plugins.map(this.registerStandardApp)
    // this.getApps().then(apps => plugins.map(this.registerCompleteApp))
  }

  // 任务栏固定应用
  @computed get pinBerthApps(): App[] {
    return this.allApps.filter(app => app.$.pinBerth)
  }

  // 运行中的应用应用
  @computed get runningApps(): App[] {
    return this.allApps.filter(app => app.status !== ApplicationStatus.Dormancy)
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

  // 更新历史应用
  @action.bound private pushHistory(app: App) {
    this.historyApps.unshift(app)
    this.historyApps.splice(18, 1000)
  }

  // 初始化系统应用
  @action.bound private initNativeApps(apps: ICompleteApplication[]) {
    apps.map(this.registerCompleteApp)
  }

  // 激活某个应用
  @action.bound activateApp(app: App) {
    this.activeAppId = app.$.id
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
