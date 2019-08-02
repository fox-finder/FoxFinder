
import React from 'react';
import { observer } from 'mobx-react';

import { Desktop } from './desktop';
import { Header } from './header';
import { Dock } from './dock';
import { ContextMenu } from './menu/ContextMenu';
import menuStore from 'stores/menu';

function test() {
  console.log('测试点击')
}

function testparent() {
  console.log('testparent')
}

function testchild() {
  console.log('testchild')
}

export const MacOS: React.FC = observer(() => {
  return (
    <div id="os">
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
