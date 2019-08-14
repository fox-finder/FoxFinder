
import React from 'react';
import classNames from 'classnames';
import Frame, { FrameContextConsumer } from 'react-frame-component'
import { IApplication } from 'types/application';
import { IAppRendererProps } from './';

export const PluginApp: React.FC<IAppRendererProps> = (props) => {

  return (
    <span>挂件啊固件 {props.app.name}</span>
  );
}
