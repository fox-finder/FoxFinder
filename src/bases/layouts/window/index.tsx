
import React from 'react';
import { Position } from "react-rnd";
import { Option } from "engines/option";
import { MacOS } from "./MacOS";
import { Naked } from "./Naked";

export interface IWindowProps {
  title: string
  border?: boolean
  maximized?: boolean
  actived?: boolean
  locking?: boolean
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

export const Window: React.FC<IWindowProps> = (props) => {

  if (!props.border) {
    return (
      <Naked {...props} />
    )
  }

  return (
    <MacOS {...props} />
  );
}
