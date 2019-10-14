
import React from 'react';
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { Icon } from 'bases/materials/icon'
import { option } from 'engines/option'
import { IWindowProps } from '../window'
import styles from './window.module.scss'

function handleActionButtonMouseDown(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
  event.stopPropagation()
  event.preventDefault()
  console.log('hiehiehei', event)
}

export const Normal: React.FC<IWindowProps> = observer(props => {
  return (
    <div
      onMouseDown={() => {
        props.onActivate && props.onActivate()
      }}
      className={classNames(
        styles.window,
        styles.normal,
        props.locking && styles.lock,
        props.dragging && styles.dragging,
        props.actived && styles.actived,
      )}
    >
      <div
        onDoubleClick={props.onToggleWindow}
        className={classNames(
          props.handleClassName,
          styles.handle,
          option.isLeftActionDirection && styles.leftAction,
          option.isRightActionDirection && styles.rightAction,
        )}
      >
        <div className={classNames(styles.actions, props.actived && styles.actived)}>
          <span
            className={classNames(styles.item, styles.close)}
            onMouseMoveCapture={handleActionButtonMouseDown}
            onClickCapture={props.onClose}
            draggable={false}
          >
            <svg x="0px" y="0px" width="10px" height="10px" viewBox="0 0 20 20" data-radium="true">
              <polygon fill="#4d0000" points="15.9,5.2 14.8,4.1 10,8.9 5.2,4.1 4.1,5.2 8.9,10 4.1,14.8 5.2,15.9 10,11.1 14.8,15.9 15.9,14.8 11.1,10 "></polygon>
            </svg>
          </span>
          <span
            className={classNames(styles.item, styles.min)}
            onClickCapture={props.onMinimize}
          >
            <svg x="0px" y="0px" width="10px" height="10px" viewBox="0 0 20 20" data-radium="true">
              <rect fill="#995700" x="2.4" y="9" width="15.1" height="2"></rect>
            </svg>
          </span>
          <span
            className={classNames(styles.item, styles.toggle)}
            onClickCapture={props.onToggleWindow}
          >
            <svg x="0px" y="0px" width="10px" height="10px" viewBox="0 0 20 20" data-radium="true">
              <path fill="#006400" d="M5.3,16H13L4,7v7.7C4.6,14.7,5.3,15.4,5.3,16z"></path>
              <path fill="#006400" d="M14.7,4H7l9,9V5.3C15.4,5.3,14.7,4.6,14.7,4z"></path>
            </svg>
          </span>
        </div>
        <div className={styles.name}>
          <Icon className={styles.icon} src={props.icon} />
          <span>{props.title}</span>
        </div>
        <div className={styles.extra}></div>
      </div>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )
})
