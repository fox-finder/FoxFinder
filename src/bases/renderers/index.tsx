
import React from 'react'
import { observer, Observer } from 'mobx-react'
import { Process } from 'engines/process'
import { Application } from 'engines/application'
import { ExtApp } from './ExtApp'
import { IframeApp } from './Iframe'

export interface IAppRendererProps {
  app: Application
}

export const AppRenderer: React.FC<IAppRendererProps> = observer(({ app }) => {

  if (app.isExtAppType) {
    return <ExtApp app={app} />
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
})
