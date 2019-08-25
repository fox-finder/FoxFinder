
import React from 'react'
import classNames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { observable, action, computed, IObservableValue } from 'mobx'
import { observer } from 'mobx-react'
import { option } from 'engines/option'
import { process } from 'engines/process'
import { DndType } from 'engines/dnd'
import { File, file } from 'engines/file'
import { AppIcon } from './Icon'
import { FileIcon } from './File'
import { FileStack } from './Stack'
import styles from './icons.module.scss'

export interface IDesktopAppIconsProps {
  isRightStart?: boolean
}

class IconsStore {

  @observable fileStackExpanded = false

  @computed get desktopAllFiles() {
    return file.desktopFiles
  }

  @computed get files() {
    return this.desktopAllFiles.filter(File.isFile)
  }

  @computed get folders() {
    return this.desktopAllFiles.filter(File.isDirectory)
  }

  @action.bound updateFileStackExpanded(expanded: boolean) {
    this.fileStackExpanded = expanded
  }
}

const iconsStore = new IconsStore()

export const AppIcons: React.FC<IDesktopAppIconsProps> = observer(props => {

  const [, connectDrop] = useDrop({
    accept: [DndType.BerthApp, DndType.FinderFile, DndType.FinderFolder],
    hover(data) {
      console.log(`desktop 被拖入东西：`, data)
    },
  })
  
  // Desktop apps + fold stack + file & folders
  return (
    <div
      ref={connectDrop}
      className={classNames(
        styles.icons,
        props.isRightStart && styles.rightStart,
        option.isSmallSizeIcon && styles.small,
      )}
    >
      {process.disktopViewApps.slice().map(app => (
        <AppIcon app={app} key={app.$.id} />
      ))}
      {iconsStore.files.length && (
        <FileStack
          name="桌面文件"
          files={iconsStore.files}
          expanded={iconsStore.fileStackExpanded}
          onToggleExpand={() => iconsStore.updateFileStackExpanded(!iconsStore.fileStackExpanded)}
        />
      )}
      {iconsStore.files.length && iconsStore.fileStackExpanded && iconsStore.files.map(file => (
        <FileIcon
          key={file.path}
          file={file}
        />
      ))}
      {iconsStore.folders.length && iconsStore.folders.map(file => (
        <FileIcon
          key={file.path}
          file={file}
        />
      ))}
    </div>
  )
})
