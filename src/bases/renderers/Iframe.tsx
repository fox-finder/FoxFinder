
import React from 'react';
import { IAppRendererProps } from './';
import styles from './renderer.module.scss';

export const IframeApp: React.FC<IAppRendererProps> = ({ app }) => {
  return (
    <iframe
      src={app.$.data}
      className={styles.iframe}
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
}
