
import React, { Component } from 'react';
import { applicationStore } from 'stores/application';
import Draggable, { DraggableCore } from 'react-draggable';
import { Window as BaseWindow, TitleBar, Text, SegmentedControl, SegmentedControlItem } from 'react-desktop/macOs';
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
        <Draggable
          key={index}
          handle=".handle"
          defaultPosition={{
            x: 300,
            y: 200
          }}
        >
          <BaseWindow
            chrome
            width={700}
            height={400}
            padding={0}
          >
            <TitleBar title={app.name} className="handle" controls />
            {/* <props.windowComponent key={index} title={app.name}>
              <span>app 内容</span>
            </props.windowComponent> */}
            <span>app 内容</span>
          </BaseWindow>
        </Draggable>
      ))}
    </div>
  );
}
