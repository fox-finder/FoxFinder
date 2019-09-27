
import React from 'react';
import classNames from 'classnames'
import { observable, computed, IObservableValue, IComputedValue } from 'mobx';
import { observer } from 'mobx-react'
import { CSSTransition } from 'react-transition-group'
import { TRANSITION_DURATION_SLOW } from 'constants/animation'
import { option } from 'engines/option'
import { process } from 'engines/process'
import { Background } from 'bases/materials/background'
import { menuStore } from 'bases/layouts/menu';
import { DockFixedAppList, DockRunningAppList } from './dock';
import { Tray } from './Tray';
import { Launcher } from './Launcher';
import styles from './header.module.scss';

export const sortingIndex: IObservableValue<number | null> = observable.box(null)
export const tippingIndex: IObservableValue<number | null> = observable.box(null)
export const calendarOperating: IObservableValue<boolean> = observable.box(false)
export const isSomeDockItemOperating: IComputedValue<boolean> = computed(
  () => (sortingIndex.get() !== null) || (tippingIndex.get() !== null) || calendarOperating.get()
)
export const isDisabledTooltip: IComputedValue<boolean> = computed(
  () => isSomeDockItemOperating.get() || menuStore.visible
)

export const Header: React.FC = observer(() => {
  return (
    <div id="header" className={styles.header}>
      <Background
        blur
        tag="div"
        className={styles.container}
        style={{ height: option.berthHeightValue }}
        onContextMenuCapture={event => event.preventDefault()}
      >
        <Launcher />
        <div className={styles.separator} />
        <DockFixedAppList />
        <div className={styles.separator} />
        <DockRunningAppList />
        <CSSTransition
          in={!!process.runningAppsWithoutBerthApps.length}
          timeout={TRANSITION_DURATION_SLOW}
          classNames={styles.separator}
          unmountOnExit
        >
          <div className={styles.separator} />
        </CSSTransition>
        <Tray />
      </Background>
    </div>
  );
})
