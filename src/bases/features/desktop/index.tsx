
import React from 'react'
import classNames from 'classnames'
import { useDragLayer } from 'react-dnd'
import { observer, Observer } from 'mobx-react'
import { MenuRegister } from 'bases/features/menu/Register'
import { option } from 'engines/option'
import { AppIcons } from "./icons"
import { AppWindows } from "./windows"
import styles from './desktop.module.scss'

export const Desktop: React.FC = observer(() => {

  const classNameList = [
    styles.desktop,
    // option.general.hideHeader && styles.hiddenHeader,
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
      <AppIcons />
      <AppWindows />
    </div>
  )
})