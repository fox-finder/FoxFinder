
import React from 'react'
import { observer } from 'mobx-react'
import { IMenuItemProps } from './Item'
import { IMenuList } from './List'
import { menuStore, IMenuRegisterOptions } from './store'

export interface IMenuRegisterProps {
  list: IMenuList
  options?: IMenuRegisterOptions
  children: React.ReactElement
}

export const MenuRegister: React.FC<IMenuRegisterProps> = observer(props => {

  if (!props.children) {
    return null
  }

  if (!props.list || !props.list.length) {
    return props.children
  }

  const payloadElement = React.Children.only(props.children)
  return React.cloneElement(
    payloadElement,
    menuStore.register(props.list, props.options)
  )
})
