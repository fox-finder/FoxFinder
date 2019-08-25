
import React from 'react';
import styles from './menu.module.scss';
import { MenuList } from './List';

export interface IMenuItemProps {
  label?: React.ReactNode // 菜单名称
  icon?: React.ReactNode // 图标
  selected?: boolean // 选中状态
  disabled?: boolean // 禁用状态
  onClick?: () => any // 点击回调
  childrens?: IMenuItemProps[] // 子菜单
}

export const MenuItem: React.FC<IMenuItemProps> = props => {
  return (
    <li className={styles.menuItem}>
      <span
        className={styles.content}
        onClick={props.onClick}
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
}