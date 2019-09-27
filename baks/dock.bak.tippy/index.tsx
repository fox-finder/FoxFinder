import React from 'react'
import classNames from 'classnames'
import { observable, IObservableValue } from 'mobx';
import { observer } from 'mobx-react';
import { process } from 'engines/process'
import { Application } from 'engines/application';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { Tipbox } from 'bases/layouts/tipbox'
import { Tooltip } from 'bases/layouts/tooltip'
import { MenuList } from 'bases/layouts/menu'
import { getAppContextMenuList } from './menu'
import styles from './dock.module.scss'
import headerStyles from '../header.module.scss'

interface DockItemProps {
  app: Application
  id: string
}

const sortableContainerRef = React.createRef<HTMLUListElement>()
export const isSorting: IObservableValue<boolean> = observable.box(false)

export const DockItem: React.FC<DockItemProps> = observer(({ app, id }) => {
  return (
    <Tipbox
      id={id}
      title={app.$.name}
      disabled={isSorting.get()}
      contentInteractive={true}
      content={(
        <div className={styles.dockAppMenu}>
          <MenuList list={getAppContextMenuList(app)} />
        </div>
      )}
    >
      <li
        onClickCapture={app.run}
        className={classNames(
          styles.item,
          headerStyles.action,
          app.isRunning && styles.running,
          app.isErring && styles.erring
        )}
      >
        <img
          draggable={false}
          src={app.$.icon}
          className={classNames(headerStyles.svgIcon, styles.icon)}
        />
        <span className={styles.indicator} />
        <Tooltip className={styles.tooltip}>{app.$.name}</Tooltip>
      </li>
    </Tipbox>
  )
})

const SortableItem = SortableElement(observer((props: DockItemProps) => {
  return <DockItem {...props} />
}))

const SortableList = SortableContainer(observer(({ apps }: { apps: Application[] }) => {
  return (
    <ul className={styles.dockList} ref={sortableContainerRef}>
      {apps.map((app: Application, index: number) => (
        <SortableItem
          index={index}
          key={index}
          app={app}
          id={`dock-pin-app-${index}`}
        />
      ))}
    </ul>
  )
}))

export const DockFixedAppList: React.FC = observer(() => {

  function onSortStart() {
    isSorting.set(true);
  }

  function onSortEnd({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) {
    isSorting.set(false);
    console.log('拖动结束', oldIndex, newIndex)
  }

  return (
    <SortableList
      axis="x"
      lockAxis="x"
      lockToContainerEdges={true}
      distance={10}
      helperClass={styles.dragging}
      apps={process.pinBerthApps.slice()}
      lockOffset={["0%", "0%"]}
      helperContainer={() => sortableContainerRef.current as HTMLUListElement}
      onSortEnd={onSortEnd}
      onSortStart={onSortStart}
    />
  )
})

export const DockRunningAppList: React.FC = observer(() => {
  return (
    <ul className={styles.dockList}>
      {process.runningAppsWithoutBerthApps.slice().map(
        (app: Application, index: number) => (
          <DockItem
            app={app}
            key={index}
            id={`dock-running-app-${index}`}
          />
        )
      )}
    </ul>
  )
})
