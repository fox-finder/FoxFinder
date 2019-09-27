
import React from 'react';
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { IWindowProps } from '.'
import styles from './window.module.scss'

export const Naked: React.FC<IWindowProps> = observer(props => {
  return (
    <div
      onMouseDown={() => {
        props.onActivate && props.onActivate()
      }}
      className={classNames(
        styles.window,
        styles.naked,
        props.locking && styles.lock,
        props.dragging && styles.dragging
      )}
    >
      <div className={classNames(props.handleClassName, styles.handle)}>
        <span
          className={classNames(
            styles.close,
            props.locking && styles.hidden
          )}
          onClickCapture={() => {
            !props.locking && props.onClose()
          }}
        >
          <img src="/images/icons/shutdown.svg" className={styles.icon} />
        </span>
        <span
          className={styles.pin}
          onClickCapture={() => {
            props.locking
              ? props.onUnlock()
              : props.onLock()
          }}
        >
          <img
            className={styles.icon}
            src={props.locking
              ? '/images/icons/pin.svg'
              : '/images/icons/unpin.svg'
            }
          />
        </span>
      </div>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )
})
