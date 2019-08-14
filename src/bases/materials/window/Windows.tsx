
import React from 'react';
import { Window, TitleBar } from 'react-desktop/windows';
import styles from './window.module.scss';
import { IWindowProps } from '../window';

export const Windows: React.FC<IWindowProps> = (props) => {
  return (
  <Window
    chrome
    width={700}
    height={400}
    padding={0}
  >
    <TitleBar title={props.title} className={props.handleClassName} controls />
    <div className={styles.content}>{props.children}</div>
  </Window>
  );
}
