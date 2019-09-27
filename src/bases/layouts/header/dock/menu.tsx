
import React from 'react'
import { Application } from 'engines/application';
import { MenuIcon, IMenuList } from 'bases/layouts/menu'
import { getIconPath } from 'transforms/icon'

export function getAppContextMenuList(app: Application): IMenuList {

  const separator = {
    separator: true
  }

  const openApp = {
    label: '打开',
    icon: <MenuIcon svg={getIconPath('replay')} />,
    onClick: app.run
  }

  const closeApp = {
    label: '关闭',
    icon: <MenuIcon svg={getIconPath('replay')} />,
    onClick: app.close
  }

  const pinDock = {
    label: '将应用固定在任务栏',
    icon: <MenuIcon svg={getIconPath('replay')} />,
    onClick() {
      console.log('到菜单')
    }
  }

  const menus: IMenuList = [
    openApp,
    closeApp,
    pinDock,
  ]

  return menus
}

