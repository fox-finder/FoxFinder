
import React from 'react'
import classNames from 'classnames'
import { useDragLayer } from 'react-dnd'
import { observer, Observer } from 'mobx-react'
import { MenuRegister } from 'bases/layouts/menu/Register'
import { option } from 'engines/option'
import { AppIcons, IDesktopAppIconsProps } from "./icons"
import { AppWindows, IDesktopAppWindowsProps } from "./windows"
import styles from './desktop.module.scss'

interface IDesktopProps {
  appIconsProps?: IDesktopAppIconsProps
  appWindowsProps?: IDesktopAppWindowsProps
}

export const Desktop: React.FC<IDesktopProps> = observer(props => {

  const classNameList = [
    styles.desktop,
    option.isSmallSizeBerth && styles.smallBerth,
    option.general.hideHeader && styles.hiddenHeader,
    option.general.hideBerth && styles.hideBerth
  ]

  return (
    <div
      id="desktop"
      className={classNames(classNameList)}
      style={{
        backgroundColor: option.personalize.backgroundColor,
        backgroundImage: `url(${option.personalize.wallpaper})`
      }}
    >
      <AppIcons {...props.appIconsProps} />
      <AppWindows {...props.appWindowsProps} />
    </div>
  )
})