
import React from 'react';
import styles from './header.module.scss';
import { Menu } from './Menu';
import { Tray } from './Tray';

export const Header: React.FC = () => {
  return (
    <div id="header" className={styles.header}>
      <Menu />
      <Tray />
    </div>
  );
}
