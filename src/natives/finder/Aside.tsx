
import { IFile, FileType } from '@fox-finder/base'
import React from 'react';
import { observer } from 'mobx-react'
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'
import { mockFinderFiles } from 'mock/file'
import { FileT } from './list/File'
import { FinderItem } from './store'
import styles from './finder.module.scss'

export const FinderAside: React.FC = observer(() => {
  return (
    <aside className={styles.sidebar}>
      这里是侧边栏
    </aside>
  );
})
