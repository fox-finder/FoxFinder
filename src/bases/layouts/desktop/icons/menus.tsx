
import React from 'react'
import { getIconPath } from 'transforms/icon'
import { MenuIcon, IMenuList } from 'bases/layouts/menu'

export const menus: IMenuList = [
  {
    label: '刷新',
    icon: <MenuIcon svg={getIconPath('replay')} />,
    onClick() {
      console.log('要刷新？？？')
    }
  },
  {
    label: '复制',
    icon: <MenuIcon svg={getIconPath('copy')} />,
    onClick() {
      console.log('copy')
    }
  },
  {
    label: '查看剪贴板',
    icon: <MenuIcon svg={getIconPath('clipboard')} />,
    onClick() {
      console.log('打开剪切板')
    }
  },
  {
    separator: true
  },
  {
    label: '个性化设置',
    icon: <MenuIcon svg={getIconPath('rgb_circle')} />,
    onClick() {
      console.log('个性化设置')
    }
  }
]
