
import React from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import { applicationStore } from 'stores/application';
import { IApplication } from 'types/application';
import styles from './desktop.module.scss';

export function getAppWindowHandleClassName(appName: string) {
  return appName + '-' + 'handle'
}

export interface IDesktopAppWindowsProps {
  appRender(app: IApplication): React.ReactElement
}

export const AppWindows: React.FC<IDesktopAppWindowsProps> = (props) => {
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
          {props.appRender(app)}
        </Draggable>
      ))}
    </div>
  );
}
