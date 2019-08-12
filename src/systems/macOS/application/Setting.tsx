
import React from 'react';
import { SegmentedControl, SegmentedControlItem } from 'react-desktop/macOs';
import { IApplication, IApplicationBase, ApplicationType, ApplicationStatus } from 'types/application';

export interface ISettingProps {
  title: string
  children: React.ReactElement
}

export const Setting: React.FC<ISettingProps> = (props) => {
  return (
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
  );
}

export const SettingApp: IApplicationBase<ISettingProps> = {
  name: '设置',
  type: ApplicationType.App,
  icon: 'https://quietshu.github.io/cssosx/images/Finder.png',
  component: Setting,
  pinDesktop: true,
  pinBerth: true,
  protected: true,
  iconContextMenu: []
}
