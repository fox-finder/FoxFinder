
import { observable, computed, action } from 'mobx';
import { IApplication, ApplicationType, ApplicationWindowStatus, ApplicationStatus } from 'types/application'
import { mockApplications } from 'mock/application'
import { runLinkApp } from 'bases/renderers/Link'

export class ApplicationStore {

  // 所有应用
  @observable allApps: IApplication[] = mockApplications

  // 历史打开的应用
  @observable.shallow historyApps: IApplication[] = []

  // 任务栏固定应用
  @computed get pinBerthApps(): IApplication[] {
    return this.allApps.filter(app => app.pinBerth)
  }

  // 运行中的应用应用
  @computed get runningApps(): IApplication[] {
    return this.allApps.filter(app => app.status !== ApplicationStatus.Dormancy)
  }

  // 运行时应用 -> 除去任务栏固定应用
  @computed get runningAppsWithoutBerthApps(): IApplication[] {
    return this.runningApps.filter(app => !this.pinBerthApps.includes(app))
  }

  // 窗口应用 -> 运行中且窗口可见
  @computed get windowViewApps(): IApplication[] {
    return this.runningApps.filter(app => ApplicationStore.isWindowVisible(app))
  }

  // 桌面应用
  @computed get disktopViewApps(): IApplication[] {
    return this.allApps.filter(app => app.pinDesktop)
  }

  // 任务栏应用
  @computed get berthViewApps(): IApplication[] {
    return [
      ...this.pinBerthApps.slice(),
      ...this.runningAppsWithoutBerthApps.slice(),
    ]
  }

  // 更新历史应用
  @action.bound private pushHistory(app: IApplication) {
    this.historyApps.push(app)
    this.historyApps.splice(18, 1000)
  }

  // 注册新应用
  @action.bound registerApp(app: IApplication) {
    this.allApps.push(app)
  }

  // 运行 app
  @action.bound runApp(app: IApplication) {
    if (ApplicationStore.isLinkType(app)) {
      runLinkApp(app)
    } else {
      app.status = ApplicationStatus.Running
      console.log('打开这个 app 的 window 窗口', app)
    }
  }

  // 关闭 app
  closeApp(app: IApplication) {
    this.pushHistory(app);
    console.log('关闭这个 app 的 window 窗口', app)
  }

  // 切换 app 窗口状态
  toggleAppWindow(app: IApplication, targetWindowType: any) {
    console.log('切换这个 app 的 window 窗口大小状态', app, targetWindowType)
  }

  static isRunningStatus(app: IApplication): boolean {
    return app.status !== ApplicationStatus.Dormancy
  }

  static isErringStatus(app: IApplication): boolean {
    return app.status === ApplicationStatus.Error
  }

  static isWindowVisible(app: IApplication): boolean {
    return app.windowStatus.status !== ApplicationWindowStatus.Minimize
  }

  static verifyType(app: IApplication, type: ApplicationType): boolean {
    return app.type === type
  }

  static isLinkType(app: IApplication): boolean {
    return ApplicationStore.verifyType(app, ApplicationType.Link)
  }

  static isPluginType(app: IApplication): boolean {
    return ApplicationStore.verifyType(app, ApplicationType.Plugin)
  }

  static isIframeType(app: IApplication): boolean {
    return ApplicationStore.verifyType(app, ApplicationType.Iframe)
  }

  static isNativeType(app: IApplication): boolean {
    return ApplicationStore.verifyType(app, ApplicationType.Native)
  }
}

export const applicationStore = new ApplicationStore()
