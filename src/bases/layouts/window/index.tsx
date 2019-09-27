
import React from 'react';
import { Position } from "react-rnd";
import { observer } from 'mobx-react'
import { Option } from "engines/option";
import { Normal } from "./Normal";
import { Naked } from "./Naked";

export interface IWindowProps {
  icon: string
  title: string
  border?: boolean
  maximized?: boolean
  actived?: boolean
  locking?: boolean
  dragging?: boolean
  handleClassName: string
  onActivate?(): void
  onClose(): void
  onMaximize?(): void
  onMinimize?(): void
  onToggleWindow?(): void
  onLock(): void
  onUnlock(): void
  children?: React.ReactElement
}

export const Window: React.FC<IWindowProps> = observer(props => {
  return props.border
    ? <Normal {...props} />
    : <Naked {...props} />
})
