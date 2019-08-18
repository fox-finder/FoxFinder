
import React from 'react';
import classNames from 'classnames';
import { observer, Observer } from 'mobx-react'
import { useDrag } from 'react-dnd'
import styles from './dock.module.scss'

export interface IProps {
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

export const DockItem: React.FC<IProps> = observer(props => {

  const [collectedProps, drag] = useDrag({
    item: { id: props.name, type: 'app' },
  })

  return (
    <li
      ref={drag}
      onMouseEnter={props.onHover}
      onMouseLeave={props.onCancelHover}
      onClickCapture={props.onClick}
      onContextMenuCapture={props.onContextmenu}
      className={classNames(
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
