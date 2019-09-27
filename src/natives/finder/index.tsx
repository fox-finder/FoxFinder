
import React from 'react';
import { observer } from 'mobx-react'
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'
import { FinderAside } from './Aside'
import { FinderMain } from './Main'
import styles from './finder.module.scss'

export const Finder: React.FC<IAppRendererProps> = observer((({ app }) => {

  return (
    <div id="finder" className={styles.finder}>
      <span>I am Finder app component, {JSON.stringify(app.$)}</span>
      <hr/>
      <FinderAside />
      <div>这里是一个大 tab</div>
      <FinderMain />
    </div>
  );
}))

export const FinderPackage: ICompleteApplication = {
  name: 'Finder',
  type: ApplicationType.Native,
  icon: '/images/icons/exploer.svg',
  component: Finder,
  autorun: false,
  pinDesktop: true,
  pinBerth: true,
  protected: true,
  window: {
    border: true,
    resize: true
  },
  berthOrder: 0,
  desktopOrder: 0,
  iconContextMenu: []
}