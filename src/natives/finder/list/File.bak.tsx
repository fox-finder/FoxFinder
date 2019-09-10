
import { IFile } from '@fox-finder/base'
import React from 'react'
import classNames from 'classnames'
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd'
import { observer } from 'mobx-react'
import { Application } from 'engines/application'
import { openFile } from 'engines/file'
import { DndType } from 'engines/dnd'
import { FileIcon as BaseFileIcon } from 'natives/finder/icon'
import styles from './icons.module.scss'

interface IFileIconProps {
  file: IFile
}

export const FileIcon: React.FC<IFileIconProps> = observer(({ file }) => {
  const ref = React.useRef(null)

  // Drag
  const [{ isDragging }, connectDrag] = useDrag({
    item: {
      id: file.path,
      type: DndType.DesktopFile
    },
    // canDrag() {
      // Native apps can't drag
      // return !file.isNativeType
    // },
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
    accept: [DndType.DesktopFile, DndType.DesktopFolder],
    // canDrop() {
    //   // Native apps Trash carn drop -> delete file | folder or unpin app
    //   return false
    //   // return !app.isNativeType
    // },
    drop(data) {
      console.log(data)
    },
    hover(data) {
      console.log(data)
    },
  })

  connectDrag(ref)
  connectDrop(ref)

  return (
    <div
      ref={ref}
      onDoubleClickCapture={() => openFile(file)}
      className={styles.item}
    >
      <p className={styles.icon}>
        <BaseFileIcon file={file} />
      </p>
      <p className={styles.name}>{file.name}</p>
    </div>
  )
})
