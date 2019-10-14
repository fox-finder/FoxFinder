
import React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { IFile, FileType } from '@fox-finder/base'
import { isDirectory } from 'engines/file'
import { Style } from 'react-motion'
import { DAFAULT_FILE_ICON_NAME, FLODER_ICON_NAME, FLODER_OPENED_ICON_NAME, getIconPathByFile, getIconPathByName } from 'constants/file'

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
      src={DAFAULT_FILE_ICON_NAME}
      alt={props.name}
    />
  )
}))

export const FileIcon: React.FC<IFileIconProps> = observer((props => {

  const iconPath = !isDirectory(props.file)
    ? getIconPathByFile(props.file)
    : getIconPathByName(props.open
        ? FLODER_OPENED_ICON_NAME
        : FLODER_ICON_NAME
      )

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
