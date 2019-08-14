
import React from 'react';
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'

export const Launchpad: React.FC<IAppRendererProps> = ({ app }) => {
  return (
    <div>
      <span>I am Launchpad app component, {JSON.stringify(app)}</span>
    </div>
  );
}

export const LaunchpadPackage: ICompleteApplication = {
  name: 'Launchpad',
  id: 'os-mac-launchpad',
  type: ApplicationType.Native,
  icon: '/images/icons/launchpad.svg',
  component: Launchpad,
  autorun: false,
  pinDesktop: true,
  pinBerth: true,
  protected: true,
  iconContextMenu: []
}