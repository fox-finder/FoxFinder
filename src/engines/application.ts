
import uuid from 'uuid';
import { observable, computed, action } from 'mobx';
import { Position } from 'react-rnd'
import { GLOBAL_OPTIONS } from 'engines/option'
import { process } from 'engines/process'
import { runLinkApp } from 'bases/renderers/Link'
import {
  ICompleteApplication,
  ApplicationType,
  ApplicationWindowState,
  IApplicationWindowSize,
  IApplicationWindow,
  ApplicationState
} from 'types/application'

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

export class Application {

  // uuid
  uuid = uuid()

   // meta data
  @observable $!: ICompleteApplication

  // system data
  // @observable $$!: ICompleteApplication

   // run state
  @observable state!: ApplicationState

   // window state
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
    return process.activeAppId === this.uuid
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
    return Application.verifyType(this, ApplicationType.Link)
  }

  @computed get isShortcutType(): boolean {
    return Application.verifyType(this, ApplicationType.Shortcut)
  }

  @computed get isExtAppType(): boolean {
    return Application.verifyType(this, ApplicationType.ExtApp)
  }

  @computed get isIframeType(): boolean {
    return Application.verifyType(this, ApplicationType.Iframe)
  }

  @computed get isNativeType(): boolean {
    return Application.verifyType(this, ApplicationType.Native)
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

    // first run -> reset window
    if (!this.isRunning) {
      this.window.state = this.getDefaultWindowSize()
    }
    // run（open window）
    if (this.state === ApplicationState.Dormancy) {
      this.state = ApplicationState.Running
    }
    // visible window
    this.visibleWindow()
    // activate window
    this.activate()
  }

  @action.bound close() {
    // 休眠状态（关闭窗口） -> 重置窗口
    // TODO: 要失去焦点
    this.state = ApplicationState.Dormancy
  }

  @action.bound toggle(): void {
    // dormancy -> run
    if (!this.isRunning) {
      this.run()
      return
    }

    // running -> hidden | run
    if (!this.isActivated || !this.isWindowVisible) {
      this.run()
    } else {
      this.hiddenWindow()
    }
  }

  @action.bound activate() {
    this.updateZIndex(process.maxDesktopZIndex)
    process.activateApp(this)
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

  static verifyType(app: Application, type: ApplicationType): boolean {
    return app.$.type === type
  }
}
