
import React from 'react'
import cns from 'classnames'
import { observer, Observer } from 'mobx-react'
import { useDrag, useDrop } from 'react-dnd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './dock.module.scss'
import headerStyles from '../header.module.scss'

export interface IProps {
  id: string // app name
  index: number
  name: string // app name
  icon: string // app icon url/base64
  className?: string
  active?: boolean // is activited
  error?: boolean // app error status
  onClick(): void
  onContextmenu(): void
  onHover(): void
  onCancelHover(): void
}

export const DockItem: React.FC<IProps> = observer((props) => {
  
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: 'none',
    background: isDragging ? 'black' : 'red',
    ...draggableStyle,
  });

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => {
        // console.log('拖动渲染了多少次', snapshot.draggingOver)
        return (
          <li
            ref={provided.innerRef}
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
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {snapshot.draggingOver === 'trash' && '卸载'}
            <span className={styles.name}>{props.name}</span>
            <img className={cns(headerStyles.svgIcon, styles.icon)} src={props.icon} />
            <span className={styles.indicator} />
          </li>
        )
      }}
    </Draggable>
  );
})

export const DockSeparator: React.FC = () => {
  return (
    <li className={styles.separator} />
  );
}
