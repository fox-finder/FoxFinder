
import React from 'react'
import classNames from 'classnames'
import { MenuRegister } from 'bases/menu/Register'
import { optionStore } from 'stores/option'
import { AppIcons, IDesktopAppIconsProps } from "./Icons"
import { AppWindows, IDesktopAppWindowsProps } from "./Windows"
import styles from './desktop.module.scss'

interface IDesktopProps {
  appIconsProps?: IDesktopAppIconsProps
  appWindowsProps?: IDesktopAppWindowsProps
}

export const Desktop: React.FC<IDesktopProps> = (props) => {

  const classNameList = [
    styles.desktop,
    optionStore.isSmallSizeBerth && styles.smallBerth,
    optionStore.general.hideHeader && styles.hiddenHeader,
    optionStore.general.hideBerth && styles.hideBerth
  ]

  return (
    <div
      id="desktop"
      className={classNames(classNameList)}
      style={{
        backgroundColor: optionStore.personalize.backgroundColor,
        backgroundImage: `url(${optionStore.personalize.wallpaper})`
      }}
    >
      <AppIcons {...props.appIconsProps} />
      <AppWindows {...props.appWindowsProps} />
    </div>
  )
}
