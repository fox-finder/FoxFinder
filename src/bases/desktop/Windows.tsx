
import React from 'react';
import classNames from 'classnames';
import { observer } from "mobx-react"
import { Rnd } from 'react-rnd';
import { applicationStore, App } from 'stores/application';
import { optionStore } from 'stores/option';
import { AppRenderer } from 'bases/renderers'
import { Window } from 'bases/materials/window';
import styles from './desktop.module.scss';

export interface IDesktopAppWindowsProps {}

export function getAppWindowHandleClassName(app: App) {
  return app.$.id + '-' + 'handle'
}

export function getAppWindowResizingProps(app: App) {
  const noBorder = app.$.window && !app.$.window.border
  const isMaxWindow = app.isWindowMax

  if (noBorder || isMaxWindow) {
    return {
      enableResizing: {
        bottom: false,
        bottomLeft: false,
        bottomRight: false,
        left: false,
        right: false,
        top: false,
        topLeft: false,
        topRight: false
      }
    }
  }
}

export function getAppWindowDefaultProps(app: App) {
  const size = app.$.window && app.$.window.defaultSize || {
    width: optionStore.general.defaultWindowWidth,
    height: optionStore.general.defaultWindowHeight
  }

  // TODO: 这里取决于已经开了几个应用，比如开了两个应用，则加偏移
  const position = {
    x: 100,
    y: 100
  }

  return { default:  { ...size, ...position }}
}

@observer class AppWindow extends React.Component<{ app: App }> {
  render() {
    const { app } = this.props
    return (
      <Rnd
        dragHandleClassName={getAppWindowHandleClassName(app)}
        className={classNames(
          styles.item,
          app.isWindowMax && styles.fullscreen,
          !app.isWindowVisible && styles.hidden
        )}
        minWidth={180}
        minHeight={130}
        maxWidth="100%"
        bounds="parent"
        {...getAppWindowResizingProps(app)}
        {...getAppWindowDefaultProps(app)}
      >
        <Window
          title={app.$.name}
          border={app.$.window && app.$.window.border}
          maximized={app.isWindowMax}
          actived={app.isActivated}
          handleClassName={getAppWindowHandleClassName(app)}
          onClose={app.close}
          onActivate={app.activate}
          onMinimize={app.hiddenWindow}
          onToggle={app.toggleWindowSize}
        >
          <AppRenderer app={app} />
        </Window>
      </Rnd>
    )
  }
}

export const AppWindows = observer(function AppWindows(props: IDesktopAppWindowsProps) {
  return (
    <div className={styles.windows}>
      {applicationStore.windowViewApps.map(app => (
        <AppWindow app={app} key={app.$.id} />
      ))}
    </div>
  );
})
