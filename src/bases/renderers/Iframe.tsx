
import React from 'react';
import { IApplication } from 'types/application';
import { IAppRendererProps } from './';

export const IframeApp: React.FC<IAppRendererProps> = (props) => {
  return (
    <iframe
      src={props.app.data}
      width="100%"
      height="100%"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
}
