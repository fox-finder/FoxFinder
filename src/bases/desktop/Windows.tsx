
import React from 'react';
import classNames from 'classnames';
import { observer } from "mobx-react"
import { Rnd } from 'react-rnd';
import { IRuntimeApplication, ApplicationWindowStatus } from 'types/application';
import { applicationStore, ApplicationStore } from 'stores/application';
import { optionStore } from 'stores/option';
import { AppRenderer } from 'bases/renderers'
import { Window } from 'bases/materials/window';
import styles from './desktop.module.scss';

export interface IDesktopAppWindowsProps {}

export function getAppWindowHandleClassName(app: IRuntimeApplication) {
  return app.id + '-' + 'handle'
}

export function getAppWindowResizingProps(app: IRuntimeApplication) {
  const noBorder = app.window && !app.window.border
  const isMaxWindow = ApplicationStore.isWindowMax(app)

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

export function getAppWindowDefaultProps(app: IRuntimeApplication) {
  const size = app.window && app.window.defaultSize || {
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

export const AppWindows = observer(function AppWindows(props: IDesktopAppWindowsProps) {
  return (
    <div className={styles.windows}>
      {applicationStore.windowViewApps.map(app => (
        <Rnd
          key={app.id}
          dragHandleClassName={getAppWindowHandleClassName(app)}
          className={classNames(styles.item, ApplicationStore.isWindowMax(app) && styles.fullscreen)}
          minWidth={180}
          minHeight={130}
          maxWidth="100%"
          bounds="parent"
          {...getAppWindowResizingProps(app)}
          {...getAppWindowDefaultProps(app)}
        >
          <Window
            title={app.name}
            border={app.window && app.window.border}
            maximized={ApplicationStore.isWindowMax(app)}
            handleClassName={getAppWindowHandleClassName(app)}
            onClose={() => applicationStore.closeApp(app)}
            onMinimize={() => applicationStore.redrawAppWindow(app, ApplicationWindowStatus.Minimize)}
            onRecover={() => {
              applicationStore.redrawAppWindow(
                app,
                ApplicationStore.isWindowMax(app)
                  ? ApplicationWindowStatus.Normal
                  : ApplicationWindowStatus.Maximize
              )
            }}
          >
            <AppRenderer app={app} />
          </Window>
        </Rnd>
      ))}
    </div>
  );
})
