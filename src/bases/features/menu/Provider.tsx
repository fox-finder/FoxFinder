
import React from 'react';
import classNames from 'classnames'
import { observer } from 'mobx-react';
import { MENU_ID } from 'constants/id';
import { MenuList } from './List';
import { menuStore } from './store';
import styles from './menu.module.scss';

export const MenuProvider: React.FC = observer(() => {
  return (
    <div id={MENU_ID}>
      <div
        // TODO: 这里需要处理 safe view 的一个问题，即鼠标指针在右侧边缘，菜单就应该从左边出来
        className={classNames(
          styles.menu,
          menuStore.visible && styles.visible)
        }
        style={{
          top: menuStore.position.y,
          left: menuStore.position.x
        }}
        onTransitionEnd={() => {
          !menuStore.visible && menuStore.reset()
        }}
      >
        <MenuList list={menuStore.menuList} />
      </div>
    </div>
  );
})
