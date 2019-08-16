

import React from 'react';
import { App, ApplicationStore } from 'stores/application';
import { PluginApp } from './Plugin';
import { IframeApp } from './Iframe';

export interface IAppRendererProps {
  app: App
}

export const AppRenderer: React.FC<IAppRendererProps> = ({ app }) => {
  if (app.isPluginType) {
    return <PluginApp app={app} />
  }
  if (app.isIframeType) {
    return <IframeApp app={app} />
  }
  if (app.isNativeType && app.$.component) {
    return <app.$.component app={app} />
  }
  return (
    <span>应用出错啦，这里面什么都没有</span>
  )
}
