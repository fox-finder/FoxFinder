
import React from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import { observer } from 'mobx-react'
import { Icon, IconProps } from 'bases/materials/icon'
import { MenuList } from './List';
import { menuStore } from './store';
import styles from './menu.module.scss';

export interface IMenuItemProps {
  separator?: boolean // separator
  label?: React.ReactNode // 菜单名称
  icon?: React.ReactNode // 图标
  data?: any // 数据
  selected?: boolean // 选中状态
  disabled?: boolean // 禁用状态
  shortcutTip?: string
  onClick?(event: React.MouseEvent<Element, MouseEvent>, data: any): void // 点击回调
  childrens?: IMenuItemProps[] // 子菜单
}

export interface IMenuIconProps {
  svg?: string
  img?: string
  iconfont?: string
}

export const MenuIcon: React.FC<IMenuIconProps> = props => {

  const iconProps: IconProps = {}

  if (props.svg) {
    iconProps.src = props.svg
    iconProps.className = styles.svg
  }

  if (props.img) {
    iconProps.src = props.img
    iconProps.className = styles.img
  }

  if (props.iconfont) {
    iconProps.iconfont = props.iconfont
    iconProps.className = styles.iconfont
  }

  return lodash.isEmpty(iconProps) ? null : (
    <Icon {...iconProps} />
  )
}

export const MenuSeparator: React.FC = () => {
  return (
    <li className={styles.separator} />
  );
}

export const MenuItem: React.FC<IMenuItemProps> = observer(props => {

  if (props.separator) {
    return <MenuSeparator />
  }

  const hasChildren = props.childrens && props.childrens.length

  const handleClick: React.MouseEventHandler = event => {
    event.preventDefault()
    menuStore.hidden()
    props.onClick && props.onClick(event, props.data)
  }

  const getIconElement = () => {

    const selectedElement = props.selected && (
      <span>✅</span>
    )

    return (
      <span className={classNames(styles.icon, props.selected && styles.selected)}>
        {selectedElement || props.icon}
      </span>
    )
  } 

  const extendElement = hasChildren ? (
    <span className={styles.childArraw}>
      <i className="iconfont icon-right-arrow"></i>
    </span>
  ) : props.shortcutTip ? (
    <span className={styles.shortcutTip}>
      {props.shortcutTip}
    </span>
  ) : null

  return (
    <li
      className={styles.item}
      onClickCapture={handleClick}
      onContextMenuCapture={handleClick}
    >
      <div className={styles.content}>
        {getIconElement()}
        <span className={styles.name}>{props.label}</span>
        {extendElement}
      </div>
      {hasChildren && (
        <MenuList className={styles.children} list={props.childrens} />
      )}
    </li>
  );
})
