
import React from 'react'
import classNames from 'classnames'
import { useDrop } from 'react-dnd'
import { observer } from 'mobx-react'
import { option } from 'engines/option'
import { process } from 'engines/process'
import { DndType } from 'engines/dnd'
import { MenuRegister } from 'bases/layouts/menu'
import { menus } from './menus'
import { AppIcon } from './Icon'
import styles from './icons.module.scss'

export const AppIcons: React.FC = observer(() => {

  const [, connectDrop] = useDrop({
    accept: [DndType.BerthApp, DndType.FinderFile, DndType.FinderFolder],
    hover(data) {
      console.log(`desktop 被拖入东西：`, data)
    },
  })
  
  return (
    <MenuRegister list={menus}>
      <div
        ref={connectDrop}
        className={classNames(
          styles.icons,
          !option.isLeftActionDirection && styles.rightStart,
        )}
      >
        {process.disktopViewApps.slice().map(app => (
          <AppIcon app={app} key={app.uuid} />
        ))}
      </div>
    </MenuRegister>
  )
})
