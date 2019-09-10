
import React from 'react';
import { observer } from 'mobx-react'
import { MenuList } from './List';
import { menuStore } from './store';
import styles from './menu.module.scss';

export interface IMenuItemProps {
  label?: React.ReactNode // 菜单名称
  icon?: React.ReactNode // 图标
  data?: any // 数据
  selected?: boolean // 选中状态
  disabled?: boolean // 禁用状态
  onClick?(event: React.MouseEvent<Element, MouseEvent>, data: any): void // 点击回调
  childrens?: IMenuItemProps[] // 子菜单
}

export const MenuItem: React.FC<IMenuItemProps> = observer(props => {

  const handleClick: React.MouseEventHandler = event => {
    event.preventDefault()
    props.onClick && props.onClick(event, props.data)
    menuStore.reset()
  }

  return (
    <li className={styles.menuItem}>
      <span
        className={styles.content}
        onClickCapture={handleClick}
        onContextMenuCapture={handleClick}
      >
        <span className={styles.menuActive}>
          {props.selected && '✅'}
        </span>
        <span className={styles.menuIcon}>{props.icon}</span>
        <span className={styles.menuName}>{props.label}</span>
      </span>
      {props.childrens && props.childrens.length && (
        <MenuList className={styles.children} list={props.childrens} />
      )}
    </li>
  );
})