
import React from 'react'
import classnames from 'classnames'
import { observer } from 'mobx-react'
import styles from './menu.module.scss'
import { MenuItem, IMenuItemProps } from './Item'

export type IMenuList = IMenuItemProps[] | null

export interface IMenuListProps {
  className?: string
  list?: IMenuList
  children?: React.ReactNode
}

export const MenuList: React.FC<IMenuListProps> = observer(props => {

  /**
   * 1. children -> children list
   * 2. list options -> list.map -> children list
   * 3. null
   */
  let itemsElement = props.children

  if (!itemsElement && props.list && props.list.length) {
    itemsElement = (
      <>
        {props.list.map((menu, index) => (
          <MenuItem key={index} {...menu} />
        ))}
      </>
    )
  }

  if (!itemsElement) {
    return null
  }

  return (
    <ul className={classnames(styles.list, props.className)}>
      {itemsElement}
    </ul>
  )
})
