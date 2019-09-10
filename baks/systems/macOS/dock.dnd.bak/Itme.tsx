
import React from 'react'
import cns from 'classnames'
import { observer, Observer } from 'mobx-react'
import { useDrag, useDrop } from 'react-dnd'
import styles from './dock.module.scss'

export interface IProps {
  id: string // app name
  name: string // app name
  icon: string // app icon url/base64
  className?: string
  active?: boolean // is activited
  error?: boolean // app error status
  onClick(): void
  onContextmenu(): void
  onHover(): void
  onCancelHover(): void
  onMoveHover(oldId: string, newId: string): void
  onPush(oldId: string, newId: string): void
}

export const DockItem: React.FC<IProps> = observer((props) => {
  const ref = React.useRef(null)

  // 可拖动的
  const [{ isDragging }, connectDrag] = useDrag({
    item: { id: props.id, type: 'dock-app' },
    previewOptions: {
      captureDraggingState: true,
    },
    collect: (monitor: any) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  })

  // 可被拖入的
  const [, connectDrop] = useDrop({
    accept: ['dock-app', 'desktop-app'],
    drop({ id: draggedId, type }: { id: string; type: string }) {
      console.log('被拖动结束？？？', draggedId, type)
    },
    hover({ id: draggedId, type }: { id: string; type: string }, test: any) {
      console.log('hover 嘛', test)
      if (draggedId !== props.id) {
        if (type === 'dock-app') {
          props.onMoveHover(draggedId, props.id)
        } else {
          props.onPush(draggedId, props.id)
        }
      }
    },
  })

  connectDrag(ref)
  connectDrop(ref)

  return (
    <li
      ref={ref}
      onMouseEnter={props.onHover}
      onMouseLeave={props.onCancelHover}
      onClickCapture={props.onClick}
      onContextMenuCapture={props.onContextmenu}
      className={cns(
        styles.item,
        props.className,
        props.active && styles.active,
        props.error && styles.error
      )}
    >
      <span className={styles.name}>{props.name}</span>
      <img className={styles.icon} src={props.icon} />
      <span className={styles.indicator} />
    </li>
  );
})

export const DockSeparator: React.FC = () => {
  return (
    <li className={styles.separator} />
  );
}
