
import React from 'react'
import classNames from 'classnames'
import { observer } from "mobx-react"
import { Rnd } from 'react-rnd'
import { process } from 'engines/process'
import { Application } from 'engines/application'
import { option, GLOBAL_OPTIONS } from 'engines/option'
import { AppRenderer } from 'bases/renderers'
import { Window } from 'bases/layouts/window'
import styles from './desktop.module.scss'

export interface IDesktopAppWindowsProps {}

export function getAppWindowDragBoxClassName() {
  return `.${styles.dragBox}`
}

export function getAppWindowHandleClassName(app: Application) {
  return app.$.id + '-' + 'handle'
}

export function getAppWindowResizingProps(app: Application) {
  const noBorder = app.$.window && !app.$.window.border
  const isMaxWindow = app.isWindowMax

  if (noBorder || isMaxWindow) {
    return {
      disableDragging: true,
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

export const AppWindow = observer(function AppWindow({ app }: { app: Application }) {

  return (
    <Rnd
      className={classNames(
        styles.item,
        app.isWindowMax && styles.fullscreen,
        !app.isWindowVisible && styles.hidden
      )}
      {...getAppWindowResizingProps(app)}
      minWidth={GLOBAL_OPTIONS.minWindowWidth}
      minHeight={GLOBAL_OPTIONS.minWindowHeight}
      maxWidth="100%"
      maxHeight="100%"
      bounds={getAppWindowDragBoxClassName()}
      dragHandleClassName={getAppWindowHandleClassName(app)}
      // HACK: rnd 的问题
      default={{
        ...app.window.size,
        x: app.window.position.x / (app.isWindowMax ? 2 : 1),
        y: app.window.position.y / (app.isWindowMax ? 2 : 1)
      }}
      onDragStop={(_, { x, y }) => app.repositionWindow({ x, y })}
      onResizeStop={(_, __, ref, ___, position) => {
        const { x, y } = position
        const { width, height } = ref.style
        app.repositionWindow({ x, y })
        width && height && app.resizeWindow({ width, height })
      }}
    >
      {/* <Window
        title={app.$.name}
        border={app.$.window && app.$.window.border}
        maximized={app.isWindowMax}
        actived={app.isActivated}
        handleClassName={getAppWindowHandleClassName(app)}
        onClose={app.close}
        onActivate={app.activate}
        onMinimize={app.hiddenWindow}
        onToggleWindow={app.toggleWindowSize}
      >
        <AppRenderer app={app} />
      </Window> */}
    </Rnd>
  )
})

export const AppWindows = observer(function AppWindows(props: IDesktopAppWindowsProps) {
  return (
    <>
      <div
        className={classNames(
          styles.windows,
          option.general.hideHeader && styles.hideHeader
        )}
      >
        {process.windowViewApps.map(app => (
          <AppWindow app={app} key={app.$.id} />
        ))}
      </div>
      <div className={classNames(styles.windows, styles.dragBox)}>
      </div>
    </>
  )
})
