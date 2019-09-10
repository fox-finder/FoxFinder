
import React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { Transition } from 'react-spring/renderprops'
import { process } from 'engines/process'
import { option } from 'engines/option'
import { AppWindow } from './Window'
import styles from '../desktop.module.scss'

export const AppWindows = observer(() => {
  return (
    <>
      <div
        className={classNames(
          styles.windows,
          // option.general.hideHeader && styles.hideHeader
        )}
      >
        <Transition
          keys={app => app.$.id}
          items={process.windowViewApps.slice()}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
          config={{ duration: 260 }}
        >
          {app => props => (
            <AppWindow key={app.$.id} app={app} hidden={props.opacity !== 1} />
          )}
        </Transition>
      </div>
      <div className={classNames(styles.windows, styles.dragBox)}></div>
    </>
  )
})
