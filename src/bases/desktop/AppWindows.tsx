
import React, { Component } from 'react';
import { applicationStore } from 'stores/application';
import styles from './desktop.module.scss';

export interface IWindowProps {
  title: string
  children: React.ReactElement
}

export interface IDesktopAppWindowsProps {
  windowComponent: React.FunctionComponent<IWindowProps>
}

export const AppWindows: React.FC<IDesktopAppWindowsProps> = (props) => {
  return (
    <div className={styles.windows}>
      {applicationStore.windowViewApps.map((app, index) => (
        // <span>假装是一个窗口把</span>
        <props.windowComponent key={index} title={app.name}>
          <span>app 内容</span>
        </props.windowComponent>
      ))}
    </div>
  );
}
