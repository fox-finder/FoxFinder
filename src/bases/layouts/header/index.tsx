
import React from 'react';
import { observer, Observer } from 'mobx-react'
import { option } from 'engines/option'
import { process } from 'engines/process'
import { Background } from 'bases/materials/background'
import { DockFixedAppList, DockRunningAppList } from './dock';
import { Tray } from './Tray';
import { Launcher } from './Launcher';
import styles from './header.module.scss';

export const Header: React.FC = observer(() => {
  return (
    <div id="header" className={styles.header}>
      <Background
        blur
        tag="div"
        className={styles.container}
        style={{ height: option.berthHeightValue }}
      >
        <Launcher />
        <div className={styles.separator} />
        <DockFixedAppList />
        {!process.runningAppsWithoutBerthApps.length ? null : (
          <div className={styles.separator} />
        )}
        <DockRunningAppList />
        <div className={styles.separator} />
        <Tray />
      </Background>
    </div>
  );
})
