import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { observable, computed, IObservableValue, IComputedValue } from 'mobx';
import { observer } from 'mobx-react';
import { process } from 'engines/process'
import { Application } from 'engines/application'
import { SortableContainer, SortableElement, SortStart } from 'react-sortable-hoc'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { TRANSITION_NAME_FADE_SLOW, TRANSITION_DURATION_SLOW } from 'constants/animation'
import { Tooltip, Title, isHitMousedownEventFromTooltipContainer } from 'bases/layouts/tooltip'
import { MenuList } from 'bases/layouts/menu'
import { Icon } from 'bases/materials/icon'
import { getAppContextMenuList } from './menu'
import { sortingIndex, tippingIndex, isDisabledTooltip } from '../'
import styles from './dock.module.scss'
import headerStyles from '../header.module.scss'

interface DockItemProps {
  app: Application
  index: number
  tipIndex: number
}

const sortableContainerRef = React.createRef<TransitionGroup>()

export const DockItem: React.FC<DockItemProps> = observer(({ app, index, tipIndex }) => {
  return (
    <Tooltip
      tag="li"
      onClickCapture={app.run}
      className={classNames(
        styles.item,
        headerStyles.action,
        app.isRunning && styles.running,
        app.isErring && styles.erring
      )}
      hover={{
        content: <Title>{app.$.name}</Title>,
        interactive: false
      }}
      context={{
        content: <MenuList list={getAppContextMenuList(app)} />,
        interactive: true,
        hideOnClick: true,
        onOpen: () => tippingIndex.set(tipIndex),
        onClose: () => tippingIndex.set(null),
      }}
      disabled={
        isDisabledTooltip.get() &&
        sortingIndex.get() !== index &&
        tippingIndex.get() !== tipIndex
      }
    >
      <Icon
        src={app.$.icon}
        className={classNames(headerStyles.svgIcon, styles.icon)}
      />
      <span className={styles.indicator} />
    </Tooltip>
  )
})

const SortableItem = SortableElement(observer((props: DockItemProps) => {
  return <DockItem {...props} />
}))

const SortableList = SortableContainer(observer(({ apps }: { apps: Application[] }) => {
  return (
    <TransitionGroup component="ul" className={styles.dockList} ref={sortableContainerRef}>
      {apps.map(
        (app: Application, index: number) => (
          <CSSTransition
            key={app.uuid}
            timeout={TRANSITION_DURATION_SLOW}
            classNames={TRANSITION_NAME_FADE_SLOW}
          >
            <SortableItem
              index={index}
              key={app.uuid}
              app={app}
              tipIndex={index}
            />
          </CSSTransition>
        )
      )}
    </TransitionGroup>
  )
}))

export const DockFixedAppList: React.FC = observer(() => {

  function onSortStart({ index }: SortStart) {
    console.log('data', index)
    sortingIndex.set(index);
  }

  function onSortEnd({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) {
    sortingIndex.set(null);
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
      onSortEnd={onSortEnd}
      onSortStart={onSortStart}
      helperContainer={() => {
        return ReactDOM.findDOMNode(sortableContainerRef.current) as HTMLUListElement
      }}
      shouldCancelStart={(event: any) => {
        return event.composedPath && isHitMousedownEventFromTooltipContainer(event)
      }}
    />
  )
})

export const DockRunningAppList: React.FC = observer(() => {
  return (
    <TransitionGroup component="ul" className={styles.dockList}>
      {process.runningAppsWithoutBerthApps.slice().map(
        (app: Application, index: number) => (
          <CSSTransition
            key={app.uuid}
            timeout={TRANSITION_DURATION_SLOW}
            classNames={TRANSITION_NAME_FADE_SLOW}
          >
            <DockItem
              app={app}
              key={app.uuid}
              index={index}
              tipIndex={process.pinBerthApps.length + index}
            />
          </CSSTransition>
        )
      )}
    </TransitionGroup>
  )
})
