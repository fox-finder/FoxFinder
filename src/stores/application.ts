
import { observable, computed, action } from 'mobx';
import { IApplication, ApplicationWindowStatus, ApplicationStatus } from 'types/application'
import { mockApplications } from 'mock/application'

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
    return this.allApps.filter(app => app.status !== ApplicationStatus.Normal)
  }

  // 运行时应用 -> 除去任务栏固定应用
  @computed get runningAppsWithoutBerthApps(): IApplication[] {
    return this.runningApps.filter(app => !this.pinBerthApps.includes(app))
  }

  // 窗口应用 -> 运行中且窗口可见
  @computed get windowViewApps(): IApplication[] {
    return this.runningApps.filter(app => ApplicationStore.isVisibleApp(app))
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
  runApp(app: IApplication) {
    console.log('打开这个 app 的 window 窗口', app)
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

  static isRunningApp(app: IApplication): boolean {
    return app.status !== ApplicationStatus.Normal
  }

  static isErringApp(app: IApplication): boolean {
    return app.status === ApplicationStatus.Error
  }

  static isVisibleApp(app: IApplication): boolean {
    return app.window.status !== ApplicationWindowStatus.Minimize
  }
}

export const applicationStore = new ApplicationStore()
