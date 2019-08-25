
import React from 'react';
import classNames from 'classnames';
import { Window, TitleBar } from 'react-desktop/macOs';
import { IWindowProps } from '../window';
import styles from './window.module.scss';

export const MacOS: React.FC<IWindowProps> = (props) => {

  // INFO: 排除三个操作按钮的事件
  function handleActivateEvent(event: React.MouseEvent<HTMLElement>) {
    const isFromSVG: boolean = event.target && (event.target as any).tagName === 'svg'
    if (!isFromSVG && props.onActivate) {
      props.onActivate()
    }
  }

  return (
    <Window
      chrome
      className={styles.window}
      width="100%"
      height="100%"
      padding={0}
      onMouseDown={handleActivateEvent}
      isWindowFocused={props.actived}
    >
      <TitleBar
        title={props.title}
        className={classNames(props.handleClassName, styles.handle, styles.macOS)}
        isFullscreen={props.maximized}
        isWindowFocused={props.actived}
        onCloseClick={props.onClose}
        onMinimizeClick={props.onMinimize}
        onMaximizeClick={props.onMaximize}
        onResizeClick={props.onToggleWindow}
        onDoubleClick={props.onToggleWindow}
        controls
      />
      <div className={styles.content}>
        {props.children}
      </div>
    </Window>
  )
}
