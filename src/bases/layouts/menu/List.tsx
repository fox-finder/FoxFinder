
import React from 'react';
import classnames from 'classnames';
import styles from './menu.module.scss';
import { MenuItem, IMenuItemProps } from './Item';

export interface IMenuListProps {
  className?: string
  list?: IMenuItemProps[]
  children?: React.ReactChildren
}

function normalizeItemsElement(list: IMenuItemProps[] | void) {
  if (!list || !list.length) {
    return null
  }

  return list.map((menu, index) => (
    <MenuItem key={index} {...menu} />
  ))
}

export const MenuList: React.FC<IMenuListProps> = props => {
  const itemsElement = props.children || normalizeItemsElement(props.list);

  return (
    <ul className={classnames(styles.menuList, props.className)}>
      {itemsElement}
    </ul>
  );
}
