
import React from 'react'
import classNames from 'classnames'
import { action, computed, observable } from 'mobx'
import { observer, Observer } from 'mobx-react'
import { option } from 'engines/option'
import { process } from 'engines/process'
import { Application } from 'engines/application'
import { Background } from 'bases/materials/background'
import { DockItem, DockSeparator } from './Itme'
import styles from './dock.module.scss'
import { TrashPackage } from 'natives/trash'
import { render } from 'react-dom';

type TAppIndex = number | null | void

@observer
export class Dock extends React.Component {

  @observable isDragging = false
  @observable hoverIndex!: TAppIndex
  @observable.ref targetAppId!: string | null
  @observable.ref sourceAppId!: string | null

  @computed get viewApps(): Application[] {
    const apps = process.berthViewApps
    if (this.targetAppId && this.sourceAppId) {

      const source = apps.find(app => app.$.id === this.sourceAppId)

      // 目标
      const target = apps.find(app => app.$.id === this.targetAppId)

      // if (apps[]) {}
      // return [...apps].splice(this.sourceIndex, 1)
    }
    
    return apps
  }

  // // TODO: 右键上下文菜单的绑定及 blur 事件的设计
  getHoverClassName(index: number) {
    if (this.hoverIndex != null) {
      const classNameMap = {
        [this.hoverIndex]: styles.hover,
        [this.hoverIndex - 1]: styles.hoverPrev,
        [this.hoverIndex - 2]: styles.hoverSeparatedPrev,
        [this.hoverIndex + 1]: styles.hoverNext,
        [this.hoverIndex + 2]: styles.hoverSeparatedNext,
      }
      return classNameMap[index]
    }
  }

    // 如果是桌面的
  onPush(appId: string, afterAppId: string) {
    // 本地有 -> 什么也不做
    // 本地没有 -> 添加到对应位置
    // if (!apps.find(app => app.$.id === appId)) {
    //   console.log('把 app', appId, '固定到dock，且在 app', afterAppId, '前面')
    // }
  }

  @action.bound onMoveHover(appId: string, appIndex: number, toAppId: string, toAppIndex: number) {

    // action(() => {
      this.sourceAppId = appId
      this.targetAppId = toAppId
    // })()

    // // 拖动的
    // const apps = process.berthViewApps
    // const source = apps.find(app => app.$.id === appId)
    // const sourceIndex = apps.findIndex(app => app.$.id === appId)
    // const sourceOrder = source && source.$.berthOrder

    // // 目标
    // const target = apps.find(app => app.$.id === toAppId)
    // const targetIndex = apps.findIndex(app => app.$.id === toAppId)
    // const targetOrder = target && target.$.berthOrder

    // // setMoveTargetIndex(targetIndex)
    // action(() => {
    //   source && (source.$.berthOrder = targetOrder as number)
    //   target && (target.$.berthOrder = sourceOrder as number)
    //   // console.log('没有复制吗', source && source.$)
    // })()

    console.log('dock 变动，调换位置', appIndex, '->', toAppIndex)
  }

  render() {

    // 当没有应用时，隐藏 dock
    if (!this.viewApps.length) {
      return null
    }

    return (
      <div id="dock" className={classNames(styles.dock, option.isSmallSizeBerth && styles.small)}>
        <Background
          tag="ul"
          blur={true}
          className={styles.container}
        >
          {this.viewApps.map((app, index, apps) => {
            // 在固定应用与非固定但运行应用之间加间隔标示
            const nextApp = apps[index + 1]
            const renderSeparator = app.$.pinBerth && nextApp && !nextApp.$.pinBerth
            // const isMoveing = index === moveTargetIndex
            return (
              <React.Fragment key={app.$.id}>
                <DockItem
                  id={app.$.id}
                  index={index}
                  name={app.$.name}
                  icon={app.$.icon}
                  active={app.isRunning}
                  error={app.isErring}
                  // className={getHoverClassName(index)}
                  onClick={app.run}
                  // onContextmenu={() => console.log('点击了 app 的右键菜单', app)}
                  // onHover={() => setHoverIndex(index)}
                  // onCancelHover={() => setHoverIndex(null)}
                  onMoveHover={this.onMoveHover}
                  onPush={this.onPush}
                  // style={{ order: app.$.berthOrder }}
                />
                {/* {renderSeparator && (
                  <DockSeparator />
                )} */}
              </React.Fragment>
            )
          })}
        </Background>
      </div>
    )
  }
}
