
import { IFile, FileType } from '@fox-finder/base'
import React from 'react';
import { observer } from 'mobx-react'
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'
import { mockFinderFiles } from 'mock/file'
import { IInstanceProps } from './'
import styles from './instance.module.scss'

export const FinderAside: React.FC<IInstanceProps> = observer(() => {
  return (
    <div>
      这里是侧边栏
    </div>
  );
})
