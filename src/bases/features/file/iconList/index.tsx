
import { IFile, FileType } from '@fox-finder/base'
import React from 'react';
import { observer } from 'mobx-react'
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'
import { mockFinderFiles } from 'mock/file'
import { File } from './File'
import styles from './list.module.scss'

export interface IFileIconListProps {
  files: IFile[]
}

// TODO: 确定选中项是单个文件还是多个文件，以及发出选中和双击事件，选中多个双击无用
// 接受排序类型、是否叠放、
// 抽成一个 拖动拽多选层
export const FileIconList: React.FC<IFileIconListProps> = observer(props => {
  return (
    <ul className={styles.iconList}>
      {props.files.map(file => (
        <File key={file.path} file={file} />
      ))}
    </ul>
  );
})
