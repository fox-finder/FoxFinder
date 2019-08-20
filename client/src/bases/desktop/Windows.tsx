
import React from 'react'
import classNames from 'classnames'
import { observer, Observer } from 'mobx-react'
import { Rnd } from 'react-rnd'
import { Spring, Transition } from 'react-spring/renderprops'
import { applicationStore, App } from 'stores/application'
import { optionStore, GLOBAL_OPTIONS } from 'stores/option'
import { AppRenderer } from 'bases/renderers'
import { Window } from 'bases/materials/window'
import styles from './desktop.module.scss'

export interface IDesktopAppWindowsProps {}

export function getAppWindowDragBoxClassName() {
  return `.${styles.dragBox}`
}

export function getAppWindowHandleClassName(app: App) {
  return app.$.id + '-' + 'handle'
}

export function getAppWindowResizingProps(app: App) {
  // INFO: 禁用缩放/全屏/锁定窗口
  const isDisabledResize = !app.$.window || !app.$.window.resize
  const disableResizing = isDisabledResize || app.isWindowMax || app.isLockng
  const disableDragging = app.isWindowMax || app.isLockng

  return {
    disableDragging: disableDragging,
    enableResizing: {
      bottom: !disableResizing,
      bottomLeft: !disableResizing,
      bottomRight: !disableResizing,
      left: !disableResizing,
      right: !disableResizing,
      top: !disableResizing,
      topLeft: !disableResizing,
      topRight: !disableResizing
    }
  }
}

function getAppWindowData(app: App) {
  return {
    ...app.window.size,
    ...app.window.position
  }
}

function getAppWindowFullscreenData() {
  // 这里是需要分辨单位的 px 还是 百分号
  return {
    width: '100%',
    height: '100%',
    x: 0,
    y: 0
  }
}

function getAppWindowSpringFrom(app: App) {
  return app.isWindowMax
    ? getAppWindowFullscreenData()
    : getAppWindowData(app)
}

function getAppWindowSpringTo(app: App) {
  return app.isWindowMax
    ? getAppWindowFullscreenData()
    : getAppWindowData(app)
}

export const AppWindow = observer(({ app, hidden }: { app: App, hidden: boolean }) => {
  return (
    <Spring
      // 仅处理全屏动画
      from={getAppWindowSpringFrom(app)}
      to={getAppWindowSpringTo(app)}
      immediate={app.window.$_keepRigid}
      config={{ tension: 888, friction: 66 }}
    >
      {springProps => (
        <Observer render={() => (
          <Rnd
            className={classNames(
              styles.item,
              app.isWindowMax && styles.fullscreen,
              (!app.isWindowVisible || hidden) && styles.hidden
            )}
            style={{ zIndex: app.window.zIndex }}
            minWidth={GLOBAL_OPTIONS.minWindowWidth}
            minHeight={GLOBAL_OPTIONS.minWindowHeight}
            maxWidth="100%"
            maxHeight="100%"
            bounds={getAppWindowDragBoxClassName()}
            dragHandleClassName={getAppWindowHandleClassName(app)}
            // TODO: 这里取决于已经开了几个应用，比如开了两个应用，则加偏移
            size={{
              width: springProps.width,
              height: springProps.height
            }}
            position={{
              x: springProps.x,
              y: springProps.y
            }}
            onDragStop={(_, position) => {
              app.updateKeepRigid(true)
              app.repositionWindow(position)
            }}
            onResizeStop={(_, __, ref, ___, position) => {
              const { x, y } = position
              const { width, height } = ref.style
              app.updateKeepRigid(true)
              x && y && app.repositionWindow(position)
              width && height && app.resizeWindow({ width, height })
            }}
            {...getAppWindowResizingProps(app)}
          >
            <Window
              title={app.$.name}
              handleClassName={getAppWindowHandleClassName(app)}
              border={app.$.window && app.$.window.border}
              maximized={app.isWindowMax}
              actived={app.isActivated}
              locking={app.isLockng}
              onClose={app.close}
              onActivate={app.activate}
              onMinimize={app.hiddenWindow}
              onToggleWindow={app.toggleWindowSize}
              onLock={app.lock}
              onUnlock={app.unlock}
            >
              <AppRenderer app={app} />
            </Window>
          </Rnd>
        )} />
      )}
    </Spring>
  )
})

export const AppWindows = observer((props: IDesktopAppWindowsProps) => {
  return (
    <>
      <div
        className={classNames(
          styles.windows,
          optionStore.general.hideHeader && styles.hideHeader
        )}
      >
        <Transition
          keys={app => app.$.id}
          items={applicationStore.windowViewApps.slice()}
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
