
import React from 'react';
import { IAppRendererProps } from 'bases/renderers';
import { SegmentedControl, SegmentedControlItem } from 'react-desktop/macOs';
import { ICompleteApplication, ApplicationType } from 'types/application';

export const Setting: React.FC<IAppRendererProps> = ({ app }) => {
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

export const SettingPackage: ICompleteApplication = {
  name: 'Setting',
  type: ApplicationType.Native,
  icon: '/images/icons/settings.svg',
  component: Setting,
  autorun: false,
  pinDesktop: true,
  pinBerth: true,
  protected: true,
  window: {
    border: true,
    resize: true
  },
  berthOrder: 1,
  desktopOrder: 1,
  iconContextMenu: []
}