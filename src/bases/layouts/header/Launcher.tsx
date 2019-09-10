
import React from 'react';
import classNames from 'classnames'
import { observer } from 'mobx-react';
import { MouseKeyType } from 'bases/layouts/menu/store';
import { MenuRegister } from 'bases/layouts/menu/Register';
import { MenuList } from 'bases/layouts/menu/List';
import { Tipbox } from 'bases/layouts/tipbox'
import { isSorting } from './dock'
import styles from './header.module.scss';

export const Launcher: React.FC = observer(() => {
  return (
    <Tipbox
      title="全部应用"
      id="header-launch"
      // 这里应该参考 windows 如果拖动任务栏的东西到桌面的图标上，会有设么效果
      disabled={isSorting.get()}
    >
      <div className={classNames(styles.launch, styles.action)}>
        <img
          className={styles.svgIcon}
          src="/images/icons/menu.svg"
        />
      </div>
    </Tipbox>
  );
})
