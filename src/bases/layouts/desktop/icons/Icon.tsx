
import React from 'react'
import classNames from 'classnames'
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd'
import { observer } from 'mobx-react'
import { Application } from 'engines/application'
import { DndType } from 'engines/dnd'
import { isTrashApp } from 'natives/trash'
import styles from './icons.module.scss'

export const AppIcon: React.FC<{ app: Application }> = observer(({ app }) => {
  const ref = React.useRef(null)

  // Drag
  const [{ isDragging }, connectDrag] = useDrag({
    item: {
      id: app.$.id,
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
      console.log(draggedId, '图标被拖入', draggedId, app.$.id)
    },
  })

  connectDrag(ref)
  connectDrop(ref)

  return (
    <div
      ref={ref}
      onDoubleClickCapture={app.run}
      className={classNames(
        styles.item,
        app.isRunning && styles.running,
      )}
    >
      <p className={styles.icon}>
        <img draggable={false} src={app.$.icon} alt={app.$.name} />
        <span className={styles.indicator}></span>
      </p>
      <p className={styles.name}>{app.$.name}</p>
    </div>
  )
})
