
import React from 'react'
import cns from 'classnames'
import { observer, Observer } from 'mobx-react'
import { DragSource, DropTarget } from 'react-dnd';
import { useDrag, useDrop } from 'react-dnd'
import styles from './dock.module.scss'

export interface IProps {
  id: string // app name
  index: number // app name
  name: string // app name
  icon: string // app icon url/base64
  className?: string
  active?: boolean // is activited
  error?: boolean // app error status
  onClick(): void
  // onContextmenu(): void
  // onHover(): void
  // onCancelHover(): void
  onMoveHover: any
  onPush(oldId: string, newId: string): void
  style?: any
}

export const DockItem: React.FC<IProps> = observer((props) => {
  const ref = React.useRef(null)

  // 可拖动的
  const [{ isDragging }, connectDrag] = useDrag({
    item: { id: props.id, index: props.index, type: 'dock-app' },
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
    drop(test: any, test2: any) {
      // console.log('被拖动结束，真正地改变数据：', test, test2)
    },
    hover({ id: draggedId, type, index }: any, test: any) {
      // console.log('hover 嘛', test)
      if (draggedId !== props.id) {
        if (type === 'dock-app') {
          props.onMoveHover(draggedId, index, props.id, props.index)
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
      // onMouseEnter={props.onHover}
      // onMouseLeave={props.onCancelHover}
      onClickCapture={props.onClick}
      // onContextMenuCapture={props.onContextmenu}
      style={{ ...props.style, opacity: isDragging ? 0 : 1 }}
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

// interface IRProps {
//   connectDragSource: any
//   connectDropTarget: any
//   isDragging: boolean
//   id: number
//   order: number
//   text: string
//   moveCard: any
//   style?: any
// }

// const cardSource = {
//   beginDrag(props: any) {
//     return {
//       id: props.id,
//       order: props.order,
//     };
//   },
// };

// const cardTarget = {
//   hover(props: any, monitor: any, component: any) {
//     const dragId = monitor.getItem().id;
//     const hoverId = props.id;
//     const dragOrder = monitor.getItem().order;
//     const hoverOrder = props.order;

//     if (dragId === hoverId) {
//       return;
//     }
    
//     const { decoratedComponentInstance } = component;
//     const hoverBoundingRect = decoratedComponentInstance.node.getBoundingClientRect();
//     const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//     const clientOffset = monitor.getClientOffset();
//     const hoverClientY = clientOffset.y - hoverBoundingRect.top;

//     if (dragOrder < hoverOrder && hoverClientY < hoverMiddleY) {
//       return;
//     }

//     if (dragOrder > hoverOrder && hoverClientY > hoverMiddleY) {
//       return;
//     }
  
//     props.moveCard(dragId, hoverId);
//   },
// };

// @DropTarget('dock-app', cardTarget, connect => ({
//   connectDropTarget: connect.dropTarget(),
// }))
// @DragSource('dock-app', cardSource, (connect, monitor) => ({
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging(),
//   })
// )
// export default class Card extends React.Component<IRProps> {

//   node: any = null

//   render() {
//     const { style, text, isDragging, connectDragSource, connectDropTarget } = this.props;
//     const opacity = isDragging ? 0 : 1;
//     const zIndex = isDragging ?  2 : 1;

//     return connectDragSource(connectDropTarget(
//       <div 
//         className="Card" 
//         style={{ zIndex, opacity, ...style }}
//         ref={node => (this.node = node)}  
//       >
//         {text}<br />
//       </div>,
//     ));
//   }
// }
