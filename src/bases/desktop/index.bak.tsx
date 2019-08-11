
import React from 'react';
import styles from './desktop.module.scss';
import { MenuRegister } from 'bases/menu/Register';
import Draggable, { DraggableCore } from 'react-draggable';
import menuStore, { KeyType, PositionType } from 'stores/menu';
import { Window, TitleBar, Text, SegmentedControl, SegmentedControlItem } from 'react-desktop/macOs';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const menuList = [
  { label: '刷新' },
  { label: '上传文件', selected: true },
  { label: '新建文件夹' },
  {
    label: '新建文件',
    childrens: [
      { label: '子菜单' }
    ]
  },
  { label: '粘贴' },
  { label: '个性化设置' },
]

function handleClick() {
  console.log('handleClick')
}

export const Desktop: React.FC = () => {
  return (
    // <MenuRegister list={menuList}>
    <>
      <ContextMenuTrigger id="some_unique_identifier">
        <div
          id="desktop"
          className={styles.desktop}
          style={{ backgroundImage: `url('/images/wallpapers/Sierra.jpg')` }}
        >
          <Draggable
            handle=".handleTest"
            defaultPosition={{
              x: 300,
              y: 200
            }}
          >
            <Window
              chrome
              width={700}
              height={400}
              padding={10}
            >
              <TitleBar title="Setting" className="handleTest" controls/>
              <SegmentedControl box>
                <SegmentedControlItem
                  key="general"
                  title="通用设置"
                  selected={true}
                >
                  <span>通用设置、是否开启音效、动画、缩略图</span>
                </SegmentedControlItem>
                <SegmentedControlItem
                  key="theme"
                  title="个性化设置"
                  selected={false}
                >
                  <span>主题、系统风格、壁纸设置</span>
                </SegmentedControlItem>
                <SegmentedControlItem
                  key="group"
                  title="权限设置"
                  selected={false}
                >
                  <span>用户、用户组</span>
                </SegmentedControlItem>
              </SegmentedControl>
            </Window>
          </Draggable>
        </div>
      </ContextMenuTrigger>
      <ContextMenu id="some_unique_identifier">
        <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
          ContextMenu Item 1
        </MenuItem>
        <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
          ContextMenu Item 2
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
          ContextMenu Item 3
        </MenuItem>
      </ContextMenu>
    </>
    // </MenuRegister>
  );
}
