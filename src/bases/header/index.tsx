
import React from 'react';
import { Background } from 'bases/materials/background'

import { Menu } from './Menu';
import { Tray } from './Tray';
import styles from './header.module.scss';

export const Header: React.FC = () => {
  return (
    <Background
      blur
      id="header"
      className={styles.header}
    >
      <Menu />
      <Tray />
    </Background>
  );
}
