
import React from 'react';
import { observer } from 'mobx-react';
import styles from './os.module.scss';
import { Desktop } from 'bases/desktop';
import { Header } from 'bases/header';
import { Dock } from 'bases/dock';
import { ContextMenu } from 'bases/menu/ContextMenu';
import menuStore from 'bases/menu/store';

function test() {
  console.log('测试点击')
}

function testparent() {
  console.log('testparent')
}

function testchild() {
  console.log('testchild')
}

export const Os: React.FC = observer(() => {
  return (
    <div id="os" className={styles.os}>
      <Header />
      <Desktop />
      <Dock />
      <ContextMenu
        x={menuStore.position.x}
        y={menuStore.position.y}
        visible={menuStore.visible}
        raTop
        list={menuStore.menuList}
      />
    </div>
  );
})
