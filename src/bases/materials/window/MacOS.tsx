
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
      // 当点击的事件目标是三个 controls 时，不 emit 事件
      onClickCapture={props.onActivate}
      onMouseDown={props.onActivate}
    >
      <TitleBar
        title={props.title}
        className={classNames(props.handleClassName, styles.handle, styles.macOS)}
        isFullscreen={props.maximized}
        isWindowFocused={props.actived}
        onCloseClick={props.onClose}
        onMinimizeClick={props.onMinimize}
        onMaximizeClick={props.onMaximize}
        onResizeClick={props.onToggle}
        onDoubleClick={props.onToggle}
        controls
      />
      <div className={styles.content}>
        {props.children}
      </div>
    </Window>
  )
}
