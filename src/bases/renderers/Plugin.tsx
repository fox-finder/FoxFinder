
import React from 'react';
import classNames from 'classnames';
import Frame, { FrameContextConsumer } from 'react-frame-component'
import { IApplication } from 'types/application';

interface IWidgetAppProps {
  app: IApplication
}

export const PluginApp: React.FC<IWidgetAppProps> = (props) => {

  return (
    <span>挂件啊固件 {props.app.name}</span>
  );
}
