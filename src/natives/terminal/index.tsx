
import React from 'react';
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'

export const Terminal: React.FC<IAppRendererProps> = ({ app }) => {
  return (
    <div>我是 Terminal 在线终端, {JSON.stringify(app.$)}</div>
  );
}

export const TerminalPackage: ICompleteApplication = {
  name: 'Terminal',
  id: 'os-terminal',
  type: ApplicationType.Native,
  icon: '/images/icons/terminal.svg',
  component: Terminal,
  autorun: false,
  pinDesktop: true,
  pinBerth: true,
  protected: false,
  window: {
    border: true,
    resize: true
  },
  berthOrder: 3,
  desktopOrder: 3,
  iconContextMenu: []
}