
import React from 'react'
import classNames from 'classnames'
import { observer, Observer } from 'mobx-react'
import { option } from 'engines/option'
import { process } from 'engines/process'
import { Application } from 'engines/application';
import { Background } from 'bases/materials/background'
import { DockItem, DockSeparator } from './Itme'
import styles from './dock.module.scss'

type TAppIndex = number | null | void

export const Dock: React.FC = observer(() => {

  const apps = process.berthViewApps
  const [hoverIndex, setHoverIndex] = React.useState<TAppIndex>()
  // TODO: 右键上下文菜单的绑定及 blur 事件的设计
  const [contextMenuIndex, setContextMenuIndex] = React.useState<TAppIndex>()

  // 当没有应用时，隐藏 dock
  if (!apps.length) {
    return null
  }

  function getHoverClassName(index: number) {
    if (hoverIndex != null) {
      const classNameMap = {
        [hoverIndex]: styles.hover,
        [hoverIndex - 1]: styles.hoverPrev,
        [hoverIndex - 2]: styles.hoverSeparatedPrev,
        [hoverIndex + 1]: styles.hoverNext,
        [hoverIndex + 2]: styles.hoverSeparatedNext,
      }
      return classNameMap[index]
    }
  }

    // 如果是桌面的
  function onPush(appId: string, afterAppId: string) {
    // 本地有 -> 什么也不做
    // 本地没有 -> 添加到对应位置
    if (!apps.find(app => app.$.id === appId)) {
      console.log('把 app', appId, '固定到dock，且在 app', afterAppId, '前面')
    }
  }

  function onMoveHover(appId: string, afterAppId: string) {
    // 如果是自己的 -> 调换位置
    console.log('dock 变动，调换位置', appId, afterAppId)
  }

  return (
    <div id="dock" className={classNames(styles.dock, option.isSmallSizeBerth && styles.small)}>
      <Background
        tag="ul"
        blur={true}
        className={styles.container}
      >
        {apps.map((app, index, apps) => {
          // 在固定应用与非固定但运行应用之间加间隔标示
          const nextApp = apps[index + 1]
          const renderSeparator = app.$.pinBerth && nextApp && !nextApp.$.pinBerth
          return (
            <React.Fragment key={app.$.id}>
              <DockItem
                id={app.$.id}
                name={app.$.name}
                icon={app.$.icon}
                active={app.isRunning}
                error={app.isErring}
                // className={getHoverClassName(index)}
                onClick={app.run}
                onContextmenu={() => console.log('点击了 app 的右键菜单', app)}
                onHover={() => setHoverIndex(index)}
                onCancelHover={() => setHoverIndex(null)}
                onMoveHover={onMoveHover}
                onPush={onPush}
              />
              {renderSeparator && (
                <DockSeparator />
              )}
            </React.Fragment>
          )
        })}
      </Background>
    </div>
  )
})
