
import React from 'react';
import classNames from 'classnames';
import { Spring } from 'react-spring/renderprops'
import { observer, Observer } from 'mobx-react'
import { Background } from 'bases/materials/background'
import { Application } from 'engines/application';
import styles from './dock.module.scss'

export interface IProps {
  name: string // app name
  icon: string // app icon url/base64
  className?: string
  running?: boolean
  erring?: boolean
  isHoverHost?: boolean
  isHoverNeighbour?: boolean
  isHoverDistant?: boolean
  onClick(): void
  onContextmenu(): void
  onHover?(): void
  onCancelHover?(): void
  ref?: React.RefObject<HTMLLIElement>
}


export const DockItem: React.FC<IProps> = React.forwardRef<HTMLLIElement, IProps>((props, ref) => {
  return (
    <li
      ref={ref}
      onMouseEnter={props.onHover}
      onMouseLeave={props.onCancelHover}
      onClickCapture={props.onClick}
      onContextMenuCapture={props.onContextmenu}
      className={classNames(
        styles.item,
        props.className,
        props.running && styles.running,
        props.erring && styles.erring
      )}
    >
      <Background tag="span" blur={true} className={styles.name}>{props.name}</Background>
      <img className={styles.icon} src={props.icon} />
      <span className={styles.indicator} />
    </li>
  )
})

export const DockSeparator: React.FC = () => {
  return (
    <li className={styles.separator} />
  )
}
