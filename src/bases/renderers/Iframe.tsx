
import React from 'react'
import classNames from 'classnames'
import { observer, Observer } from 'mobx-react'
import { IAppRendererProps } from './'
import styles from './renderer.module.scss'

export const IframeApp: React.FC<IAppRendererProps> = observer(({ app }) => {
  return (
    <>
      <iframe
        src={app.$.data}
        className={styles.iframe}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
      <div
        className={classNames(styles.iframeMask, app.isActivated && styles.discard)}
        onMouseDown={app.activate}
      />
    </>
  );
})
