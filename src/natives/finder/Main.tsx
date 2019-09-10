
import { IFile, FileType } from '@fox-finder/base'
import React from 'react';
import { observer } from 'mobx-react'
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'
import { mockFinderFiles } from 'mock/file'
import { FileT } from './list/File'
import { FinderItem } from './store'
import styles from './finder.module.scss'

const store = new FinderItem()
store.getFiles()

export const FinderMain: React.FC = observer(() => {

  return (
    <div className={styles.main}>
      <aside className={styles.sidebar}>
        这里是侧边栏
      </aside>
      <main className={styles.mainBox}>
        <span>这里是文件区域</span>
        <ul className={styles.fileList}>
          {store.data.map(file => (
            <FileT key={file.path} file={file} />
          ))}
        </ul>
      </main>
    </div>
  );
})
