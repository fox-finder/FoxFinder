
import React from 'react';
import classNames from 'classnames';
import { MenuRegister } from 'bases/menu/Register';
import { IApplication } from 'types/application';

interface IWidgetAppProps {
  app: IApplication
}

export const WidgetApp: React.FC<IWidgetAppProps> = (props) => {

  return (
    <span>挂件啊固件 {props.app.name}</span>
  );
}
