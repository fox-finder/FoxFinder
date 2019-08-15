
import React from 'react';
import classNames from 'classnames';
import { Window, TitleBar } from 'react-desktop/macOs';
import { IWindowProps } from '../window';
import styles from './window.module.scss';

export const MacOS: React.FC<IWindowProps> = (props) => {
  return (
    <Window
      chrome
      className={styles.window}
      width="100%"
      height="100%"
      padding={0}
    >
      <TitleBar
        title={props.title}
        className={classNames(props.handleClassName, styles.handle, styles.macOS)}
        isFullscreen={props.maximized}
        onCloseClick={props.onClose}
        onMaximizeClick={props.onMaximize}
        onMinimizeClick={props.onMinimize}
        onResizeClick={props.onRecover}
        controls
        inset
      />
      <div className={styles.content}>
        {props.children}
      </div>
    </Window>
  )
}
