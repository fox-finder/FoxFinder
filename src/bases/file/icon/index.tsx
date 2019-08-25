
import React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { IFile } from 'types/file'
import { File } from 'engines/file'
import { Style } from 'react-motion'
import { FILE_ICON_PATH, FLODER_ICON_PATH, FLODER_OPENED_ICON_PATH, getIconPath } from './paths'

interface IBaseProps {
  style?: React.CSSProperties
  className?: string
}

interface IPureFileIconProps extends IBaseProps {
  name?: string
}

interface IFileIconProps extends IBaseProps {
  file: IFile
  open?: boolean
}

export const PureFileIcon: React.FC<IPureFileIconProps> = observer((props => {
  return (
    <img
      style={props.style}
      className={props.className}
      draggable={false}
      src={FILE_ICON_PATH}
      alt={props.name}
    />
  )
}))

export const FileIcon: React.FC<IFileIconProps> = observer((props => {

  const isFolder = File.isDirectory(props.file)
  const iconPath = isFolder
    ? (props.open ? FLODER_OPENED_ICON_PATH : FLODER_ICON_PATH)
    : getIconPath(props.file)

  return (
    <img
      style={props.style}
      className={props.className}
      draggable={false}
      src={iconPath}
      alt={props.file.name}
    />
  )
}))
