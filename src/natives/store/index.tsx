
import React from 'react';
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'

export const CloudStore: React.FC<IAppRendererProps> = ({ app }) => {
  return (
    <div>我是 APP store 的内容, {JSON.stringify(app.$)}</div>
  );
}

export const CloudStorePackage: ICompleteApplication = {
  name: 'Cloud Store',
  type: ApplicationType.Native,
  icon: '/images/icons/store.svg',
  component: CloudStore,
  autorun: false,
  pinDesktop: true,
  pinBerth: true,
  protected: true,
  window: {
    border: true,
    resize: true
  },
  berthOrder: 2,
  desktopOrder: 2,
  iconContextMenu: []
}
