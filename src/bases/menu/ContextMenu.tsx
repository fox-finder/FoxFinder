
import React from 'react';
import { observer } from 'mobx-react';
import styles from './menu.module.scss';
import { MenuList } from './List';
import { IMenuItemProps } from './Item';

export interface IMenuProps {
  x: number
  y: number
  visible?: boolean
  raTop?: boolean
  list?: IMenuItemProps[] | void | null
  children?: React.ReactChildren
}

function normalizeListElement(props: IMenuProps) {
  if (!props.list || !props.list.length) {
    return null
  }

  return (
    <MenuList
      list={props.list}
      className={props.raTop ? styles.rightAngleTop : undefined}
    />
  )
}

export const ContextMenu: React.FC<IMenuProps> = observer(props => {

  console.log('menu render?', props)

  if (!props.visible) {
    return null
  }

  return (
    <div
      id="menu"
      className={styles.menu}
      style={{ top: props.y, left: props.x }}
    >
      {props.children || normalizeListElement(props)}
    </div>
  );
})
