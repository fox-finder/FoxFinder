
import React from 'react';
import { observer } from 'mobx-react'
import { IAppRendererProps } from 'bases/renderers';
import { MenuIcon, IMenuList } from 'bases/features/menu'
import { ICompleteApplication, ApplicationType } from 'types/application'
import { getIconPath } from 'transforms/icon'
import { FinderInstance } from './instance'
import styles from './finder.module.scss'

// 这里用于管理整个 finder 的 store，管理 Tab、显示与隐藏
export const Finder: React.FC<IAppRendererProps> = observer((({ app }) => {
  return (
    <div id="finder" className={styles.finder}>
      <div className={styles.tab}> 这里是切换栏 {JSON.stringify(app.$)}</div>
      <div className={styles.content}>
        <FinderInstance />
      </div>
    </div>
  );
}))

export const FinderPackage: ICompleteApplication = {
  name: 'Finder',
  type: ApplicationType.Native,
  icon: '/images/icons/exploer.svg',
  component: Finder,
  autorun: true,
  pinDesktop: true,
  pinBerth: true,
  protected: true,
  window: {
    border: true,
    resize: true
  },
  berthOrder: 0,
  desktopOrder: 0,
  iconContextMenu: [
    {
      label: '新建 Finder 窗口',
      icon: <MenuIcon svg={getIconPath('replay')} />,
      onClick() {
        console.log('到菜单')
      }
    }
  ]
}