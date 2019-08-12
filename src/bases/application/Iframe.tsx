
import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component'
import { IApplication } from 'types/application';

interface IIframeAppProps {
  app: IApplication
}

export const IframeApp: React.FC<IIframeAppProps> = (props) => {

  return (
    <iframe src={props.app.data} width="100%" height="100%" sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation" />
  );
}
