
import React from 'react';
import styles from './header.module.scss';
import { OSMenu } from './OSMenu';
import { Tray } from './Tray';

export const Header: React.FC = () => {
  return (
    <header id="header" className={styles.header}>
      <div className={styles.background}></div>
      <OSMenu />
      <Tray />
    </header>
  );
}
