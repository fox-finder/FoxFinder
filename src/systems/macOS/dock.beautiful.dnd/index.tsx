
import React from 'react'
import classNames from 'classnames'
import { observer, Observer } from 'mobx-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { option } from 'engines/option'
import { process } from 'engines/process'
import { Application } from 'engines/application';
import { Background } from 'bases/materials/background'
import { DockItem, DockSeparator } from './Itme'
import styles from './dock.module.scss'

type TAppIndex = number | null | void

export const Dock: React.FC = observer(() => {

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'auto' : 'lightgrey'
  })

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

  return (
    <div id="dock" className={classNames(styles.dock, option.isSmallSizeBerth && styles.small)}>
      <Droppable droppableId="dock" direction="horizontal">
        {(provided, snapshot) => (
          <Background
            tag="ul"
            blur={true}
            ref={provided.innerRef}
            className={styles.container}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {apps.map((app, index, apps) => {
              // 在固定应用与非固定但运行应用之间加间隔标示
              const nextApp = apps[index + 1]
              const renderSeparator = app.$.pinBerth && nextApp && !nextApp.$.pinBerth
              return (
                <React.Fragment key={app.$.id}>
                  <DockItem
                    index={index}
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
                  />
                  {/* {renderSeparator && (<DockSeparator />)} */}
                </React.Fragment>
              )
            })}
            {provided.placeholder}
            <Droppable droppableId="trash" direction="horizontal">
              {(provided, snapshot) => (
                <li
                  ref={provided.innerRef}
                  className={styles.item}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <span className={styles.name}>垃圾桶</span>
                  <img className={styles.icon} src="/images/icons/empty-trash.svg" />
                  <span className={styles.indicator} />
                </li>
              )}
            </Droppable>
          </Background>
        )}
      </Droppable>
    </div>
  )
})
