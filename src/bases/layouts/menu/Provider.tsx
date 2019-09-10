
import React from 'react';
import { observer } from 'mobx-react';
import { MENU_ID } from 'constants/id';
import { MenuList } from './List';
import { menuStore } from './store';
import styles from './menu.module.scss';


export const MenuProvider: React.FC = observer(() => {

  if (!menuStore.visible) {
    return null
  }

  return (
    <div
      id={MENU_ID}
      className={styles.menu}
      // TODO: 这里需要处理 safe view 的一个问题，即鼠标指针在右侧边缘，菜单就应该从左边出来
      style={{ top: menuStore.position.y, left: menuStore.position.x }}
    >
      <MenuList list={menuStore.menuList} />
    </div>
  );
})
