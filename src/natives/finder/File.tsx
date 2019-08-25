
import React from 'react'
import classNames from 'classnames'
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd'
import { observer } from 'mobx-react'
import { Application } from 'engines/application'
import { DndType } from 'engines/dnd'
import { File } from 'engines/file'
import { FileIcon } from 'bases/file/icon'
import { IFile } from 'types/file'
import styles from './finder.module.scss'

export interface IFileProps {
  file: IFile
}

export const FileT: React.FC<IFileProps> = observer((({ file }) => {
  const ref = React.useRef(null)

  // Drag
  const [{ isDragging }, connectDrag] = useDrag({
    item: {
      id: file.path,
      type: File.isDirectory(file) ? DndType.FinderFolder : DndType.FinderFile
    },
    canDrag() {
      // Native apps can't drag
      // return !app.isNativeType
      return true
    },
    collect: (monitor: DragSourceMonitor) => {
      return {
        isDragging: monitor.isDragging()
      }
    },
    end(item, monitor: DragSourceMonitor) {
      console.log('拖 finder 文件结束', item)
    }
  })

  // Drop
  const [, connectDrop] = useDrop({
    accept: [DndType.FinderFile, DndType.FinderFolder],
    canDrop() {
      return false
      // return !app.isNativeType
    },
    drop({ id: draggedId, type }: { id: string; type: string }) {
      // console.log(draggedId, 'finer 之间互相排序', draggedId, type)
    },
    hover(data) {
      // console.log('有人往 finder 的图标上拖了：', data)
    },
  })

  connectDrag(ref)
  connectDrop(ref)

  return (
    <li
      ref={ref}
      className={classNames(styles.item)}
    >
      <p className={styles.icon}>
        <FileIcon file={file} />
      </p>
      <p className={styles.name}>{file.name}</p>
    </li>
  )
}))
