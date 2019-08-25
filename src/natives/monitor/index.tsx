
import React from 'react';
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'

export const Monitor: React.FC<IAppRendererProps> = ({ app }) => {
  return (
    <div>
      <span>I am Monitor app component, {JSON.stringify(app.$)}</span>
      <p>https://github.com/hyj1991/easy-monitor</p>
      <p>https://github.com/lfortin/node-os-monitor</p>
      <p>https://github.com/lfortin/node-os-monitor</p>
    </div>
  );
}

export const MonitorPackage: ICompleteApplication = {
  name: 'Monitor',
  id: 'os-monitor',
  type: ApplicationType.Native,
  icon: '/images/icons/dashboard.svg',
  component: Monitor,
  autorun: false,
  pinDesktop: true,
  pinBerth: true,
  protected: true,
  window: {
    border: true,
    resize: true
  },
  berthOrder: 5,
  desktopOrder: 5,
  iconContextMenu: []
}