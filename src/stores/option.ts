
import { Position } from 'react-rnd'
import { ApplicationComponent, IApplicationWindowSize } from 'types/application';
import { SystemType } from 'types/system';

export const GLOBAL_OPTIONS = {
  minWindowWidth: 180,
  minWindowHeight: 130,
  defaultWindowSIze: {
    width: '80%',
    height: '70%'
  } as IApplicationWindowSize,
  defaultWindowPosition: {
    x: 120,
    y: 120
  } as Position
}

export enum GeneralSize {
  Normal = 'normal',
  Small = 'small',
}

export enum DesktopIconStartDirection {
  Auto = 'auto',
  Left = 'left',
  Right = 'right',
}

export type NormalizeComponentMap = {
  [key in SystemType]: ApplicationComponent
}

export interface SystemOptions {
  general: {
    sound: boolean // 音效
    animation: boolean // 动画
    hideHeader: boolean // 隐藏头部栏
    hideBerth: boolean // 隐藏任务栏
    berthSize: GeneralSize // 任务栏尺寸
    iconSize: GeneralSize // 图标尺寸
    iconStartDirection: DesktopIconStartDirection // 图标起始方向
  }
  personalize: {
    system: SystemType // 系统模式
    darkTheme: boolean // 深色模式
    wallpaper?: string // 墙纸地址
    backgroundColor?: string // 背景色
  }
}

export class OptionStore {

  // 通用设置
  general = {
    sound: true,
    animation: true,
    hideHeader: false,
    hideBerth: false,
    berthSize: GeneralSize.Normal,
    iconSize: GeneralSize.Normal,
    iconStartDirection: DesktopIconStartDirection.Auto
  }

  // 个性化设置
  personalize = {
    system: SystemType.MacOS,
    darkTheme: false,
    backgroundColor: 'red',
    wallpaper: '/images/wallpapers/Sierra.jpg'
  }

  get isSmallSizeBerth(): boolean {
    return this.general.berthSize === GeneralSize.Small
  }

  get isSmallSizeIcon(): boolean {
    return this.general.iconSize === GeneralSize.Small
  }

  get isLeftDirectionWithIcon(): boolean {
    return this.general.iconStartDirection === DesktopIconStartDirection.Left
  }

  get isRightDirectionWithIcon(): boolean {
    return this.general.iconStartDirection === DesktopIconStartDirection.Right
  }

  static normalizeComponent(componentMap: NormalizeComponentMap) {
    return componentMap[optionStore.personalize.system]
  }
}

export const optionStore = new OptionStore()
