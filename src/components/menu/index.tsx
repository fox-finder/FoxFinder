
import React from 'react';
import classnames from 'classnames';
import styles from './menu.module.scss';

export interface IMenuProps extends IMenuListProps {
  x: number
  y: number
  raTop?: boolean
}

export interface IMenuListProps {
  className?: string
  list: IMenuItemProps[]
}

export interface IMenuItemProps {
  name?: React.ReactNode
  icon?: React.ReactNode
  active?: boolean
  onClick?: () => any
  childrens?: IMenuItemProps[]
}

export const Menu: React.FC<IMenuProps> = props => {
  return (
    <div
      id="menu"
      className={styles.menu}
      style={{ top: props.y, left: props.x }}
    >
      <MenuList
        list={props.list}
        className={props.raTop ? styles.rightAngleTop : undefined}
      />
    </div>
  );
}

export const MenuList: React.FC<IMenuListProps> = props => {
  return (
    <ul className={classnames(styles.menuList, props.className)}>
      {props.list.map((menu, index) => (
        <MenuItem key={index} {...menu} />
      ))}
    </ul>
  );
}

export const MenuItem: React.FC<IMenuItemProps> = props => {
  return (
    <li className={styles.menuItem}>
      <span
        className={styles.content}
        onClick={props.onClick}
      >
        <span className={styles.menuActive}>
          {props.active && '✅'}
        </span>
        <span className={styles.menuIcon}>{props.icon}</span>
        <span className={styles.menuName}>{props.name}</span>
      </span>
      {props.childrens && props.childrens.length && (
        <MenuList className={styles.children} list={props.childrens} />
      )}
    </li>
  );
}

export const MenuSeparator: React.FC = () => {
  return (
    <li className={styles.menuItem} />
  );
}
