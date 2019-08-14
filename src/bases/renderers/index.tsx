

import React from 'react';
import { IRuntimeApplication } from 'types/application';
import { ApplicationStore } from 'stores/application';
import { PluginApp } from './Plugin';
import { IframeApp } from './Iframe';

export interface IAppRendererProps {
  app: IRuntimeApplication
}

export const AppRenderer: React.FC<IAppRendererProps> = ({ app }) => {
  if (ApplicationStore.isPluginType(app)) {
    return <PluginApp app={app} />
  }
  if (ApplicationStore.isIframeType(app)) {
    return <IframeApp app={app} />
  }
  if (ApplicationStore.isNativeType(app) && app.component) {
    return <app.component app={app} />
  }
  return (
    <span>应用出错啦，这里面什么都没有</span>
  )
}
