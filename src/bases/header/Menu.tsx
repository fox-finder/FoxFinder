
import React from 'react';
import styles from './header.module.scss';
import { KeyType, PositionType } from 'bases/menu/store';
import { MenuRegister } from 'bases/menu/Register';
import { MenuList } from 'bases/menu/List';

function openAbout() {
  console.log('打开关于系统')
}

function openHistoryApp() {
  console.log('打开历史应用')
}

export const Menu: React.FC = () => {

  const menuOptions = {
    key: KeyType.Left,
    position: PositionType.Element,
  }

  const menuList = [
    { label: '关于系统', onClick: openAbout },
    { label: '系统设置', selected: true },
    { label: 'App Store' },
    {
      label: '最近使用的项目',
      childrens: [
        { label: '子菜单', onClick: openHistoryApp }
      ]
    },
  ]

  return (
    <div className={styles.menu}>
      <div className={styles.osMenu}>
        <i className="iconfont icon-apple" />
        {/* <MenuList list={[]} style={{ width: '100%', left: 0, top: '100%' }} /> */}
      </div>
    </div>
  );
}
