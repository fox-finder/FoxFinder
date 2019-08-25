
import { observable, computed, action } from 'mobx';
import { mockUserApplications } from 'mock/application'
import { Application } from 'engines/application'
import {
  INecessaryApplication,
  IStandardApplication,
  ICompleteApplication,
  ApplicationState
} from 'types/application'

import { FinderPackage } from 'natives/finder'
import { SettingPackage } from 'natives/setting'
import { CloudStorePackage } from 'natives/store'
import { TerminalPackage } from 'natives/terminal'
import { MonitorPackage } from 'natives/monitor'
import { TrashPackage } from 'natives/trash'

const nativeApps = [
  FinderPackage,
  TrashPackage,
  SettingPackage,
  CloudStorePackage,
  TerminalPackage,
  MonitorPackage
]

function getDefaultCompletetOptions(): INecessaryApplication {
  // const nativeCount = nativeApps.length
  // const allCount = applicationStore.allApps.length
  // const defaultOrder = allCount < nativeCount
  //   ? nativeCount + 1
  //   : allCount + 1
  const defaultOrder = process.allApps.length + 1

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

export class Process {

  // 所有应用
  @observable allApps: Application[] = []

  // 历史打开的应用
  @observable.shallow historyApps: Application[] = []

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
  @computed get pinBerthApps(): Application[] {
    return this.allApps.filter(app => app.$.pinBerth)
  }

  // 运行中的应用
  @computed get runningApps(): Application[] {
    return this.allApps.filter(app => app.state !== ApplicationState.Dormancy)
  }

  // 运行时应用 -> 除去任务栏固定应用
  @computed get runningAppsWithoutBerthApps(): Application[] {
    return this.runningApps.filter(app => !this.pinBerthApps.includes(app))
  }

  // 窗口应用 -> 运行中（无论窗口是否可见，都应该在 dom 中）
  @computed get windowViewApps(): Application[] {
    return this.runningApps.filter(app => app.isRunning)
  }

  // 桌面应用
  @computed get disktopViewApps(): Application[] {
    return this.allApps
      .filter(app => app.$.pinDesktop)
      .sort((prev: Application, next: Application) => prev.$.desktopOrder - next.$.desktopOrder)
  }

  // 任务栏应用
  @computed get berthViewApps(): Application[] {
    return [
      ...this.pinBerthApps
        .slice()
        .sort((prev: Application, next: Application) => prev.$.berthOrder - next.$.berthOrder),
      ...this.runningAppsWithoutBerthApps.slice(),
    ]
  }

  // 可见应用
  @computed get windowVisibleApps(): Application[] {
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
  @action private pushHistory(app: Application) {
    this.historyApps.unshift(app)
    this.historyApps.splice(18, 1000)
  }

  // 初始化系统应用
  @action private initNativeApps(apps: ICompleteApplication[]) {
    apps.map(this.registerCompleteApp)
  }

  // 激活某个应用 -> 更新 ID -> 更新所有窗的 zIndex - 1
  @action.bound activateApp(app: Application) {
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
      Process.normalizeCompleteApp(app)
    )
  }

  // 注册标准应用
  @action.bound registerStandardApp(app: IStandardApplication) {
    this.allApps.push(
      Process.normalizeCompleteApp(
        Process.normalizeStandardApp(app)
      )
    )
  }

  static isTrashApp(app: Application): boolean {
    return app.$.id === TrashPackage.id
  }

  static normalizeStandardApp(app: IStandardApplication): ICompleteApplication {
    return { ...getDefaultCompletetOptions(), ...app }
  }

  static normalizeCompleteApp(app: ICompleteApplication): Application {
    return new Application(app)
  }
}

export const process = new Process()
