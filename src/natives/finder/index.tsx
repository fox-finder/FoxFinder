
import React from 'react';
import { IAppRendererProps } from 'bases/renderers';
import { ICompleteApplication, ApplicationType } from 'types/application'
import { PayloadType, IFile } from 'types/file'
import { mockFinderFiles } from 'mock/file'
import { FileT } from './File'
import styles from './finder.module.scss'

export const Finder: React.FC<IAppRendererProps> = ({ app }) => {

  const files: IFile[] = mockFinderFiles

  return (
    <div id="finder" className={styles.finder}>
      <span>I am Finder app component, {JSON.stringify(app.$)}</span>
      <div>这里是一个大 tab</div>
      <aside className={styles.sidebar}>
        这里是侧边栏
      </aside>
      <main className={styles.mainBox}>
        <span>这里是文件区域</span>
        <ul className={styles.fileList}>
          {files.map(file => (
            <FileT key={file.path} file={file} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export const FinderPackage: ICompleteApplication = {
  name: 'Finder',
  id: 'os-finder',
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