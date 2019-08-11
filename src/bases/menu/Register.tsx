
import React from 'react';
import { observer } from 'mobx-react';
import { IMenuItemProps } from './Item';
import menuStore, { IMenuRegisterOptions } from 'stores/menu';

export interface IMenuRegisterProps {
  children: React.ReactElement
  list: IMenuItemProps[]
  options?: IMenuRegisterOptions
}

export const MenuRegister: React.FC<IMenuRegisterProps> = observer(props => {
  if (!props.children) {
    return null
  }

  const payloadElement = React.Children.only(props.children)
  return React.cloneElement(
    payloadElement,
    menuStore.register(props.list, props.options)
  );
})



