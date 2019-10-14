
import React from 'react'
import classNames from 'classnames'
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd'
import { observer } from 'mobx-react'
import { Application } from 'engines/application'
import { DndType } from 'engines/dnd'
import { isTrashApp } from 'natives/trash'
import { option } from 'engines/option';
import { Icon } from 'bases/materials/icon'
import { getIconPath } from 'transforms/icon'
import { MenuRegister, MenuIcon, IMenuList } from 'bases/features/menu'
import styles from './icons.module.scss'

export function getAppContextMenuList(app: Application): IMenuList {

  const separator = {
    separator: true
  }

  const iconContextMenu = app.$.iconContextMenu || []

  const toggleApp = {
    label: app.isRunning ? '关闭应用' : '运行应用',
    icon: <MenuIcon svg={getIconPath('replay')} />,
    onClick: app.isRunning ? app.close : app.run
  }

  const pinDock = {
    label: '将应用固定在桌面',
    icon: <MenuIcon svg={getIconPath('replay')} />,
    onClick() {
      console.log('到菜单')
    }
  }

  const menus: IMenuList = [
    toggleApp,
    pinDock
  ]

  if (iconContextMenu.length) {
    menus.push(separator, ...iconContextMenu)
  }

  return menus
}

export const AppIcon: React.FC<{ app: Application }> = observer(({ app }) => {
  const ref = React.useRef(null)

  // Drag
  const [{ isDragging }, connectDrag] = useDrag({
    item: {
      id: app.uuid,
      type: DndType.DesktopApp
    },
    canDrag() {
      // Native apps can't drag
      return !app.isNativeType
    },
    collect: (monitor: DragSourceMonitor) => {
      return {
        isDragging: monitor.isDragging()
      }
    },
    // end(item, monitor: DragSourceMonitor) {
    //   console.log('拖桌面 app 结束', item)
    // }
  })

  // Drop
  const [, connectDrop] = useDrop({
    // Trash -> all type -> delete | unpin
    // Native app -> none -> can't sort
    // Other App -> app type -> sort
    accept: isTrashApp(app)
      ? [DndType.BerthApp, DndType.DesktopApp, DndType.DesktopFile, DndType.DesktopFolder, DndType.FinderFile, DndType.FinderFolder]
      : app.isNativeType
        ? []
        : [DndType.DesktopApp]
    ,
    // canDrop() {
    //   // Native apps Trash carn drop -> delete file | folder or unpin app
    //   return false
    //   // return !app.isNativeType
    // },
    drop({ id: draggedId, type }: { id: string; type: string }) {
      console.log(draggedId, '图标被拖入结束：', draggedId, type)
    },
    hover({ id: draggedId }: { id: string; type: string }) {
      console.log(draggedId, '图标被拖入', draggedId, app.uuid)
    },
  })

  connectDrag(ref)
  connectDrop(ref)

  return (
    <MenuRegister list={getAppContextMenuList(app)}>
      <div
        ref={ref}
        onDoubleClickCapture={app.run}
        className={classNames(
          styles.item,
          app.isRunning && styles.running,
        )}
      >
        <p className={styles.icon}>
          <Icon
            src={app.$.icon}
            alt={app.$.name}
            style={{
              width: option.general.iconSize + 'px',
              height: option.general.iconSize + 'px'
            }}
          />
          <span className={styles.indicator}></span>
        </p>
        <p className={styles.name}>{app.$.name}</p>
      </div>
    </MenuRegister>
  )
})
