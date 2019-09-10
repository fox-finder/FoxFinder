import React, {Component} from 'react'
import classNames from 'classnames'
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { option } from 'engines/option'
import { process } from 'engines/process'
import { Application } from 'engines/application';
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import { Background } from 'bases/materials/background'
import { DockItem, DockSeparator } from './Item'
import styles from './dock.module.scss'

type TAppIndex = number | null

class DockStore {

  // TODO: 右键上下文菜单的绑定及 blur 事件的设计
  @observable hoverIndex: TAppIndex = null
  @observable contextMenuIndex: TAppIndex = null

  @observable.ref containerRef = React.createRef<HTMLElement>()
  @observable.shallow appsRefList = this.apps.map(() => React.createRef<HTMLLIElement>())

  get apps(): Application[] {
    return process.berthViewApps.slice()
  }

  @action setHoverIndex(index: TAppIndex) {
    this.hoverIndex = index
  }

  @action setContextMenuIndex(index: TAppIndex) {
    this.contextMenuIndex = index
  }

  getHoverClassName(index: number) {
    if (this.hoverIndex != null) {
      const classNameMap = {
        [this.hoverIndex]: styles.hover,
        [this.hoverIndex - 1]: styles.neighbour,
        // [this.hoverIndex - 2]: styles.hoverSeparatedPrev,
        [this.hoverIndex + 1]: styles.neighbour,
        // [this.hoverIndex + 2]: styles.hoverSeparatedNext,
      }
      return classNameMap[index]
    }
  }
}

const dockStore = new DockStore()

const SortableItem = SortableElement(observer(({ app, index }: { app: Application, index: number }) => {
  return (
    <DockItem
      ref={dockStore.appsRefList[index]}
      name={app.$.name}
      icon={app.$.icon}
      running={app.isRunning}
      erring={app.isErring}
      isHoverHost={dockStore.hoverIndex === index}
      isHoverNeighbour={dockStore.hoverIndex === index + 1 || dockStore.hoverIndex === index - 1}
      isHoverDistant={dockStore.hoverIndex === index + 2 || dockStore.hoverIndex === index - 2}
      className={dockStore.getHoverClassName(index)}
      onClick={app.run}
      onContextmenu={() => console.log('点击了 app 的右键菜单', app)}
      onHover={() => dockStore.setHoverIndex(index)}
      onCancelHover={() => dockStore.setHoverIndex(null)}
    />
  )
}))

function handleTest(event: any) {
  const ts = dockStore.appsRefList[dockStore.hoverIndex as number]
  console.log('鼠标指针',
    event.clientX,
    dockStore.hoverIndex,
    ts && ts.current,
  )
}

const SortableList = SortableContainer(observer(({ apps }: { apps: Application[] }) => {
  return (
    <Background
      tag="ul"
      blur={true}
      ref={dockStore.containerRef}
      className={styles.container}
      onMouseMove={handleTest}
      // onMouseLeave={() => dockStore.setHoverIndex(null)}
    >
      {apps.map((app: Application, index: number) => {
        const nextApp = apps[index + 1]
        const renderSeparator = app.$.pinBerth && nextApp && !nextApp.$.pinBerth
        return (
          <React.Fragment key={app.$.id}>
            <SortableItem index={index} app={app} />
            {renderSeparator && (
              <DockSeparator />
            )}
          </React.Fragment>
        )
      })}
    </Background>
  )
}))

export const Dock: React.FC = observer(() => {

  // 当没有应用时，隐藏 dock
  if (!process.berthViewApps.length) {
    return null
  }

  function onSortEnd({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) {
    console.log('水水水水和变化', oldIndex, newIndex)
  }

  return (
    <div id="dock" className={classNames(styles.dock, option.isSmallSizeBerth && styles.small)}>
      <SortableList
        axis="x"
        lockAxis="x"
        distance={10}
        // pressDelay={200}
        lockToContainerEdges={true}
        helperClass={styles.dragging}
        helperContainer={() => dockStore.containerRef.current as HTMLUListElement}
        apps={dockStore.apps}
        onSortEnd={onSortEnd}
        // onSortMove={}
        // onSortOver={}
        // onSortStart={}
        // lockOffset={["0%", "100%"]}
      />
    </div>
  )
})
