
import { IFile, FileType } from '@fox-finder/base'
import React from 'react';
import { observer } from 'mobx-react'
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'
import { IInstanceProps } from './'
import styles from './instance.module.scss'

export const FinderActionBar: React.FC<IInstanceProps> = observer(() => {
  return (
    <div className={styles.actionBar}>
      <div>这里是操作区域</div>
    </div>
  );
})
