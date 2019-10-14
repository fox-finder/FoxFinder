
import React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { IFile, FileType } from '@fox-finder/base'
import { isDirectory } from 'engines/file'
import { Icon } from 'bases/materials/icon'
import { FLODER_ICON_NAME, FLODER_OPENED_ICON_NAME, getIconPathByFile, getIconPathByName } from 'constants/file'

interface IFileIconProps {
  style?: React.CSSProperties
  className?: string
  open?: boolean
  file: IFile
}

export const FileIcon: React.FC<IFileIconProps> = observer((props => {

  const iconPath = !isDirectory(props.file)
    ? getIconPathByFile(props.file)
    : getIconPathByName(props.open
        ? FLODER_OPENED_ICON_NAME
        : FLODER_ICON_NAME
      )

  return (
    <Icon
      style={props.style}
      className={props.className}
      src={iconPath}
      alt={props.file.name}
    />
  )
}))
