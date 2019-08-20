
import React from 'react'
import classNames from 'classnames'
import { useDrag } from 'react-dnd'
import { observer } from 'mobx-react'
import { optionStore } from 'stores/option'
import { applicationStore, App } from 'stores/application'
import styles from './desktop.module.scss'

export interface IDesktopAppIconsProps {
  isRightStart?: boolean
}

export const Icon: React.FC<{ app: App }> = observer(({ app }) => {

  const [collectedProps, drag] = useDrag({
    item: { id: app.$.name, type: 'app' },
  })

  return (
    <div
      ref={drag}
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
  )
})

export const AppIcons: React.FC<IDesktopAppIconsProps> = observer(props => {

  return (
    <div
      className={classNames(
        styles.icons,
        props.isRightStart && styles.rightStart,
        optionStore.isSmallSizeIcon && styles.small,
      )}
    >
      {applicationStore.disktopViewApps.map(app => (
        <Icon app={app} key={app.$.id} />
      ))}
    </div>
  )
})
