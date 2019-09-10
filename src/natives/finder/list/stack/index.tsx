
import { IFile } from '@fox-finder/base'
import React from 'react'
import classNames from 'classnames'
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd'
import { observer } from 'mobx-react'
import { isTrashApp } from 'natives/trash'
import { Application } from 'engines/application'
import { DndType } from 'engines/dnd'
import { FileIcon, PureFileIcon } from 'natives/finder/icon'
import styles from './stack.module.scss'

export interface IProps {
  name: string
  files: IFile[]
  expanded: boolean
  onToggleExpand(): void
}

export const FileStack: React.FC<IProps> = observer((props => {
  return (
    <div
      onClickCapture={props.onToggleExpand}
      className={styles.item}
    >
      <p className={classNames(styles.icon, styles.stack, props.expanded && styles.expanded)}>
        <PureFileIcon name={props.name} />
        {props.files.slice(0, 3).map((file, index, files) => (
          <FileIcon
            key={index}
            file={file}
            className={styles.offsetlayer}
            style={{
              zIndex: index + 1,
              left: 0,
              transform: `rotate(${10 * (index + 1)}deg)`,
              position: 'absolute'
            }}
          />
        ))}
      </p>
      <p className={styles.name}>{props.name}</p>
    </div>
  )
}))
