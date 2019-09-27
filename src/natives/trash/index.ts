
import React from 'react';
import { IAppRendererProps } from 'bases/renderers';
import { Application } from 'engines/application'
import { ICompleteApplication, ApplicationType } from 'types/application'

export const TrashPackage: ICompleteApplication = {
  name: 'Trash',
  type: ApplicationType.Native,
  icon: '/images/icons/empty-trash.svg',
  autorun: false,
  pinDesktop: true,
  pinBerth: false,
  protected: true,
  window: {
    border: true,
    resize: true
  },
  berthOrder: 0,
  desktopOrder: 0,
  iconContextMenu: []
}

export function isTrashApp(app: Application): boolean {
  return false
  // return app.$.id2 === TrashPackage.id2
}