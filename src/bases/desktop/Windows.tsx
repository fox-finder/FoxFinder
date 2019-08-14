
import React from 'react';
import classNames from 'classnames';
import { observer } from "mobx-react"
import Draggable, { DraggableCore } from 'react-draggable';
import { applicationStore, ApplicationStore } from 'stores/application';
import { optionStore } from 'stores/option';
import { AppRenderer } from 'bases/renderers'
import { Window } from 'bases/materials/window';
import styles from './desktop.module.scss';

export interface IDesktopAppWindowsProps {}

export function getAppWindowHandleClassName(appName: string) {
  return appName + '-' + 'handle'
}

export const AppWindows = observer(function AppWindows(props: IDesktopAppWindowsProps) {
  return (
    <div className={styles.windows}>
      {applicationStore.windowViewApps.map((app, index) => (
        <Draggable
          key={index}
          defaultClassName={styles.item}
          handle={`.${getAppWindowHandleClassName(app.name)}`}
          defaultPosition={{
            x: 30,
            y: 30
          }}
        >
          <div className={styles.item}>
            <Window
              title={app.name}
              handleClassName={getAppWindowHandleClassName(app.name)}
            >
              <AppRenderer app={app} />
            </Window>
          </div>
        </Draggable>
      ))}
    </div>
  );
})
