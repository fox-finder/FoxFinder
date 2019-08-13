
import React from 'react';
import classNames from 'classnames';
import { observer } from "mobx-react"
import Draggable, { DraggableCore } from 'react-draggable';
import { IApplication, ApplicationType } from 'types/application';
import { applicationStore, ApplicationStore } from 'stores/application';
import { optionStore } from 'stores/option';
import { PluginApp } from 'bases/renderers/Plugin'
import { IframeApp } from 'bases/renderers/Iframe'
import { Window } from 'bases/components/window';
import styles from './desktop.module.scss';

export interface IDesktopAppWindowsProps {}

export function getAppWindowHandleClassName(appName: string) {
  return appName + '-' + 'handle'
}

function renderApp(app: IApplication) {
  if (ApplicationStore.isPluginType(app)) {
    return <PluginApp app={app} />
  }
  if (ApplicationStore.isIframeType(app)) {
    return <IframeApp app={app} />
  }
  if (ApplicationStore.isNativeType(app)) {
    return app.component
  }
  return (<span>应用出错啦</span>)
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
              {renderApp(app) as any}
            </Window>
          </div>
        </Draggable>
      ))}
    </div>
  );
})
