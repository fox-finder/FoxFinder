
import React from 'react';
import { observer } from 'mobx-react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { optionStore } from 'stores/option';
import menuStore from 'stores/menu';
import { Header } from 'bases/header';
import { Desktop } from 'bases/desktop'
import { ContextMenu } from 'bases/menu/ContextMenu';
import { Dock } from './dock';

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
    <DndProvider backend={HTML5Backend}>
      <div id="os">
        {!optionStore.general.hideHeader && (
          <Header />
        )}
        <Desktop appIconsProps={{ isRightStart: !optionStore.isLeftDirectionWithIcon }} />
        {!optionStore.general.hideBerth && (
          <Dock />
        )}
        {/* <ContextMenu
          x={menuStore.position.x}
          y={menuStore.position.y}
          visible={menuStore.visible}
          raTop
          list={menuStore.menuList}
        /> */}
      </div>
    </DndProvider>
  );
})
