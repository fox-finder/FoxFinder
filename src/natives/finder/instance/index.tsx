
import React from 'react';
import { observer } from 'mobx-react'
import { IAppRendererProps } from 'bases/renderers';
import { MenuIcon, IMenuList } from 'bases/features/menu'
import { FinderActionBar } from './ActionBar'
import { FinderAside } from './Aside'
import { FinderFile } from './File'
import { FinderInstanceStore } from './store'
import styles from './instance.module.scss'

const store = new FinderInstanceStore()
store.getFiles()

export interface IInstanceProps {
  store: FinderInstanceStore
}

const commonProps: IInstanceProps = {
  store
}

export const FinderInstance: React.FC = observer(() => {
  return (
    <div className={styles.finderInstance}>
      <aside className={styles.sidebar}>
        <FinderAside {...commonProps} />
      </aside>
      <main className={styles.main}>
        <FinderActionBar {...commonProps} />
        <FinderFile {...commonProps} />
      </main>
    </div>
  );
})
