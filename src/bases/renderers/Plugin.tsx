
import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component'
import { IAppRendererProps } from './';
import styles from './renderer.module.scss';

export const PluginApp: React.FC<IAppRendererProps> = ({ app }) => {
  return (
    <Frame className={styles.iframe}>
      <FrameContextConsumer>
        {({ document, window }: any) => {
          app.data += '<style>body{margin:0}</style>'
          setTimeout(() => document.write(app.data))
          // return <div dangerouslySetInnerHTML={{ __html: app.data || '' }} />
        }}
      </FrameContextConsumer>
    </Frame>
  );
}
