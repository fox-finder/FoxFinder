
import React from 'react';
import { Window, TitleBar } from 'react-desktop/windows';
import { IWindowProps } from '../window';
import styles from './window.module.scss';

export const Windows: React.FC<IWindowProps> = (props) => {
  return (
    <Window
      chrome
      padding={0}
      width="100%"
      height="100%"
      className={styles.window}
    >
      <TitleBar title={props.title} className={props.handleClassName} controls />
      <div className={styles.content}>{props.children}</div>
    </Window>
  );
}
