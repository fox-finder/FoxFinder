
import React from 'react';
import { observer } from 'mobx-react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragLayer } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { option } from 'engines/option';
import menuStore from 'engines/menu';
import { Header } from 'bases/layouts/header';
import { Desktop } from 'bases/layouts/desktop'
import { ContextMenu } from 'bases/layouts/menu/ContextMenu';
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

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 9999,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
};

const DragLayerComponent = DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(observer(props => {

  const { item, itemType, currentOffset, isDragging } = props;

  console.log('拖动的预览层', props, currentOffset)

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles as any}> 能有啥呢=123==123=1=23= {isDragging ? '是' : '否'} {JSON.stringify(item)}</div>
  )
}))

export const MacOS: React.FC = observer(() => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div id="os">
        {/* <DragLayerComponent /> */}
        {!option.general.hideHeader && (
          <Header />
        )}
        <Desktop appIconsProps={{ isRightStart: !option.isLeftDirectionWithIcon }} />
        {/* {!option.general.hideBerth && (
          <Dock />
        )} */}
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
