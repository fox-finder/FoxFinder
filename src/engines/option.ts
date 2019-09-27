
import { Position } from 'react-rnd'
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { ApplicationComponent, IApplicationWindowSize } from 'types/application';

// Global default options
export const GLOBAL_OPTIONS = {
  defaultIconSize: 51,
  defaultBerthHeight: 42,
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

// Desktop icons direction and window action buttons direction
export enum HabitActionDirection {
  Left = 'left',
  Right = 'right'
}

// Body document class names
export enum BodyThemeClassName {
  Default = 'default',
  Dark = 'dark'
}

export interface SystemOptions {
  general: {
    sound: boolean // 音效
    animation: boolean // 动画
    berthSize: number // 任务栏尺寸
    iconSize: number // desktop icon size -> px
    habitActionDirection: HabitActionDirection
  }
  personalize: {
    darkTheme: boolean // 深色模式
    wallpaper?: string // 墙纸地址
    backgroundColor?: string // 背景色
  }
}

export class Option {

  // General options
  @observable general = {
    sound: true,
    animation: true,
    iconSize: GLOBAL_OPTIONS.defaultIconSize,
    berthHeight: GLOBAL_OPTIONS.defaultBerthHeight,
    habitActionDirection: HabitActionDirection.Left
  }

  // 个性化设置
  @observable personalize = {
    darkTheme: false,
    backgroundColor: 'blue',
    // wallpaper: '/images/wallpapers/p.jpg',
    // wallpaper: '/images/wallpapers/Sierra.jpg',
    // wallpaper: '/images/wallpapers/7c8142c69440cf4bed95da66fc3fe9c4.jpeg',
    // wallpaper: '/images/wallpapers/9cc587afb7981342fc68c5dfe1f6264b.jpg',
    // wallpaper: '/images/wallpapers/10cfedef80c42ba5776ac957b1a6a84e.jpeg',
    // wallpaper: '/images/wallpapers/deb792b9c909a1699e460a3eb228589c.jpg',
    // wallpaper: '/images/wallpapers/blake-connally-B3l0g6HLxr8-unsplash.jpg',
    // wallpaper: '/images/wallpapers/elephant-1822636_1920.jpg',
    // wallpaper: '/images/wallpapers/milky-way-1023340_1920.jpg',
    wallpaper: '/images/wallpapers/nature-3082832_1920.jpg',
    // wallpaper: '/images/wallpapers/alexandre-debieve-FO7JIlwjOtU-unsplash.jpg',
    // wallpaper: '/images/wallpapers/flat-3840x2160-forest-deer-4k-5k-iphone-wallpaper-abstract-11925.jpg',
    // wallpaper: '/images/wallpapers/alabama-hills-5120x2880-5k-4k-wallpaper-california-us-mountains-sky-4887.jpg',
    // wallpaper: '/images/wallpapers/night-sky-3840x2160-5k-4k-wallpaper-stars-mountains-bridge-new-zealand-547.jpg',
  }

  constructor() {
    this.updateThemeMode(true)
  }

  @action.bound updateThemeMode(darkTheme: boolean) {
    this.personalize.darkTheme = darkTheme
    document.body.classList.remove(BodyThemeClassName.Default, BodyThemeClassName.Dark)
    document.body.classList.add(
      darkTheme
        ? BodyThemeClassName.Dark
        : BodyThemeClassName.Default
    )
  }

  get berthHeightValue(): string {
    return parseInt(this.general.berthHeight as any) + 'px'
  }

  get isLeftActionDirection(): boolean {
    return this.general.habitActionDirection === HabitActionDirection.Left
  }

  get isRightActionDirection(): boolean {
    return this.general.habitActionDirection === HabitActionDirection.Right
  }
}

export const option = new Option()
