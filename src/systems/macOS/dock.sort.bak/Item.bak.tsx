
import React from 'react';
import classNames from 'classnames';
import { Spring } from 'react-spring/renderprops'
import { observer, Observer } from 'mobx-react'
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
}

const APP_DEFAULT_SPRING = {
  itemWidth: 50,
  itemMargin: 0.2,
  iconScale: 1
}

const APP_HOST_SPRING = {
  // itemMargin: 0.8,
  itemMargin: 0.2,
  iconScale: 1.5
}

const APP_NEIGHBOUR_SPRING = {
  // itemMargin: 0.6,
  itemMargin: 0.2,
  iconScale: 1.3
}

const APP_DISTANT_SPRING = {
  // itemMargin: 0.3,
  itemMargin: 0.2,
  iconScale: 1.1
}

function getSpringFrom(props: IProps) {
  return { ...APP_DEFAULT_SPRING }
}

function getSpringTo(props: IProps) {
  if (props.isHoverHost) {
    return { ...APP_HOST_SPRING }
  }
  if (props.isHoverNeighbour) {
    return { ...APP_NEIGHBOUR_SPRING }
  }
  if (props.isHoverDistant) {
    return { ...APP_DISTANT_SPRING }
  }

  return { ...APP_DEFAULT_SPRING }
}

export const DockItem: React.FC<IProps> = observer(props => {
  return (
    <Spring
      // 仅处理全屏动画
      from={getSpringFrom(props)}
      to={getSpringTo(props)}
      // immediate={app.window.$_keepRigid}
      config={{ tension: 666, duration: 50 }}
    >
      {springProps => (
        <Observer render={() => (
          <li
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
            style={{
              // padding: `0 1rem`
              // width: `${springProps.itemWidth}px`
              padding: `0 ${springProps.itemMargin}rem`
            }}
          >
            <span className={styles.name}>{props.name}</span>
            <img className={styles.icon} src={props.icon} style={{ transform: `scale(${springProps.iconScale})` }} />
            <span className={styles.indicator} />
          </li>
        )} />
      )}
    </Spring>
  )
})

export const DockSeparator: React.FC = () => {
  return (
    <li className={styles.separator} />
  )
}
