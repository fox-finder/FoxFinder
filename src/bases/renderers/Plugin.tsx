
import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component'
import { IAppRendererProps } from './';
import styles from './renderer.module.scss';

const injectCSS = `
  body { margin: 0 }
`

export const PluginApp: React.FC<IAppRendererProps> = ({ app }) => {
  return (
    <Frame className={styles.iframe} sandbox="allow-scripts allow-same-origin allow-forms">
      <FrameContextConsumer>
        {({ document, window }: any) => {
          window.close = app.close;
          window.activate = app.activate;
          window.hiddenWindow = app.hiddenWindow;
          window.maximizedWindow = app.maximizedWindow;
          const code = `
            <style>${injectCSS}</style>
            ${app.$.data}
          `
          setTimeout(() => document.write(code))
        }}
      </FrameContextConsumer>
    </Frame>
  );
}
