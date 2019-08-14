
import React from 'react';
import { Window, TitleBar } from 'react-desktop/macOs';
import { IWindowProps } from '../window';
import styles from './window.module.scss';

export const MacOS: React.FC<IWindowProps> = (props) => {
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
  )
}
