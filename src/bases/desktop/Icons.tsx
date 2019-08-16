
import React from 'react'
import classNames from 'classnames'
import { optionStore } from 'stores/option'
import { applicationStore } from 'stores/application'
import styles from './desktop.module.scss'

export interface IDesktopAppIconsProps {
  isRightStart?: boolean
}

export const AppIcons: React.FC<IDesktopAppIconsProps> = (props) => {
  return (
    <div
      className={classNames(
        styles.icons,
        props.isRightStart && styles.rightStart,
        optionStore.isSmallSizeIcon && styles.small,
      )}
    >
      {applicationStore.disktopViewApps.map(app => (
        <div
          key={app.$.id}
          onDoubleClickCapture={app.run}
          className={classNames(
            styles.item,
            app.isRunning && styles.running,
          )}
        >
          <p className={styles.icon}>
            <img src={app.$.icon} alt={app.$.name} />
            <span className={styles.indicator}></span>
          </p>
          <p className={styles.name}>{app.$.name}</p>
        </div>
      ))}
    </div>
  )
}
