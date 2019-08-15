
import React from 'react';
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'

export const Finder: React.FC<IAppRendererProps> = ({ app }) => {
  return (
    <div>
      <span>I am Finder app component, {JSON.stringify(app)}</span>
    </div>
  );
}

export const FinderPackage: ICompleteApplication = {
  name: 'Finder',
  id: 'os-finder',
  type: ApplicationType.Native,
  icon: '/images/icons/exploer.svg',
  component: Finder,
  autorun: false,
  pinDesktop: true,
  pinBerth: true,
  protected: true,
  window: {
    border: true,
    resize: true,
    defaultFullScreen: true
  },
  iconContextMenu: []
}