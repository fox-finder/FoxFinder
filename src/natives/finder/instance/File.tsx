
import { IFile, FileType } from '@fox-finder/base'
import React from 'react';
import { observer } from 'mobx-react'
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'
import { mockFinderFiles } from 'mock/file'
import { FileIconList } from 'bases/features/file/iconList'
import { IInstanceProps } from './'
import styles from './instance.module.scss'

export const FinderFile: React.FC<IInstanceProps> = observer(({ store }) => {
  return (
    <div className={styles.fileMain}>
      <FileIconList files={store.files} />
    </div>
  );
})
