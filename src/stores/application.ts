
import { merge } from 'lodash';
import { observable, computed, action } from 'mobx';
import { mockApplications } from 'mock/application'
import { runLinkApp } from 'bases/renderers/Link'
import {
  IStandardApplication,
  ICompleteApplication,
  IRuntimeApplication,
  ApplicationType,
  ApplicationWindowStatus,
  ApplicationStatus
} from 'types/application'

import { FinderPackage } from 'natives/finder'
import { SettingPackage } from 'natives/setting'
import { CloudStorePackage } from 'natives/store'
import { TerminalPackage } from 'natives/terminal'

const plugins = require('mock/store.json')

export class ApplicationStore {

  constructor() {
    this.initNativeApps([
      FinderPackage,
      SettingPackage,
      CloudStorePackage,
      TerminalPackage
    ])

    // TODO: mock
    plugins.map(this.registerStandardApp)
  }

  // 所有应用
  @observable allApps: IRuntimeApplication[] = mockApplications

  // 历史打开的应用
  @observable.shallow historyApps: IRuntimeApplication[] = []

  // 任务栏固定应用
  @computed get pinBerthApps(): IRuntimeApplication[] {
    return this.allApps.filter(app => app.pinBerth)
  }

  // 运行中的应用应用
  @computed get runningApps(): IRuntimeApplication[] {
    return this.allApps.filter(app => app.status !== ApplicationStatus.Dormancy)
  }

  // 运行时应用 -> 除去任务栏固定应用
  @computed get runningAppsWithoutBerthApps(): IRuntimeApplication[] {
    return this.runningApps.filter(app => !this.pinBerthApps.includes(app))
  }

  // 窗口应用 -> 运行中且窗口可见
  @computed get windowViewApps(): IRuntimeApplication[] {
    return this.runningApps.filter(app => ApplicationStore.isWindowVisible(app))
  }

  // 桌面应用
  @computed get disktopViewApps(): IRuntimeApplication[] {
    return this.allApps.filter(app => app.pinDesktop)
  }

  // 任务栏应用
  @computed get berthViewApps(): IRuntimeApplication[] {
    return [
      ...this.pinBerthApps.slice(),
      ...this.runningAppsWithoutBerthApps.slice(),
    ]
  }

  // 更新历史应用
  @action.bound private pushHistory(app: IRuntimeApplication) {
    this.historyApps.push(app)
    this.historyApps.splice(18, 1000)
  }

  // 初始化系统应用
  @action.bound private initNativeApps(apps: ICompleteApplication[]) {
    apps.map(this.registerCompleteApp)
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

  // 运行 app
  @action.bound runApp(app: IRuntimeApplication) {
    if (ApplicationStore.isLinkType(app)) {
      runLinkApp(app)
    } else {
      app.status = ApplicationStatus.Running
      app.windowStatus.status = ApplicationWindowStatus.Normal
      console.log('打开这个 app 的 window 窗口, 并把窗口激活', app)
    }
  }

  // 关闭 app
  @action.bound closeApp(app: IRuntimeApplication) {
    this.pushHistory(app)
    app.status = ApplicationStatus.Dormancy
    app.windowStatus.status = ApplicationWindowStatus.Normal
    console.log('关闭这个 app 的 window 窗口', app)
  }

  // 切换 app 窗口状态
  @action.bound redrawAppWindow(app: IRuntimeApplication, targetWindowStatus: ApplicationWindowStatus) {
    app.windowStatus.status = targetWindowStatus
    console.log('切换这个 app 的 window 窗口大小状态', app, targetWindowStatus)
  }

  static isRunningStatus(app: IRuntimeApplication): boolean {
    return app.status !== ApplicationStatus.Dormancy
  }

  static isErringStatus(app: IRuntimeApplication): boolean {
    return app.status === ApplicationStatus.Error
  }

  static isWindowVisible(app: IRuntimeApplication): boolean {
    return app.windowStatus.status !== ApplicationWindowStatus.Minimize
  }

  static isWindowMax(app: IRuntimeApplication): boolean {
    return app.windowStatus.status === ApplicationWindowStatus.Maximize
  }

  static verifyType(app: IRuntimeApplication, type: ApplicationType): boolean {
    return app.type === type
  }

  static isLinkType(app: IRuntimeApplication): boolean {
    return ApplicationStore.verifyType(app, ApplicationType.Link)
  }

  static isPluginType(app: IRuntimeApplication): boolean {
    return ApplicationStore.verifyType(app, ApplicationType.Plugin)
  }

  static isIframeType(app: IRuntimeApplication): boolean {
    return ApplicationStore.verifyType(app, ApplicationType.Iframe)
  }

  static isNativeType(app: IRuntimeApplication): boolean {
    return ApplicationStore.verifyType(app, ApplicationType.Native)
  }

  static normalizeStandardApp(app: IStandardApplication): ICompleteApplication {
    return Object.assign({}, app, {
      autorun: false,
      protected: false,
      pinDesktop: true,
      pinBerth: true
    })
  }

  static normalizeCompleteApp(app: ICompleteApplication): IRuntimeApplication {
    return Object.assign({}, app, {
      status: ApplicationStatus.Dormancy,
      windowStatus: {
        status: ApplicationWindowStatus.Normal,
      }
    })
  }
}

export const applicationStore = new ApplicationStore()
