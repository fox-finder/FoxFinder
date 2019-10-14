
import React from 'react'
import { Application } from 'engines/application'
import { MenuIcon, IMenuList } from 'bases/features/menu'
import { getIconPath } from 'transforms/icon'

export function getAppContextMenuList(app: Application): IMenuList {

  const separator = {
    separator: true
  }

  const iconContextMenu = app.$.iconContextMenu || []

  const toggleApp = {
    label: app.isRunning ? '关闭应用' : '运行应用',
    icon: <MenuIcon svg={getIconPath('replay')} />,
    onClick: app.isRunning ? app.close : app.run
  }

  const pinDock = {
    label: '将应用固定在任务栏',
    icon: <MenuIcon svg={getIconPath('replay')} />,
    onClick() {
      console.log('到菜单')
    }
  }

  const menus: IMenuList = [
    toggleApp,
    pinDock
  ]

  if (iconContextMenu.length) {
    menus.push(separator, ...iconContextMenu)
  }

  return menus
}

